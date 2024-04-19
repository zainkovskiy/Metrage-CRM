import React from 'react';
import Loader from 'components/Main/Loader';
import { useSelector } from 'react-redux';
import MortageCard from './MortageCard';
import styled from 'styled-components';
import { device } from 'styles/device';

const MortageCardsContainer = styled.div`
  padding: 0.5rem;
  flex-grow: 1;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const MortageCardsStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: min-content;
  width: 100%;
  gap: 1rem;
  flex-grow: 1;
  @media ${device.tablet} {
    gap: 0.5rem;
  }
`;

const MortageCards = () => {
  const { loadingList, mortageList } = useSelector((state) => state.mortage);
  if (loadingList) {
    return <Loader />;
  }
  return (
    <MortageCardsContainer>
      <MortageCardsStyle>
        {mortageList.map((card) => (
          <MortageCard key={card.UID} mortage={card} />
        ))}
      </MortageCardsStyle>
      <span>here button more</span>
    </MortageCardsContainer>
  );
};

export default MortageCards;
