import React, { useState } from 'react';
import { useFormState, Controller, useFormContext } from 'react-hook-form';
import { useAsyncValue } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import * as S from './slideSlide';
import { TextSpanStyle } from 'styles/styles';
import { SliderTitle } from '../../../styles/slider';
import SlideFixationJK from './SlideFixationJK';
import SlideFixationEmpty from './SlideFixationEmpty';
import { ButtonLink } from 'ui/ButtonLink/ButtonLink';
import DialogWindow from 'components/Main/DialogWindow';
import BuildFinder from './BuildFinder';
import { InputUI } from 'ui/InputUI';

const SlideFixationOptionally = () => {
  const fixation = useAsyncValue();
  const { UID } = useSelector((state) => state.user);
  const isAdmin = UID === fixation?.broker?.UID;
  const isAgent = UID === fixation?.realtor?.UID;

  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const { control } = useFormState();
  const { setValue } = useFormContext();
  const openWindow = () => {
    setOpen(true);
  };
  const closeWindow = () => {
    setOpen(false);
  };
  const handleSelect = (newJk) => {
    const newUID = uuidv4().split('-')[0];
    setValue(
      'optionally',
      [
        ...fixation.optionally,
        {
          UID: newUID,
          jk: newJk,
        },
      ],
      { shouldDirty: true }
    );
    fixation.optionally = [
      ...fixation.optionally,
      {
        UID: newUID,
        jk: newJk,
      },
    ];
    closeWindow();
  };
  const removeOptional = (optional) => {
    setValue(
      'optionally',
      fixation.optionally.filter((item) => item.UID !== optional.UID),
      { shouldDirty: true }
    );
    fixation.optionally = fixation.optionally.filter(
      (item) => item.UID !== optional.UID
    );
    setChange(!change);
  };
  const _isShowButtonAdd = () => {
    if (fixation?.optionally?.length === 4) {
      return false;
    }
    if (fixation.stageId !== 0 && isAgent) {
      return false;
    }
    return isAdmin;
  };
  const _isDisabled = () => {
    if (isAdmin) {
      return false;
    }
    if (isAgent && fixation.stageId === 0) {
      return false;
    }
    return isAdmin;
  };
  return (
    <S.FixationBlock>
      <SliderTitle>
        Дополнительно*
        {_isShowButtonAdd() && (
          <ButtonLink size={12} color='rgb(133, 0, 158)' onClick={openWindow}>
            Добавить
          </ButtonLink>
        )}
      </SliderTitle>
      <TextSpanStyle size={10}>
        * при необходимости Вы можете добавить ещё 4 ЖК/КП для отправки
        уведомления по данному Клиенту
      </TextSpanStyle>
      {fixation?.optionally?.length > 0 &&
        fixation.optionally.map((optional, idx) => {
          if (optional.jk.UID === '0') {
            return (
              <React.Fragment key={optional.UID}>
                <SlideFixationEmpty
                  title='ЖК/КП'
                  label='Комплекс отсутствует в БД'
                  keyName={`optionally[${idx}].corpus`}
                  onClick={() => {
                    removeOptional(optional);
                  }}
                  showButton={!_isDisabled}
                  buttonTitle='Удалить'
                />
                {idx < fixation.optionally.length - 1 && <S.Line />}
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={optional.UID}>
              <SlideFixationJK
                title={fixation?.typeObject === 'suburban' ? 'КП' : ' ЖК'}
                jk={optional.jk}
                onClick={() => {
                  removeOptional(optional);
                }}
                showButton={!_isDisabled}
                buttonTitle='Удалить'
              />
              {fixation?.typeObject === 'newbuilding' && (
                <Controller
                  control={control}
                  name={`optionally[${idx}].corpus`}
                  render={({ field }) => (
                    <InputUI
                      small
                      value={field.value || ''}
                      onChange={field.onChange}
                      label='Корпус'
                      disabled={_isDisabled()}
                    />
                  )}
                />
              )}
              <Controller
                control={control}
                name={`optionally[${idx}].apparmentNumber`}
                render={({ field }) => (
                  <InputUI
                    small
                    value={field.value || ''}
                    onChange={field.onChange}
                    disabled={_isDisabled()}
                    label={
                      fixation?.typeObject === 'newbuilding'
                        ? 'Номер квартиры'
                        : 'Номер участка'
                    }
                  />
                )}
              />
              {idx < fixation.optionally.length - 1 && <S.Line />}
            </React.Fragment>
          );
        })}
      <DialogWindow open={open} onClose={closeWindow}>
        <div onClick={(e) => e.stopPropagation()}>
          <BuildFinder
            onClose={closeWindow}
            onChange={handleSelect}
            title={fixation?.typeObject === 'suburban' ? 'КП' : ' ЖК'}
            target={'jk'}
          />
        </div>
      </DialogWindow>
    </S.FixationBlock>
  );
};

export default SlideFixationOptionally;
