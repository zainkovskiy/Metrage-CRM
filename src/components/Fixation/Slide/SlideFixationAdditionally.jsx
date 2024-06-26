import React from 'react';
import * as S from './slideSlide';
import * as N from '../New/styleNew';
import { SliderTitle } from '../../../styles/slider';
import { InputUI } from 'ui/InputUI';
import { useAsyncValue } from 'react-router-dom';
import { Controller, useFormState } from 'react-hook-form';
import { LabelStyle } from '../../../ui/InputUI/InputUIStyled';
import { useSelector } from 'react-redux';

const SlideFixationAdditionally = () => {
  const isNotAdmin = useSelector((state) => state.user?.isAdmin || '') === '0';
  const fixation = useAsyncValue();
  const { control } = useFormState();
  return (
    <S.FixationBlock>
      <SliderTitle>Дополнительно</SliderTitle>
      <InputUI
        small
        label='Отправлено'
        disabled={true}
        value={fixation?.sendet || ''}
      />
      <InputUI
        small
        label='Канал'
        disabled={true}
        value={fixation?.sendetAt || ''}
      />
      <S.Line />
      <Controller
        control={control}
        name='comment'
        render={({ field }) => (
          <LabelStyle fg='1'>
            Комментарии для менеджера:
            <N.TextAreaStyle
              $height='100%'
              value={field?.value || ''}
              onChange={field.onChange}
              rows={8}
              disabled={isNotAdmin}
            />
          </LabelStyle>
        )}
      />
    </S.FixationBlock>
  );
};

export default SlideFixationAdditionally;
