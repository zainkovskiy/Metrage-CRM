import React from 'react';
import styled, { css } from 'styled-components';

export const ButtonUI = ({
  children,
  fullWidth,
  variant,
  color = 'primary',
  disabled,
  type = 'button',
  onClick,
  size,
  id = '',
  as = '',
  to = '',
}) => {
  const ButtonComponent = getButtonVariant(variant);
  return (
    <ButtonComponent
      type={type}
      $fullWidth={fullWidth || false}
      color={color}
      disabled={disabled}
      onClick={onClick}
      size={size}
      id={id}
      as={as}
      to={to}
    >
      {children}
    </ButtonComponent>
  );
};

const getButtonVariant = (variant) => {
  switch (variant) {
    case 'fill':
      return FillButton;
    case 'outline':
      return OutlineButton;
    default:
      return FillButton;
  }
};

const buttonStyle = css`
  border-radius: 5px;
  padding: ${({ size }) => (size === 'small' ? '3px 8px' : '0.5rem')};
  font-family: CeraCY, sans-serif;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  width: ${({ $fullWidth }) => $fullWidth && '100%'};
  transition: color 0.3s, background-color 0.3s, border 0.3s;
  white-space: nowrap;
  text-decoration: none;
  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

const colors = {
  primary: '#85009e',
  error: '#df5b5b',
  accept: '#31d233',
};

const hoverColors = {
  primary: '#ffffff',
  error: '#ffffff',
  accept: '#ffffff',
};

const FillButton = styled.button`
  ${buttonStyle};
  background-color: ${({ color }) => colors[color]};
  border: 1px solid ${({ color }) => colors[color]};
  color: #ffffff;
  @media (hover: none) {
    &:active {
      background-color: ${({ color }) => colors[color] + 80};
      color: #ffffff;
    }
  }
  @media (hover: hover) {
    &:hover {
      background-color: ${({ color }) => colors[color] + 80};
      color: #ffffff;
    }
    &:active {
      background-color: ${({ color }) => colors[color]};
      color: #ffffff;
    }
  }
`;
const OutlineButton = styled.button`
  ${buttonStyle};
  background-color: #ffffff;
  border: 1px solid ${({ color }) => colors[color]};
  color: ${({ color }) => colors[color]};
  @media (hover: none) {
    &:active {
      background-color: ${({ color }) => colors[color] + 80};
      color: #ffffff;
    }
  }
  @media (hover: hover) {
    &:hover {
      background-color: ${({ color }) => colors[color] + 80};
      color: #ffffff;
    }
    &:active {
      background-color: #ffffff;
      color: ${({ color }) => colors[color]};
    }
  }
`;
