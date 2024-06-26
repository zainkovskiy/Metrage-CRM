import React from 'react';
import * as S from './slideSlide';
import { Box } from 'ui/Box';
import { TextSpanStyle } from '../../../styles/styles';
import { ButtonLink } from '../../../ui/ButtonLink/ButtonLink';

const SlideFixationDeveloper = ({ developer, onClick, showButton }) => {
  return (
    <S.SlideFixationDeveloper>
      <Box jc='space-between' fullWidth>
        <TextSpanStyle size={12} color='rgb(133, 0, 158)'>
          Подрядчик
        </TextSpanStyle>
        {showButton && (
          <ButtonLink size={12} color='rgb(133, 0, 158)' onClick={onClick}>
            Сменить
          </ButtonLink>
        )}
      </Box>
      <TextSpanStyle>{developer.devName}</TextSpanStyle>
    </S.SlideFixationDeveloper>
  );
};

export default SlideFixationDeveloper;
