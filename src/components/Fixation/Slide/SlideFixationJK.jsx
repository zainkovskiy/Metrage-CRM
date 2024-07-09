import React from 'react';
import * as S from './slideSlide';
import { Box } from 'ui/Box';
import { TextSpanStyle } from '../../../styles/styles';
import { ButtonLink } from '../../../ui/ButtonLink/ButtonLink';
import imgErrorUrl from 'images/img-error.svg';

const SlideFixationJK = ({ jk, title, onClick, showButton, buttonTitle }) => {
  return (
    <S.SlideFixationDeveloper>
      <Box jc='space-between' fullWidth>
        <TextSpanStyle size={12} color='rgb(133, 0, 158)'>
          {title}
        </TextSpanStyle>
        {showButton && (
          <ButtonLink size={12} color='rgb(133, 0, 158)' onClick={onClick}>
            {buttonTitle || 'Сменить'}
          </ButtonLink>
        )}
      </Box>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <S.SlideFixationJKImage src={jk?.picture || imgErrorUrl} />
        <Box column jc='flex-start' gap='0' ai='flex-start'>
          {jk?.UID === 0 ? (
            <TextSpanStyle size={12}>{jk?.name}</TextSpanStyle>
          ) : (
            <S.LinkTo to={`/residential/${jk.UID}`}>{jk?.name}</S.LinkTo>
          )}
          <TextSpanStyle size={10} color='#BAB2B2'>
            {jk?.addrStr}
          </TextSpanStyle>
        </Box>
      </div>
    </S.SlideFixationDeveloper>
  );
};
export default SlideFixationJK;
