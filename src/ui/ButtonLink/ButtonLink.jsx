import React from 'react';
import styled, { css } from 'styled-components';

const ButtonLinkStyle = styled.span`
  color: ${({ $color }) => ($color ? $color : '#F32222')};
  font-family: ${({ theme, $bold }) =>
    $bold ? theme.font.familyBold : theme.font.family};
  font-size: ${({ $size }) => ($size ? $size + 'px' : '14px')};
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    ${({ $borderNone }) => !$borderNone && 'text-decoration: underline;'}
  }
  ${({ $disabled }) =>
    $disabled &&
    css`
      color: #a1a1a1;
      pointer-events: none;
    `}
`;
export const ButtonLink = ({
  children,
  size,
  onClick,
  color,
  id,
  borderNone,
  disabled,
  bold,
}) => {
  return (
    <ButtonLinkStyle
      $size={size}
      onClick={onClick}
      $color={color}
      $bold={bold}
      id={id}
      $borderNone={borderNone}
      $disabled={disabled}
    >
      {children}
    </ButtonLinkStyle>
  );
};
