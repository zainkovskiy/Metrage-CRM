import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { TextSpanStyle } from 'styles/styles';
import { ButtonUI } from 'ui/ButtonUI';
import { telegramDiscription } from 'store/telegramSlice';


const TelegramDiscriptionStyle = styled.div`
  border-radius: 5px;
  background-color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const TelegramDiscription = ({ onClose }) => {
  const subscrition = useSelector((state) => state.telegram.subscription);
  const userId = useSelector((state) => state.user.UID);
  useEffect(() => {
    if (!subscrition) {
      onClose();
    }
  }, [subscrition])
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(telegramDiscription(userId));
  }
  return (
    <TelegramDiscriptionStyle onClick={e => e.stopPropagation()}>
      <TextSpanStyle size={16}>
        Вы уже подключены
      </TextSpanStyle>
      <div style={{display: 'flex', gap: '1rem'}}>
        <ButtonUI variant='outline' onClick={onClose}>Закрыть</ButtonUI>
        <ButtonUI onClick={handleClick}>Отключить</ButtonUI>
      </div>
    </TelegramDiscriptionStyle>
  );
};

export default TelegramDiscription;