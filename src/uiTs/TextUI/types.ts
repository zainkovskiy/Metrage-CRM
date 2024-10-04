import React, { ComponentProps, PropsWithChildren } from 'react';

export interface ITextUIOwnProps extends PropsWithChildren {
  bold?: boolean;
  nowrap?: boolean;
  color?: 'primary' | 'secondary' | 'grey' | 'white';
  customColor?: string;
}

type ITextSizeNumberProps = ITextUIOwnProps & {
  size?: number;
  sizeStr?: never;
};
type ITextSizeStringProps = ITextUIOwnProps & {
  size?: never;
  sizeStr?: string;
};

export type ITextUIProps = ITextSizeNumberProps | ITextSizeStringProps;

export interface ITextStyleProps {
  $bold?: boolean;
  $nowrap?: boolean;
  $size?: number;
  $sizeStr?: string;
  $customColor?: string;
  $color?: 'primary' | 'secondary' | 'grey' | 'white';
}
