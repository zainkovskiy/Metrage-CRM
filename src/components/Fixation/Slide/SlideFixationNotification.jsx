import React from 'react';
import * as S from './slideSlide';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { ButtonLink } from 'ui/ButtonLink/ButtonLink';
import { useAsyncValue } from 'react-router-dom';

const SlideFixationNotification = () => {
  const fixation = useAsyncValue();
  console.log(fixation);
  return (
    <S.FixationBlock>
      <SliderTitle>
        Напоминания
        <ButtonLink size={12} color='rgb(133, 0, 158)' onClick={() => {}}>
          Добавить
        </ButtonLink>
      </SliderTitle>
      <Box ai='flex-start'>
        <Box column ai='flrx-start' gap='0'>
          <TextSpanStyle size={10}>date</TextSpanStyle>
          <TextSpanStyle size={12}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
            aliquid deserunt, sit nesciunt, totam, quidem illo nihil veritatis
            blanditiis vel eveniet consectetur amet laudantium. Excepturi
            blanditiis consequuntur deserunt ratione quam?
          </TextSpanStyle>
        </Box>
        <ButtonLink size={12} color='red' onClick={() => {}}>
          Удалить
        </ButtonLink>
      </Box>
    </S.FixationBlock>
  );
};

export default SlideFixationNotification;
