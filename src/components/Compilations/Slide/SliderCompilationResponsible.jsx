import React from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import styled from 'styled-components';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';

const Responsible = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SliderCompilationResponsible = () => {
  const compilation = useAsyncValue();
  return (
    <SliderBlock>
      <Responsible>
        <SliderTitle>Ответственный</SliderTitle>
        <TextSpanStyle>
          {compilation?.responsible?.firstName || ''}{' '}
          {compilation?.responsible?.lastName || ''}
        </TextSpanStyle>
      </Responsible>
    </SliderBlock>
  );
};

export default SliderCompilationResponsible;
