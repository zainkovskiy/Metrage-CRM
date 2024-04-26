import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import { ButtonUI } from 'ui/ButtonUI';
import { useForm } from 'react-hook-form';
import { device } from 'styles/device';

const CloseButtonStyle = styled.img`
  width: 18px;
  height: 18px;
  opacity: 0.5;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;
const SlideDialogCommentStyle = styled.form`
  background-color: #fff;
  width: 50vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  @media ${device.tablet} {
    width: 80vw;
    height: 80vh;
  }
`;
const SlideDialogCommentHeaderStyle = styled.div`
  padding: 0.5rem 0.5rem 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SlideDialogCommentFooter = styled.div`
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
`;
const SlideDialogCommentContent = styled.div`
  padding: 0.5rem;
  flex-grow: 1;
`;
const TextAreaContainer = styled.div`
  height: 100%;
  border: 1px solid transparent;
  border-radius: 6px;
  &:has(textarea:focus) {
    border: 1px solid ${({ theme }) => theme.color.primary};
  }
`;
const TextAreaStyle = styled.textarea`
  resize: none;
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  outline: none;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  outline: none;
`;

const SlideDialogComment = ({ onClose, comment, setNewDescription }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setNewDescription(data);
    onClose();
  };
  return (
    <SlideDialogCommentStyle
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
    >
      <SlideDialogCommentHeaderStyle>
        <TextSpanStyle>Описание</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} onClick={onClose} />
      </SlideDialogCommentHeaderStyle>
      <SlideDialogCommentContent>
        <TextAreaContainer>
          <TextAreaStyle {...register('Description')} defaultValue={comment} />
        </TextAreaContainer>
      </SlideDialogCommentContent>
      <SlideDialogCommentFooter>
        <ButtonUI size='small' onClick={onClose}>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' type='submit' variant='outline'>
          Сохранить
        </ButtonUI>
      </SlideDialogCommentFooter>
    </SlideDialogCommentStyle>
  );
};

export default SlideDialogComment;
