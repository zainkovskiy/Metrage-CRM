import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';

const SlideDialog = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
  gap: 0.5rem;
`;
const SlideDialogCopy = ({ onClose, copyObj }) => {
  return (
    <SlideDialog onClick={(e) => e.stopPropagation()}>
      <TextSpanStyle>Данный объект будет скопирован</TextSpanStyle>
      <Box>
        <ButtonUI size='small' onClick={onClose} variant='outline'>
          Нет
        </ButtonUI>
        <ButtonUI size='small' onClick={copyObj}>
          Да
        </ButtonUI>
      </Box>
    </SlideDialog>
  );
};

export default SlideDialogCopy;
