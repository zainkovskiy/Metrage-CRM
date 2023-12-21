import React, { useState } from 'react';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { ReactComponent as Close } from 'images/close.svg';
import styled from 'styled-components';
import { useController, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAsyncValue } from 'react-router-dom';
import { setNewBigComment } from '../../../store/applicationSlice';

const ApplicationEditNoteStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.primary};
  width: 50vw;
`;
const ApplicationEditNoteHeader = styled.div`
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
const ApplicationEditNote = ({ onClose }) => {
  const application = useAsyncValue();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { field } = useController({
    name: 'bigComment',
    defaultValue: application?.bigComment || '',
    control,
    rules: { required: 'Заполните комментарий' },
  });
  const [disabled, setDisabled] = useState(false);

  const onSubmit = (data) => {
    setDisabled(true);
    dispatch(setNewBigComment({ ...data, UID: application.UID }))
      .unwrap()
      .then(() => {
        if (application) {
          application.bigComment = data.bigComment;
        }
        onClose();
      })
      .finally(() => {
        setDisabled(false);
      });
  };
  return (
    <ApplicationEditNoteStyle
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ApplicationEditNoteHeader>
        <TextSpanStyle>Редактировать примечание</TextSpanStyle>
        <CloseButtonStyle onClick={onClose} disabled={disabled} />
      </ApplicationEditNoteHeader>
      <TexAreaStyle
        {...field}
        onChange={(e) => field.onChange(e.target.value.trimStart())}
        $error={errors?.bigComment}
        rows='8'
        disabled={disabled}
      />
      {errors?.bigComment && (
        <TextSpanStyle size={12} color='red'>
          {errors.bigComment.message}
        </TextSpanStyle>
      )}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ButtonUI disabled={disabled} type='submit'>
          Сохранить
        </ButtonUI>
        <ButtonUI disabled={disabled} onClick={onClose} variant='outline'>
          Закрыть
        </ButtonUI>
      </div>
    </ApplicationEditNoteStyle>
  );
};

export default ApplicationEditNote;
