import React from 'react';
import { useFormState, Controller, useFormContext } from 'react-hook-form';
import { SliderTitle } from '../../../styles/slider';
import { InputUI } from 'ui/InputUI';
import { TextSpanStyle } from '../../../styles/styles';
import * as S from './slideSlide';
import { useSelector } from 'react-redux';
import { useAsyncValue } from 'react-router-dom';

const SlideFixationClient = () => {
  const { UID } = useSelector((state) => state.user);
  const fixation = useAsyncValue();
  const isNotAdmin = UID !== fixation?.broker?.UID;
  const { control } = useFormState();
  const { watch, getValues } = useFormContext();
  watch('contact.lastName');
  watch('contact.firstName');
  watch('contact.secondName');
  return (
    <S.FixationBlock>
      <SliderTitle>Клиент</SliderTitle>
      <TextSpanStyle size={12}>
        {getValues('contact.lastName')} {getValues('contact.firstName')}{' '}
        {getValues('contact.secondName')}
      </TextSpanStyle>
      <Controller
        control={control}
        name='contact.lastName'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Фамилия'
            disabled={isNotAdmin}
          />
        )}
      />
      <Controller
        control={control}
        name='contact.firstName'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Имя'
            disabled={isNotAdmin}
          />
        )}
      />
      <Controller
        control={control}
        name='contact.secondName'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Отчество'
            disabled={isNotAdmin}
          />
        )}
      />
      <Controller
        control={control}
        name='contact.phone'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Телефон'
            disabled={isNotAdmin}
          />
        )}
      />
    </S.FixationBlock>
  );
};

export default SlideFixationClient;
