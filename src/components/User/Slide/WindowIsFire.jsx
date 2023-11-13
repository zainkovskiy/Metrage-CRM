import React from 'react';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { changeActiveStage } from '../../../api/usersApi';
const WindowIsFireStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.primary};
  min-width: 330px;
  box-sizing: border-box;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WindowIsFire = ({ onClose, onChange, UID }) => {
  const handleClick = () => {
    changeActiveStage(UID).then((answer) => {
      if (answer === 'OK') {
        onChange();
        onClose();
      }
    });
  };
  return (
    <WindowIsFireStyle onClick={(e) => e.stopPropagation()}>
      <Header>
        <TextSpanStyle>Вы уверены?</TextSpanStyle>
      </Header>
      <Box fullWidth>
        <ButtonUI onClick={onClose} variant='outline' fullWidth>
          НЕТ
        </ButtonUI>
        <ButtonUI onClick={handleClick} fullWidth>
          ДА
        </ButtonUI>
      </Box>
    </WindowIsFireStyle>
  );
};

export default WindowIsFire;
