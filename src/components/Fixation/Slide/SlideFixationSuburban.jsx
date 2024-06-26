import React, { useState } from 'react';
import { useFormState, Controller, useFormContext } from 'react-hook-form';
import * as S from './slideSlide';
import { InputUI } from 'ui/InputUI';
import { SliderTitle } from '../../../styles/slider';
import { TextSpanStyle } from '../../../styles/styles';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import SlideFixationDeveloper from './SlideFixationDeveloper';
import { useAsyncValue } from 'react-router-dom';
import SlideFixationJK from './SlideFixationJK';
import SlideFixationEmpty from './SlideFixationEmpty';
import DialogWindow from 'components/Main/DialogWindow';
import BuildFinder from './BuildFinder';
import { useSelector } from 'react-redux';

const SlideFixationSuburban = () => {
  const { UID } = useSelector((state) => state.user);
  const fixation = useAsyncValue();
  const isNotAdmin = UID !== fixation?.broker?.UID;
  const { setValue, getValues, watch } = useFormContext();
  const { control } = useFormState();
  const [target, setTarget] = useState(null);
  const openTarget = (newTarget) => {
    setTarget(newTarget);
  };
  const closeTarget = () => {
    setTarget(null);
  };
  const changeTarget = (newBuild) => {
    fixation[target] = newBuild;
    setValue(target, newBuild, { shouldDirty: true });
    closeTarget();
  };
  watch('suburbanType');
  return (
    <S.FixationBlock>
      <SliderTitle>
        Предмет фиксации{' '}
        <TextSpanStyle size={12} color='#85009E'>
          Загородка
        </TextSpanStyle>
      </SliderTitle>
      <Controller
        control={control}
        name='suburbanType'
        render={({ field }) => (
          <SelectUI
            small
            onChange={(e) => field.onChange(e)}
            select={field.value}
            label='Тип '
            disabled={isNotAdmin}
          >
            <SelectItemUI value='1'>Участок с подрядом</SelectItemUI>
            <SelectItemUI value='2'>Участок</SelectItemUI>
            <SelectItemUI value='3'>Подряд</SelectItemUI>
          </SelectUI>
        )}
      />
      {getValues('suburbanType') !== '3' && (
        <>
          {fixation?.jk && fixation?.jk?.UID !== 0 ? (
            <SlideFixationJK
              title='КП'
              jk={fixation?.jk}
              onClick={() => {
                openTarget('jk');
              }}
              showButton={!isNotAdmin}
            />
          ) : (
            <SlideFixationEmpty
              title='ЖК/КП'
              label='Комплекс отсутствует в БД'
              keyName='corpus'
              onClick={() => {
                openTarget('jk');
              }}
              showButton={!isNotAdmin}
            />
          )}
        </>
      )}
      <Controller
        control={control}
        name='devManager'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Менеджер'
            disabled={isNotAdmin}
          />
        )}
      />
      <Controller
        control={control}
        name='apparmentNumber'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Номер участка'
            disabled={isNotAdmin}
          />
        )}
      />
      {getValues('suburbanType') !== '2' && (
        <>
          {fixation?.developer && fixation?.developer?.UID !== 0 ? (
            <SlideFixationDeveloper
              developer={fixation?.developer}
              onClick={() => {
                openTarget('developer');
              }}
              showButton={!isNotAdmin}
            />
          ) : (
            <SlideFixationEmpty
              title='Подрядчик'
              label='Подрядчик отсутствует в БД'
              keyName='developerName'
              onClick={() => {
                openTarget('developer');
              }}
              showButton={!isNotAdmin}
            />
          )}
        </>
      )}
      <DialogWindow open={Boolean(target)} onClose={closeTarget}>
        <div onClick={(e) => e.stopPropagation()}>
          <BuildFinder
            onClose={closeTarget}
            onChange={changeTarget}
            title={target === 'jk' ? 'КП' : 'Подрядчик'}
            target={target}
          />
        </div>
      </DialogWindow>
    </S.FixationBlock>
  );
};

export default SlideFixationSuburban;
