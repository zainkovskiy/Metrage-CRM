import React, { useState } from 'react';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { LabelStyle } from '../../../ui/InputUI/InputUIStyled';

const StatusSend = styled.div`
  position: absolute;
  background-color: #fff;
  box-shadow: rgb(128, 128, 128) 0px 2px 15px 2px;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid #84019e;
  z-index: 99;
  border-radius: 5px;
  right: 0;
  top: calc(100% + 0.5rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  &::after {
    position: absolute;
    content: '';
    bottom: 100%;
    right: 3rem;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0px 10px 9px;
    border-color: transparent transparent rgb(255, 255, 255);
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
const SlideDealStatusSend = ({ onClose, setSendStatus }) => {
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState({
    reason: false,
    comment: false,
  });
  const handleChangeReason = (e) => {
    setReason(e);
    if (error.reason) {
      setError((prevState) => ({ ...prevState, reason: false }));
    }
  };
  const handleChangeComment = (e) => {
    setComment(e.target.value);
    if (error.comment) {
      setError((prevState) => ({ ...prevState, comment: false }));
    }
  };
  const isValid = () => {
    let valid = true;
    if (!reason) {
      setError((prevState) => ({ ...prevState, reason: true }));
      valid = false;
    }
    if (!comment) {
      setError((prevState) => ({ ...prevState, comment: true }));
      valid = false;
    }
    return valid;
  };
  const handleSend = () => {
    if (isValid()) {
      setSendStatus({
        reason: reason,
        comment: comment,
      });
    }
  };
  return (
    <StatusSend>
      <TextSpanStyle color='#7c7777'>Отправить в Срыв</TextSpanStyle>
      <SelectUI
        small
        onChange={handleChangeReason}
        select={reason}
        label='Причина срыва'
        error={error.reason}
      >
        <SelectItemUI value='Расторжение'>Расторжение</SelectItemUI>
        <SelectItemUI value='Тех.ошибка'>Тех.ошибка</SelectItemUI>
        <SelectItemUI value='Другое'>Другое</SelectItemUI>
      </SelectUI>
      <LabelStyle>
        Комментарий
        <TexAreaStyle
          onChange={handleChangeComment}
          value={comment}
          rows='5'
          $error={error.comment}
        />
      </LabelStyle>
      <Box>
        <ButtonUI fullWidth size='small' variant='outline' onClick={onClose}>
          Отменить
        </ButtonUI>
        <ButtonUI fullWidth size='small' onClick={handleSend}>
          Отправить
        </ButtonUI>
      </Box>
    </StatusSend>
  );
};

export default SlideDealStatusSend;
