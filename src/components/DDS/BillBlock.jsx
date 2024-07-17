import React from 'react';
import * as S from './style';
import { SliderTitle } from '../../styles/slider';
import { TextSpanStyle } from 'styles/styles';

const BillBlock = ({ title, children, footer }) => {
  return (
    <S.BillBlock>
      <SliderTitle>{title}</SliderTitle>
      <S.BillBlockContainer>{children}</S.BillBlockContainer>
      <S.Line />
      <TextSpanStyle size={10} align='end'>
        {footer}
      </TextSpanStyle>
    </S.BillBlock>
  );
};

export default BillBlock;
