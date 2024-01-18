import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { SliderTitle } from '../../../styles/slider';

const NewClientStyle = styled.form`
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 40vw;
  height: 40vh;
  overflow: auto;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;

const SlideContactNew = ({ onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    onClose();
    // newClient(data).then((answer) => {
    //   if (answer === 'OK') {
    //     onClose();
    //   }
    // });
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
      <Box fullWidth jc='flex-start'>
        <ButtonUI size='small' type='submit'>
          Сохранить
        </ButtonUI>
        <ButtonUI size='small' variant='outline' onClick={onClose}>
          Закрыть
        </ButtonUI>
      </Box>
    </NewClientStyle>
  );
};

export default SlideContactNew;
