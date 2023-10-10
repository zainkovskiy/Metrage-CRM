import React, { useState } from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { CheckboxUI } from 'ui/CheckboxUI';

const ApplicationReasonFailureStyle = styled.div`
  position: absolute;
  width: 200px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(128, 128, 128) 0px 2px 15px 2px;
  border-radius: 5px;
  top: 24px;
  right: 0;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 99;
  &::after {
    position: absolute;
    content: '';
    bottom: 100%;
    right: 1rem;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0px 10px 9px;
    border-color: transparent transparent rgb(255, 255, 255);
  }
`;
const TexAreaStyle = styled.textarea`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.primary};
  font-family: ${({ theme }) => theme.font.family};
  resize: none;
  border-radius: 5px;
  padding: 0.2rem;
  box-sizing: border-box;
  &:focus {
    outline: 1px solid ${({ theme }) => theme.color.primary};
  }
`;
const ApplicationReasonFailure = ({ setFailure, onClose }) => {
  const [value, setValue] = useState('');
  const [agent, setAgent] = useState(false);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleClick = () => {
    setFailure({
      comment: value.trim(),
      isAgent: agent,
    });
  };
  const setIsAgent = (e) => {
    setAgent(e.target.checked);
  };
  return (
    <ApplicationReasonFailureStyle>
      <TextSpanStyle color='#7c7777'>Комментарий</TextSpanStyle>
      <CheckboxUI
        label='Это агент'
        onChange={setIsAgent}
        checked={agent}
        id='isAgent'
      />
      <TexAreaStyle onChange={handleChange} value={value} rows='5' />
      <Box>
        <ButtonUI fullWidth size='small' onClick={handleClick}>
          В срыв
        </ButtonUI>
        <ButtonUI fullWidth size='small' variant='outline' onClick={onClose}>
          Отменить
        </ButtonUI>
      </Box>
    </ApplicationReasonFailureStyle>
  );
};

export default ApplicationReasonFailure;
