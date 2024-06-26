import React from 'react';
import { useFormState, Controller } from 'react-hook-form';
import { SliderTitle } from '../../../styles/slider';
import { InputUI } from 'ui/InputUI';
import * as S from './slideSlide';
import { useSelector } from 'react-redux';
import { useAsyncValue } from 'react-router-dom';

const SlideFixationClient = () => {
  const { UID } = useSelector((state) => state.user);
  const fixation = useAsyncValue();
  const isNotAdmin = UID !== fixation?.broker?.UID;
  const { control } = useFormState();
  return (
    <S.FixationBlock>
      <SliderTitle>Клиент</SliderTitle>
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
