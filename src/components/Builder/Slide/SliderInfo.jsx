import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';

const BuilderLogo = styled.img`
  width: 70px;
  height: 70px;
`;

const SliderInfo = () => {
  const builder = useAsyncValue();
  return (
    <SliderBlock>
      <Box jc='flex-start'>
        <BuilderLogo src={builder.logo} />

        <Box ai='flex-start' column gap='0'>
          <TextSpanStyle size={20}>Застройщик {builder.name}</TextSpanStyle>
          <TextSpanStyle size={10} color='#787878'>
            Год основания: {builder.startDate}
          </TextSpanStyle>
        </Box>
      </Box>
      <Box>
        <TextSpanStyle>{builder.description}</TextSpanStyle>
      </Box>
    </SliderBlock>
  );
};

export default SliderInfo;
