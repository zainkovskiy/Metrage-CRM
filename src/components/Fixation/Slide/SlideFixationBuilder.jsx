import React, { useState } from 'react';
import { useFormState, Controller, useFormContext } from 'react-hook-form';
import * as S from './slideSlide';
import { InputUI } from 'ui/InputUI';
import { SliderTitle } from '../../../styles/slider';
import { TextSpanStyle } from '../../../styles/styles';
import SlideFixationJK from './SlideFixationJK';
import { useAsyncValue } from 'react-router-dom';
import SlideFixationEmpty from './SlideFixationEmpty';
import DialogWindow from 'components/Main/DialogWindow';
import BuildFinder from './BuildFinder';
import { useSelector } from 'react-redux';

const SlideFixationBuilder = () => {
  const { UID } = useSelector((state) => state.user);
  const fixation = useAsyncValue();
  const isNotAdmin = UID !== fixation?.broker?.UID;
  const { setValue } = useFormContext();
  const { control } = useFormState();
  const [open, setOpen] = useState(false);
  const openChangeWindow = () => {
    setOpen(true);
  };
  const closeChangeWindow = () => {
    setOpen(false);
  };
  const changeJK = (newJK) => {
    fixation.jk = newJK;
    setValue('jk', newJK, { shouldDirty: true });
    closeChangeWindow();
  };
  return (
    <S.FixationBlock>
      <SliderTitle>
        Предмет фиксации{' '}
        <TextSpanStyle size={12} color='#85009E'>
          Новостройка
        </TextSpanStyle>
      </SliderTitle>
      {fixation?.jk && fixation?.jk?.UID !== 0 ? (
        <SlideFixationJK
          title='ЖК'
          jk={fixation?.jk}
          onClick={openChangeWindow}
          showButton={!isNotAdmin}
        />
      ) : (
        <SlideFixationEmpty
          title='ЖК/КП'
          label='Комплекс отсутствует в БД'
          keyName='corpus'
          onClick={openChangeWindow}
          showButton={!isNotAdmin}
        />
      )}
      <Controller
        control={control}
        name='corpus'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Корпус'
            disabled={isNotAdmin}
          />
        )}
      />
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
      <S.Line />
      <Controller
        control={control}
        name='apparmentNumber'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Номер квартиры'
            disabled={isNotAdmin}
          />
        )}
      />
      <Controller
        control={control}
        name='price'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Цена'
            disabled={isNotAdmin}
          />
        )}
      />
      <Controller
        control={control}
        name='floor'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Этаж'
            disabled={isNotAdmin}
          />
        )}
      />
      <DialogWindow open={open} onClose={closeChangeWindow}>
        <div onClick={(e) => e.stopPropagation()}>
          <BuildFinder
            onClose={closeChangeWindow}
            onChange={changeJK}
            title='ЖК'
            target='jk'
          />
        </div>
      </DialogWindow>
    </S.FixationBlock>
  );
};

export default SlideFixationBuilder;
