import React, { useRef, useState } from 'react';
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
const ApplicationReasonFailure = ({ setFailure, onClose }) => {
  const refArea = useRef(null);
  const [value, setValue] = useState('');
  const [areaError, setAreaError] = useState(false);
  const [agent, setAgent] = useState(false);
  const [spam, setSpam] = useState(false);
  const handleChange = (e) => {
    setValue(e.target.value);
    if (areaError) {
      setAreaError(false);
    }
  };
  const handleClick = () => {
    if (value.length === 0) {
      setAreaError(true);
      refArea.current.focus();
      return;
    }
    setFailure({
      comment: value.trim(),
      isAgent: agent,
      isSpam: spam,
    });
  };
  const setIsAgent = (e) => {
    setAgent(e.target.checked);
  };
  const setIsSpam = (e) => {
    setSpam(e.target.checked);
  };
  return (
    <ApplicationReasonFailureStyle>
      <TextSpanStyle color='#7c7777'>Комментарий</TextSpanStyle>
      <Box jc='flex-start'>
        <CheckboxUI
          label='Это агент'
          onChange={setIsAgent}
          checked={agent}
          id='isAgent'
          size='small'
        />
        <CheckboxUI
          label='Это спам'
          onChange={setIsSpam}
          checked={spam}
          id='isSpam'
          size='small'
        />
      </Box>
      <TexAreaStyle
        ref={refArea}
        onChange={handleChange}
        value={value}
        rows='5'
        $error={areaError}
      />
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
