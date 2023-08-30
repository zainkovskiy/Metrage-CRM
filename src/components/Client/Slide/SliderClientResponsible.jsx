import React from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import metrageUrl from 'images/logo_small.svg';
const ResponsibleSide = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const ClientIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
const SliderClientResponsible = () => {
  return (
    <SliderBlock>
      <Box fullWidth ai='flex-start'>
        <ResponsibleSide>
          <SliderTitle>Ответственный</SliderTitle>
          <TextSpanStyle>Ванечкин Василий Павлович</TextSpanStyle>
          <ButtonUI size='small'>Сменить</ButtonUI>
        </ResponsibleSide>
        <ResponsibleSide>
          <SliderTitle>Автор</SliderTitle>
          <TextSpanStyle>Ванечкин Василий Павлович</TextSpanStyle>
          <Box jc='flex-end'>
            <ClientIcon src={metrageUrl} />
          </Box>
        </ResponsibleSide>
      </Box>
    </SliderBlock>
  );
};

export default SliderClientResponsible;
