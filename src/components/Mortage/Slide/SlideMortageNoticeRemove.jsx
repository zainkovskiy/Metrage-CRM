import React from 'react';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { SliderTitle } from 'styles/slider';

const MortageNoticeRemove = styled.div`
  padding: 0.5rem;
  width: 300px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
  @media (max-width: 480px) {
    width: 90vw;
  }
`;

const SlideMortageNoticeRemove = ({ onClose, _remove }) => {
  return (
    <MortageNoticeRemove onClick={(e) => e.stopPropagation()}>
      <SliderTitle>Внимание</SliderTitle>
      <TextSpanStyle>Действие не возможно отменить. Вы уверенны?</TextSpanStyle>
      <Box jc='flex-start'>
        <ButtonUI variant='outline' size='small' onClick={onClose}>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' onClick={_remove}>
          Удалить
        </ButtonUI>
      </Box>
    </MortageNoticeRemove>
  );
};

export default SlideMortageNoticeRemove;
