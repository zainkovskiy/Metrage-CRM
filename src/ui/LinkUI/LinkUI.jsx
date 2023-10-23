import React from 'react';
import styled from 'styled-components';

const LinkStyle = styled.a`
  font-family: CeraCY, sans-serif;
  text-decoration: ${({ td }) => td || 'none'};
  font-size: ${({ size }) => size || '14'}px;
  color: ${({ theme }) => theme.color.primary};
  transition: text-decoration 0.3s;
  &:hover {
    text-decoration: ${({ td }) => td || 'underline'};
  }
`;

export const LinkUI = ({ children, td, size, href, target, download }) => {
  return (
    <LinkStyle
      href={href}
      target={target}
      td={td}
      size={size}
      download={download}
    >
      {children}
    </LinkStyle>
  );
};
