import React from 'react';
import styled from 'styled-components';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
const AreYouSureStyle = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  border-radius: 5px;
`;
const AreYouSure = ({ cb, onClose }) => {
  const handleClick = (answer) => {
    cb(answer);
    onClose();
  };
  return (
    <AreYouSureStyle onClick={(e) => e.stopPropagation()}>
      <TextSpanStyle>Вы уверенны?</TextSpanStyle>
      <Box fullWidth>
        <ButtonUI
          fullWidth
          size='small'
          variant='outline'
          onClick={() => handleClick(false)}
        >
          Нет
        </ButtonUI>
        <ButtonUI fullWidth size='small' onClick={() => handleClick(true)}>
          Да
        </ButtonUI>
      </Box>
    </AreYouSureStyle>
  );
};

export default AreYouSure;
