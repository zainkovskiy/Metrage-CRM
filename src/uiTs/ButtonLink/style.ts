import styled, { css } from 'styled-components';
import { IButtonLinkStyleProps } from './types';
import { ReactComponent as Arrow } from '../../public/images/arrow-down.svg';

export const ButtonLink = styled.a<IButtonLinkStyleProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme, $color }) =>
    $color ? theme.color[$color] : '#000'} !important;
  font-size: ${({ $size, $sizeStr }) =>
    $size ? `${$size}px` : $sizeStr ? $sizeStr : '14px'};
  cursor: pointer;
  transition: color 0.3s;
  text-decoration: none;
  ${({ $underline }) =>
    $underline &&
    css`
      text-decoration: underline;
    `}
  ${({ $isMatch }) =>
    $isMatch &&
    css`
      text-decoration: underline;
    `}
  ${({ $uppercase }) =>
    $uppercase &&
    css`
      text-transform: uppercase;
    `}
  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.color.primary} !important;
    }
    &:active {
      color: ${({ theme }) => theme.color.primary} !important;
    }
  }
  @media (hover: none) {
    &:active {
      color: ${({ theme }) => theme.color.grey} !important;
    }
  }
`;

export const ArrowIconLeft = styled(Arrow)<{ $color?: string }>`
  transform: rotate(-90deg);
  ${({ $color }) => css`
    fill: ${$color};
  `}
`;
export const ArrowIconRight = styled(Arrow)<{ $color?: string }>`
  transform: rotate(90deg);
  ${({ $color }) => css`
    fill: ${$color};
  `}
`;
