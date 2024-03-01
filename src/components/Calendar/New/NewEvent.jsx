import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { SliderTitle } from '../../../styles/slider';
import { ButtonUI } from 'ui/ButtonUI';
import { InputUI } from 'ui/InputUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { LabelStyle } from 'ui/InputUI/InputUIStyled';
import { useDispatch } from 'react-redux';
import { createNewEvent } from '../../../store/slices/calendarSlice';
import { useLocation } from 'react-router-dom';

const NewEventForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  height: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;
const TexArea = styled.textarea`
  width: 100%;
  border: 1px solid
    ${({ theme, $error }) => ($error ? 'red' : theme.color.primary)};
  font-family: ${({ theme }) => theme.font.family};
  resize: none;
  border-radius: 5px;
  padding: 0.2rem;
  box-sizing: border-box;
  &:focus {
    outline: 1px solid
      ${({ theme, $error }) => ($error ? 'red' : theme.color.primary)};
  }
`;
const NewEvent = ({ onClose }) => {
  const dispatch = useDispatch();
  // const location = useLocation();
  // console.log(location);
  const [send, setSend] = useState(false);
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const onSubmit = (data) => {
    setSend(true);
    dispatch(createNewEvent(data))
      .unwrap()
      .then(() => {
        onClose();
      })
      .finally(() => {
        setSend(false);
      });
  };
  return (
    <NewEventForm onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <SliderTitle>Новое напоминание</SliderTitle>
        <Controller
          control={control}
          name='dueDate'
          rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <InputUI
              type='datetime-local'
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Дата *'
              disabled={send}
              error={errors?.dueDate}
            />
          )}
        />
        <Controller
          name='notify'
          control={control}
          rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <LabelStyle>
              Текст
              <TexArea
                rows={10}
                value={field.value}
                onChange={field.onChange}
                disabled={send}
                error={errors?.notify}
              />
            </LabelStyle>
          )}
        />
        <Controller
          name='toTelegram'
          control={control}
          render={({ field }) => (
            <CheckboxUI
              label='Отправить в телеграм?'
              id='toTelegram'
              disabled={send}
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </FormContainer>
      <ButtonUI type='submit' disabled={send}>
        Сохранить
      </ButtonUI>
    </NewEventForm>
  );
};

export default NewEvent;
