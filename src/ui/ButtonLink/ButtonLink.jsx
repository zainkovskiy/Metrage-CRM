import React from 'react';
import styled from 'styled-components';

const ButtonLinkStyle = styled.span`
  color: #F32222;
  font-family: ${({theme}) => theme.font.family};
  font-size: ${({$size}) => $size ? $size + 'px' : '14px'};
  cursor: pointer;
  white-space: nowrap;
  &:hover{
    text-decoration: underline;
  }
`
export const ButtonLink = ({ children, size, onClick }) => {
  return (
    <ButtonLinkStyle $size={size} onClick={onClick}>
      {children}
    </ButtonLinkStyle>
  );
};
