import React from 'react';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';

const FeatureTitle = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const SlidePreliminaryAgreement = () => {
  return (
    <SlideBlockStyle $column>
      <FeatureTitle>Предварительный договор</FeatureTitle>
    </SlideBlockStyle>
  );
};

export default SlidePreliminaryAgreement;