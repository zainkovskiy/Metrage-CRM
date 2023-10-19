import React from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import metrageUrl from 'images/logo_small.svg';
import { useAsyncValue } from 'react-router-dom';
const ResponsibleSide = styled.div`
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
  const client = useAsyncValue();
  return (
    <SliderBlock>
      <ResponsibleSide>
        <SliderTitle>Ответственный</SliderTitle>
        <Box jc='space-between'>
          <TextSpanStyle>
            {client?.responsible?.title || 'Нет ответственного'}
          </TextSpanStyle>
          {client?.isEditor && <ButtonUI size='small'>Сменить</ButtonUI>}
        </Box>
      </ResponsibleSide>
    </SliderBlock>
  );
};

export default SliderClientResponsible;
