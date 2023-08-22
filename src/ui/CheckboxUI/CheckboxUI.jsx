import React from 'react';
import styled from 'styled-components';

const LabelStyle = styled.label`
  font-size: ${({ $labelSize }) => ($labelSize ? `${$labelSize}px` : '14px')};
  font-family: CeraCY, sans-serif;
  display: flex;
  gap: 0.4rem;
  align-items: center;
  cursor: pointer;
  ${({ $disabled }) => $disabled && 'opacity: .5; pointer-events: none;'}
`;
const InputTemplate = styled.span`
  width: ${({ $size }) => ($size === 'small' ? '12px' : '16px')};
  height: ${({ $size }) => ($size === 'small' ? '12px' : '16px')};
  border: 1px solid ${({ theme }) => theme.color.primary}};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: ${({ $size }) => ($size === 'small' ? '12px' : '14px')};
  ${({ $position }) => $position === 'left' && 'order: 2'};
`;
const InputStyle = styled.input`
  display: none;
  &:checked + ${InputTemplate} {
    background-color: ${({ theme }) => theme.color.primary}};
  }
`;

export const CheckboxUI = (props) => {
  const {
    label,
    size,
    position,
    defaultChecked,
    onChange,
    disabled,
    id,
    checked,
    labelSize,
  } = props;
  return (
    <LabelStyle
      htmlFor={id}
      $size={size}
      $disabled={disabled}
      $labelSize={labelSize}
    >
      <InputStyle
        type='checkbox'
        id={id}
        defaultChecked={defaultChecked}
        onChange={onChange}
        checked={checked && checked}
      />
      <InputTemplate $size={size} $position={position}>
        &#10003;
      </InputTemplate>
      {label}
    </LabelStyle>
  );
};
