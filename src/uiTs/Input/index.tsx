import React, { forwardRef } from 'react';
import * as S from './style';
import { IInputProps, InputRef } from './type';

const Input = forwardRef<InputRef, IInputProps>((props, ref) => {
  const { type = 'text', fullWidth, small, ...otherProps } = props;
  return (
    <S.InputContainer $fullWidth={fullWidth}>
      <S.Input
        ref={ref}
        type={type}
        $fullWidth={fullWidth}
        {...otherProps}
        $small={small}
      />
    </S.InputContainer>
  );
});

export default Input;
