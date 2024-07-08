import React from 'react';
import { Box } from 'ui/Box';
import * as S from './slideSlide';
import { TextSpanStyle } from '../../../styles/styles';
import { ButtonLink } from '../../../ui/ButtonLink/ButtonLink';

const SlideFixationAgent = ({
  agent,
  title,
  clickChange,
  showButton,
  isPhone,
  isEmail,
}) => {
  return (
    <Box fullWidth column gap='0'>
      <Box jc='space-between' fullWidth>
        <TextSpanStyle>{title}</TextSpanStyle>
        {showButton && (
          <ButtonLink size={12} color='rgb(133, 0, 158)' onClick={clickChange}>
            Сменить
          </ButtonLink>
        )}
      </Box>
      <S.SliderAgent>
        <S.AvatarImage src={agent?.avatar} />
        <Box column ai='flex-start' gap='0'>
          <TextSpanStyle size={12}>{agent?.fullName}</TextSpanStyle>
          <TextSpanStyle size={10}>{agent?.office}</TextSpanStyle>
          {isEmail && <TextSpanStyle size={10}>{agent?.email}</TextSpanStyle>}
          {isPhone && <TextSpanStyle size={10}>{agent?.phone}</TextSpanStyle>}
        </Box>
      </S.SliderAgent>
    </Box>
  );
};

export default SlideFixationAgent;
