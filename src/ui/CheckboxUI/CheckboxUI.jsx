import React from 'react';
import styled from 'styled-components';

const LabelStyle = styled.label`
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  display: flex;
  gap: 0.4rem;
  align-items: center;
  cursor: pointer;
  order: ${({$position}) => $position === 'left' ? '1' : '2'};
  ${({$disabled}) => $disabled && 'opacity: .5; pointer-events: none;'}
`
const InputTemplate = styled.span`
  width: ${({$size}) => $size === 'small' ? '12px' : '16px'};
  height: ${({$size}) => $size === 'small' ? '12px' : '16px'};
  border: 1px solid ${({ theme }) => theme.color.primary}};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: ${({$size}) => $size === 'small' ? '12px' : '14px'};
  order: ${({$position}) => $position === 'left' ? '2' : '1'};
`
const InputStyle = styled.input`
  display: none;
  &:checked + ${InputTemplate} {
    background-color: ${({ theme }) => theme.color.primary}};
  }
`

export const CheckboxUI = ({ label, size, position, defaultChecked, onChange, disabled }) => {
  return (
    <LabelStyle htmlFor='checkbox' $size={size} $position={position} $disabled={disabled}>
      <InputStyle type='checkbox' id='checkbox' defaultChecked={defaultChecked} onChange={onChange}/>
      <InputTemplate $size={size} $position={position}>
        &#10003;
      </InputTemplate>
      {label}
    </LabelStyle>
  );
};
