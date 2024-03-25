import React, { useState } from 'react';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { LabelStyle } from 'ui/InputUI/InputUIStyled';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import styled from 'styled-components';
import { useController, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setNewContact } from 'store/applicationSlice';
import moment from 'moment';
import { useAsyncValue } from 'react-router-dom';
import { useDateFormat } from 'hooks/DateFormat';

const ApplicationNextContactStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.primary};
`;
const ApplicationNextContactHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CloseButtonStyle = styled(Close)`
  ${({ disabled }) => disabled && 'pointer-events: none'};
  width: 18px;
  height: 18px;
  opacity: ${({ disabled }) => (disabled ? '.2' : '.5')};
  cursor: pointer;
  transition: transform 0.3s, fill 0.3s;
  &:hover {
    fill: red;
  }
  &:active {
    transform: scale(0.7);
  }
`;
const TexAreaStyle = styled.textarea`
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
const ApplicationNextContact = ({ onClose }) => {
  const application = useAsyncValue();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const { field } = useController({
    name: 'comment',
    control,
    rules: { required: 'Заполните комментарий' },
  });
  const [disabled, setDisabled] = useState(false);

  const onSubmit = (data) => {
    setDisabled(true);
    dispatch(setNewContact({ form: data, UID: application.UID }))
      .unwrap()
      .then(() => {
        if (application) {
          application.demand.nextContactStr =
            useDateFormat(data.nextDate, 'DD.MM.YYYY') + ' ' + data.nextTime;
          application.demand.comment = data.comment;
        }
        onClose();
      })
      .finally(() => {
        setDisabled(false);
      });
  };
  return (
    <ApplicationNextContactStyle
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ApplicationNextContactHeaderStyle>
        <TextSpanStyle>Следующий контакт</TextSpanStyle>
        <CloseButtonStyle onClick={onClose} disabled={disabled} />
      </ApplicationNextContactHeaderStyle>
      <InputUI
        register={register('nextDate', {
          required: 'Выберите дату',
          validate: {
            isAfter: (v) =>
              moment().isSameOrBefore(v, 'day') || 'Дата не корректна',
          },
        })}
        type='date'
        width='300px'
        error={errors.nextDate}
        disabled={disabled}
      />
      <InputUI
        register={register('nextTime')}
        type='time'
        width='300px'
        disabled={disabled}
      />
      <LabelStyle>
        Комментарий
        <TexAreaStyle
          {...field}
          onChange={(e) => field.onChange(e.target.value.trimStart())}
          $error={errors?.comment}
          rows='5'
          disabled={disabled}
        />
        {errors?.comment && (
          <TextSpanStyle size={12} color='red'>
            {errors.comment.message}
          </TextSpanStyle>
        )}
      </LabelStyle>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ButtonUI disabled={disabled} type='submit'>
          Сохранить
        </ButtonUI>
        <ButtonUI disabled={disabled} onClick={onClose} variant='outline'>
          Закрыть
        </ButtonUI>
      </div>
    </ApplicationNextContactStyle>
  );
};

export default ApplicationNextContact;
