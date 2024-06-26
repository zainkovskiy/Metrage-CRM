import React, { useState } from 'react';
import styled from 'styled-components';

export const InputTextContainer = styled.div`
  border-radius: 6px;
  box-sizing: border-box;
  border: 1px solid transparent;
  width: 100%;
  &:hover:has(input:not([disabled])) {
    border: 1px solid #ccc;
  }
  &:has(input:focus) {
    border: 1px solid ${({ theme }) => theme.color.primary};
  }
`;
export const InputStyle = styled.input`
  font-size: ${({ $size }) => ($size ? `${$size}px` : '14px')};
  font-family: CeraCY, sans-serif;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  border: none;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  text-align: end;
  color: #898989;
  ${({ $align }) => `text-align: ${$align};`};
  &:hover:not([disabled]) {
    color: #000;
  }
  &:focus {
    color: #000;
  }
  &:disabled {
    background-color: #fff;
  }
  ::-webkit-calendar-picker-indicator {
    ${({ readOnly }) => readOnly && 'display: none;'};
  }
`;
const InputText = ({
  value,
  onChange,
  align,
  disabled,
  type = 'text',
  size,
}) => {
  const [read, setRead] = useState(true);
  const setEdit = () => {
    if (read) {
      setRead(false);
    }
  };
  const setReadOnly = () => {
    setRead(true);
  };
  return (
    <InputTextContainer>
      <InputStyle
        readOnly={read}
        onClick={setEdit}
        onBlur={setReadOnly}
        value={value}
        onChange={onChange}
        $align={align}
        $size={size}
        disabled={disabled}
        type={type}
      />
    </InputTextContainer>
  );
};

export default InputText;
