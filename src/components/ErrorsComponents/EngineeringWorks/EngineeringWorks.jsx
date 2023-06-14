import React from 'react';
import { ContainerBackgroundStyle, TextSpanStyle } from 'styles/styles';
import Logo from 'images/logo_white.svg';
import Excavator from 'images/excavator_icon.svg';
import styled from 'styled-components';

const ExcavatorStyle = styled(Excavator)`
  fill: #fff;
  height: 60px;
  width: 60px;
`

export const EngineeringWorks = () => {
  return (
    <ContainerBackgroundStyle>
      <Logo />
      <ExcavatorStyle />
      <TextSpanStyle color='#fff' size={18}>Извините, ведуться технические работы</TextSpanStyle>
    </ContainerBackgroundStyle>
  );
};