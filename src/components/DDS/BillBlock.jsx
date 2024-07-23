import React from 'react';
import * as S from './style';
import { SliderTitle } from '../../styles/slider';
import { TextSpanStyle } from 'styles/styles';

const BillBlock = ({ title, children, footer, footerColor, isOverflow }) => {
  return (
    <S.BillBlock>
      <SliderTitle>{title}</SliderTitle>
      <S.BillBlockContainer $isOverflow={isOverflow}>
        {children}
      </S.BillBlockContainer>
      <S.Line />
      <TextSpanStyle size={10} align='end' color={footerColor}>
        {footer}
      </TextSpanStyle>
    </S.BillBlock>
  );
};

export default BillBlock;
