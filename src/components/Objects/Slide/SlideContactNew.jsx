import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { SliderTitle } from '../../../styles/slider';
import { createAndSetContact } from '../../../api/objectAPI';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from '../../../styles/styles';

const NewClientStyle = styled.form`
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 40vw;
  min-width: 300px;
  height: 40vh;
  overflow: auto;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;

const SlideContactNew = ({ onClose, setNewClient }) => {
  const object = useAsyncValue();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [request, setRequest] = useState(false);
  const [reason, setReason] = useState(null);

  const onSubmit = (data) => {
    setRequest(true);
    createAndSetContact({
      UID: object.UID,
      type: object.subTypeEstate,
      ...data,
    })
      .then((newClient) => {
        if (newClient) {
          setNewClient(newClient);
          onClose();
        }
      })
      .catch((error) => {
        error?.response?.data?.result?.reason &&
          setReason(error?.response?.data?.result?.reason);
      })
      .finally(() => {
        setRequest(false);
      });
  };
  return (
    <NewClientStyle
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
    >
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
              disabled={request}
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
              disabled={request}
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
              disabled={request}
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
              disabled={request}
            />
          )}
        />
        <TextSpanStyle color='red' size={10}>
          {reason}
        </TextSpanStyle>
      </FormContainer>
      <Box fullWidth jc='flex-start'>
        <ButtonUI size='small' type='submit' disabled={request}>
          Сохранить
        </ButtonUI>
        <ButtonUI
          size='small'
          variant='outline'
          onClick={onClose}
          disabled={request}
        >
          Закрыть
        </ButtonUI>
      </Box>
    </NewClientStyle>
  );
};

export default SlideContactNew;
