import React, { useState } from 'react';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateContact } from 'store/taskSlice';
import { useAsyncValue } from 'react-router-dom';

const ApplicationEditNameStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.primary};  
`
const ApplicationEditNameHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CloseButtonStyle = styled(Close)`
${({ disabled }) => disabled && 'pointer-events: none'};
  width: 18px;
  height: 18px;
  opacity: ${({ disabled }) => disabled ? '.2' : '.5'};
  cursor: pointer;
  transition: transform .3s, fill .3s;
  &:hover{
    fill: red;
  }
  &:active{
    transform: scale(0.7);
  }
`
const ApplicationEditName = ({ onClose, client }) => {
  const application = useAsyncValue();
  const dispatch = useDispatch();
  const { handleSubmit, control, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      firstName: client?.firstName || '',
      lastName: client?.lastName || '',
    }
  });
  const [disabled, setDisabled] = useState(false);
  const onSubmit = (data) => {
    setDisabled(true);
    dispatch(updateContact({form: data, UID: client.UID})).unwrap().then(() => {
      if(application){
        application.client.firstName = data.firstName;
        application.client.lastName = data.lastName;
      }
      onClose();
    }).finally(() => {
      setDisabled(false);
    });
  }
  return (
    <ApplicationEditNameStyle onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit(onSubmit)}>
      <ApplicationEditNameHeaderStyle>
        <TextSpanStyle>Клиент</TextSpanStyle>
        <CloseButtonStyle onClick={onClose} disabled={disabled} />
      </ApplicationEditNameHeaderStyle>

      <Controller
        name='lastName'
        control={control}
        render={({ field }) => (
          <InputUI
            {...field}
            label='Фамилия'
            error={errors?.lastName}
            fullWidth
          />
        )}
      />
      <Controller
        name='firstName'
        rules={{ required: 'Поле обязательное' }}
        control={control}
        render={({ field }) => (
          <InputUI
            {...field}
            label='Имя'
            error={errors?.firstName}
            fullWidth
          />
        )}
      />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ButtonUI disabled={disabled || !isDirty} type='submit'>Сохранить</ButtonUI>
        <ButtonUI disabled={disabled} onClick={onClose} variant='outline'>Закрыть</ButtonUI>
      </div>
    </ApplicationEditNameStyle>
  );
};

export default ApplicationEditName;