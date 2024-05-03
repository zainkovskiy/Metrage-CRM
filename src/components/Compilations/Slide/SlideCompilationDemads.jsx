import React from 'react';
import { Link, useAsyncValue } from 'react-router-dom';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import styled from 'styled-components';

const SlideDemadsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SlideCompilationDemads = () => {
  const { demandId } = useAsyncValue();
  return (
    <SliderBlock>
      <SliderTitle>Заявки</SliderTitle>
      <SlideDemadsContainer>
        {demandId.map((demand) => (
          <SlideDemandLink key={demand.UID} demand={demand} />
        ))}
      </SlideDemadsContainer>
    </SliderBlock>
  );
};

const SlideDemandLinkStyle = styled(Link)`
  font-size: 12px;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.primary};
  text-decoration: none;
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      text-decoration: underline;
    }
  }
  @media (hover: none) {
    &:active {
      text-decoration: underline;
    }
  }
`;

const SlideDemandLink = ({ demand }) => {
  return (
    <SlideDemandLinkStyle to={`/application/${demand.UID}`}>
      {demand.firstName} {demand.lastName}
    </SlideDemandLinkStyle>
  );
};

export default SlideCompilationDemads;
