import React, { ComponentProps } from 'react';

interface IInputOwnProps {
  type?: 'text' | 'date' | 'email' | 'number';
  fullWidth?: boolean;
  small?: boolean;
}

export type IInputProps = IInputOwnProps &
  Omit<ComponentProps<'input'>, keyof IInputOwnProps>;

export interface IInputStyleProps {
  $fullWidth?: boolean;
  $small?: boolean;
}

export type InputRef = HTMLInputElement;
