import styled, { css } from 'styled-components';
import { ITextStyleProps } from './types';

export const TextUI = styled.span<ITextStyleProps>`
  font-family: ${({ theme, $bold }) =>
    $bold ? theme.font.familyBold : theme.font.family};
  color: ${({ theme, $color, $customColor }) =>
    $customColor ? $customColor : $color ? theme.color[$color] : '#000'};
  font-size: ${({ $size, $sizeStr }) =>
    $size ? `${$size}px` : $sizeStr ? $sizeStr : '14px'};
  ${({ $nowrap }) =>
    $nowrap &&
    css`
      white-space: nowrap;
    `};
`;
