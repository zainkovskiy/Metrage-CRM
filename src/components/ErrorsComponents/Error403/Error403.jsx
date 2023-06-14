import React from 'react';
import { ContainerBackgroundStyle, TextSpanStyle } from 'styles/styles';
import Logo from 'images/logo_white.svg';

export const Error403 = () => {
  return (
    <ContainerBackgroundStyle>
      <Logo />
      <TextSpanStyle color='#fff' size={64}>403</TextSpanStyle>
      <TextSpanStyle color='#fff' size={18}>Нет доступа</TextSpanStyle>
    </ContainerBackgroundStyle>
  );
};
