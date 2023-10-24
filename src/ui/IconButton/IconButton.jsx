import React from 'react';
import styled from 'styled-components';

const iconButtonColor = {
  error: '#fb1b003b',
  info: '#7cd1ff66',
};
const iconButtonColorSVG = {
  error: 'red',
  info: '#7cd1ff',
};

const IconButtonStyle = styled.div`
  padding: 0.2rem;
  background-color: transparent;
  border-radius: 40px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  ${({ $sp }) => $sp && { ...$sp }}
  &:hover {
    background-color: ${({ color }) =>
      color ? iconButtonColor[color] : '#84019e2b'};
  }
  &:active {
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
export const IconButton = ({ children, sp, onClick, color, id }) => {
  return (
    <IconButtonStyle $sp={sp} onClick={onClick} color={color} id={id}>
      {children}
    </IconButtonStyle>
  );
};
