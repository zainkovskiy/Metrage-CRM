import React, { ElementType } from 'react';
import * as S from './style';
import { IButtonLinkProps } from './types';
import { useMatch } from 'react-router-dom';
const defaultTag = 'a';
const ButtonLink = <E extends ElementType = typeof defaultTag>(
  props: IButtonLinkProps<E>
) => {
  const {
    icon,
    label,
    as = 'a',
    uppercase = false,
    underline = false,
    bold = false,
    isMatch,
    color,
    arrow,
    size,
    sizeStr,
    isNumber = false,
    ...otherProps
  } = props;

  const getIsMatch = () => {
    if (isMatch && props?.to) {
      const match = useMatch(props.to);
      return match ? true : false;
    }
    return false;
  };
  return (
    <S.ButtonLink
      as={as}
      {...otherProps}
      $isMatch={getIsMatch()}
      $uppercase={uppercase}
      $underline={underline}
      $bold={bold}
      $color={color}
      $size={size}
      $sizeStr={sizeStr}
      $isNumber={isNumber}
    >
      {arrow === 'left' && <S.ArrowIconLeft $color={color} />}
      {icon && icon}
      {label}
      {arrow === 'right' && <S.ArrowIconRight $color={color} />}
    </S.ButtonLink>
  );
};

export default ButtonLink;
