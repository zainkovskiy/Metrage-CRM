import React from 'react';
import { ContainerBackgroundStyle, TitleFormStyle, TextSpanStyle } from 'styles/styles';
import Logo from 'images/logo_white.svg';

export const Error404 = () => {
  return (
    <ContainerBackgroundStyle>
      <Logo />
      <TextSpanStyle color='#fff' size={64}>404</TextSpanStyle>
      <TextSpanStyle color='#fff' size={18}>Страница не найдена</TextSpanStyle>
    </ContainerBackgroundStyle>
  );
};
