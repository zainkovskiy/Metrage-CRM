import React, { useRef } from 'react';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { useAsyncValue } from 'react-router-dom';
import { setNewComment } from '../../../api/builderAPI';

const EditComment = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
  width: 40vw;
  height: 40vh;
  box-sizing: border-box;
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
  flex-grow: 1;
  &:focus {
    outline: 1px solid
      ${({ theme, $error }) => ($error ? 'red' : theme.color.primary)};
  }
`;

const DialogEditComment = ({ onClose }) => {
  const builder = useAsyncValue();
  const commentRef = useRef(null);
  const saveComment = () => {
    const newComment = commentRef?.current?.value || '';
    setNewComment({
      UID: builder.UID,
      description: newComment,
    });
    builder.description = newComment;
    onClose();
  };
  return (
    <EditComment onClick={(e) => e.stopPropagation()}>
      <SliderTitle>Редактировать комментарий</SliderTitle>
      <TexAreaStyle
        ref={commentRef}
        defaultValue={builder?.description || ''}
      />
      <Box jc='flex-start'>
        <ButtonUI variant='outline' size='small' onClick={onClose}>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' onClick={saveComment}>
          Сохранить
        </ButtonUI>
      </Box>
    </EditComment>
  );
};

export default DialogEditComment;
