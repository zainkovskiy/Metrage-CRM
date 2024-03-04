import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { SliderTitle } from '../../../styles/slider';
import { ButtonUI } from 'ui/ButtonUI';
import { InputUI } from 'ui/InputUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { LabelStyle } from 'ui/InputUI/InputUIStyled';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewEvent,
  updateEvent,
} from '../../../store/slices/calendarSlice';
import { useAsyncValue } from 'react-router-dom';
import RadioButtonGroup from 'ui/RadioButtonGroup/RadioButtonGroup';

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
const ColorButton = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  width: 100%;
  height: 48px;
  cursor: pointer;
  background-color: ${({ id }) => id || '#ccc'};
  ${({ active, id }) => active === id && 'transform: scale(1.1)'};
  transition: transform 0.3s;
  border-radius: 5px;
`;
const NewEvent = ({ onClose }) => {
  const isAdmin = useSelector((state) => state.user?.isAdmin || '') === '1';
  const dispatch = useDispatch();
  const event = useAsyncValue();
  const [send, setSend] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: event || {},
  });
  const onSubmit = (data) => {
    setSend(true);
    if (event) {
      updateCurEvent(data);
      return;
    }
    makeNewEvent(data);
  };
  const makeNewEvent = (event) => {
    dispatch(createNewEvent(event))
      .unwrap()
      .then(() => {
        onClose();
      })
      .finally(() => {
        setSend(false);
      });
  };
  const updateCurEvent = (event) => {
    dispatch(updateEvent(event))
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
          name='color'
          control={control}
          render={({ field }) => (
            <LabelStyle>
              Цвет
              <RadioButtonGroup
                disabled={send}
                value={field.value || false}
                onChange={field.onChange}
                name='color'
                gap='0.5rem'
              >
                <ColorButton type='radio' id='#3b3bbd' />
                <ColorButton type='radio' id='#e55353' />
                <ColorButton type='radio' id='#259725' />
              </RadioButtonGroup>
            </LabelStyle>
          )}
        />
        {isAdmin && (
          <Controller
            name='toAll'
            control={control}
            render={({ field }) => (
              <CheckboxUI
                label='Для всех пользователей'
                id='toAll'
                disabled={send}
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        )}
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
