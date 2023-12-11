import React from 'react';
import styled from 'styled-components';

const RadioButtonStyle = styled.label`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 14px;
  cursor: pointer;
`;
const RadioButtonInput = styled.input.attrs({ type: 'radio' })`
  appearance: none;
  border: 1px solid ${({ theme }) => theme.color.primary};
  width: 14px;
  height: 14px;
  border-radius: 40px;
  cursor: pointer;
  &:checked {
    border-width: 4px;
    // background: ${({ theme }) => theme.color.primary};
  }
`;

const RadioButton = ({ name, id, label, active, onChange }) => {
  return (
    <RadioButtonStyle htmlFor={id}>
      <RadioButtonInput
        type='radio'
        name={name}
        id={id}
        checked={active && active === id}
        onChange={onChange}
      />
      {label}
    </RadioButtonStyle>
  );
};

export default RadioButton;
