import styled, { css } from 'styled-components';
import { IInputStyleProps } from './type';

export const InputContainer = styled.div<IInputStyleProps>`
  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}
  border-radius: 6px;
  border: 1px solid transparent;
  &:has(input:focus:not(:read-only)) {
    border: 1px solid ${({ theme }) => theme.color.primary};
  }
`;
export const Input = styled.input<IInputStyleProps>`
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  padding: ${({ $small }) => ($small ? '0.2rem 0.5rem' : '0.5rem')};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  outline: none;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  &:disabled {
    background-color: #eee;
    opacity: 0.8;
    border: 1px solid #ccc;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
