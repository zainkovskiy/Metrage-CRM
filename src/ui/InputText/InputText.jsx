import React, { useState } from 'react';
import styled from 'styled-components';

export const InputTextContainer = styled.div`
  border-radius: 6px;
  border: 1px solid transparent;
  width: 100%;
  &:has(input:focus) {
    border: 1px solid ${({ theme }) => theme.color.primary};
  }
`;
export const InputStyle = styled.input`
  font-size: 14px;
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
  &:hover {
    color: #000;
  }
  &:focus {
    color: #000;
  }
`;
const InputText = ({ value, onChange }) => {
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
      />
    </InputTextContainer>
  );
};

export default InputText;
