import React from 'react';
import * as S from './style';
import { ITextUIProps } from './types';

const TextUI = (props: ITextUIProps) => {
  const {
    children,
    bold,
    size,
    color,
    sizeStr,
    nowrap,
    customColor,
    ...otherProps
  } = props;
  return (
    <S.TextUI
      $bold={bold}
      $size={size}
      $color={color}
      $customColor={customColor}
      $nowrap={nowrap}
      $sizeStr={sizeStr}
      {...otherProps}
    >
      {children}
    </S.TextUI>
  );
};

export default TextUI;
