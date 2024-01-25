import React from 'react';
import styled from 'styled-components';

const iconButtonColor = {
  error: '#fb1b003b',
  info: '#7cd1ff66',
  gold: '#d4d668a6',
  disabled: '#ccc',
};
const iconButtonColorSVG = {
  error: 'red',
  info: '#7cd1ff',
  gold: '#aaac5dfc',
  disabled: '#828080',
};

const IconButtonStyle = styled.div`
  padding: 0.2rem;
  background-color: transparent;
  border-radius: 40px;
  position: relative;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  ${({ $sp }) => $sp && { ...$sp }}
  &:hover:not([disabled]) {
    background-color: ${({ color }) =>
      color ? iconButtonColor[color] : '#84019e2b'};
  }
  &:active:not([disabled]) {
    background-color: #fff;
  }
  & > svg {
    fill: ${({ theme, color }) =>
      color ? iconButtonColorSVG[color] : theme.color.primary};
    stroke: ${({ theme, color }) =>
      color ? iconButtonColorSVG[color] : theme.color.primary};
    width: 14px;
    height: 14px;
    pointer-events: none;
  }
`;
export const IconButton = ({ children, sp, onClick, color, id, disabled }) => {
  const handleClick = (e) => {
    if (disabled) {
      return;
    }
    onClick && onClick(e);
  };
  return (
    <IconButtonStyle
      $sp={sp}
      onClick={handleClick}
      color={disabled ? 'disabled' : color}
      id={id}
      disabled={disabled}
    >
      {children}
    </IconButtonStyle>
  );
};
