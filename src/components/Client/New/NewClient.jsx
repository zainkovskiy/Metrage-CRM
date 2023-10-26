import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { SliderTitle } from '../../../styles/slider';
import { newClient } from '../../../api/clientAPI';

const NewClientStyle = styled.form`
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  overflow: auto;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;
const NewClient = ({ onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    newClient(data).then((answer) => {
      if (answer === 'OK') {
        onClose();
      }
    });
  };
  return (
    <NewClientStyle onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <SliderTitle>Новый клиент</SliderTitle>
        <Controller
          control={control}
          name='lastName'
          render={({ field }) => (
            <InputUI
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Фамилия'
            />
          )}
        />
        <Controller
          control={control}
          name='firstName'
          rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <InputUI
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Имя'
              error={errors?.firstName}
            />
          )}
        />
        <Controller
          control={control}
          name='secondName'
          render={({ field }) => (
            <InputUI
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Отчество'
            />
          )}
        />
        <Controller
          control={control}
          name='phone'
          render={({ field }) => (
            <InputUI
              type='number'
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Номер телефона'
            />
          )}
        />
      </FormContainer>
      <ButtonUI type='submit'>Сохранить</ButtonUI>
    </NewClientStyle>
  );
};

export default NewClient;
