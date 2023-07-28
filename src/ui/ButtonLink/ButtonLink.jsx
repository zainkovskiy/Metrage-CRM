import React from 'react';
import styled from 'styled-components';

const ButtonLinkStyle = styled.span`
  color: ${({$color}) => $color ? $color : '#F32222'};
  font-family: ${({theme}) => theme.font.family};
  font-size: ${({$size}) => $size ? $size + 'px' : '14px'};
  cursor: pointer;
  white-space: nowrap;
  &:hover{
    text-decoration: underline;
  }
`
export const ButtonLink = ({ children, size, onClick, color }) => {
  return (
    <ButtonLinkStyle $size={size} onClick={onClick} $color={color}>
      {children}
    </ButtonLinkStyle>
  );
};
