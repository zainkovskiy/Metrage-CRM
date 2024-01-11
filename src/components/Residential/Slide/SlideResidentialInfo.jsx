import React from 'react';
import styled from 'styled-components';
import { useAsyncValue } from 'react-router-dom';

import { ImageGalary } from 'components/Main/ImageGalary';
import { SliderBlock } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';

const SliderBlockCustom = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const SlideResidentialInfo = () => {
  const residential = useAsyncValue();
  return (
    <SliderBlockCustom>
      <div>
        <TextSpanStyle size={20} bold>
          {residential.name}
        </TextSpanStyle>
        <Box ai='flex-start' column gap='0'>
          <ButtonLink size={12} color='#85009e'>
            показать на карте
          </ButtonLink>
          <TextSpanStyle>{residential.addrString}</TextSpanStyle>
        </Box>
        <TextSpanStyle size={12} color='#9e9e9e'>
          Общее число построек: {residential.buildings.length}
        </TextSpanStyle>
      </div>
      <ImageGalary
        images={
          residential?.renderer?.length > 0
            ? residential?.renderer.map((img) => ({
                URL: img,
              }))
            : []
        }
        height={300}
        status
      />
      {residential?.description && (
        <TextSpanStyle size={12}>{residential?.description}</TextSpanStyle>
      )}
    </SliderBlockCustom>
  );
};

export default SlideResidentialInfo;
