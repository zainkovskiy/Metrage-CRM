import React from 'react';
import styled from 'styled-components';

const LinkStyle = styled.a`
  font-family: CeraCY, sans-serif;  
  text-decoration: ${({td}) => td};
  font-size: ${({size}) => size || '14'}px;
  color: ${({theme}) => theme.color.primary};
`

export const LinkUI = ({ children, td, size, href, target }) => {
  return (
    <LinkStyle href={href} target={target} td={td} size={size}>{children}</LinkStyle>
  );
};
