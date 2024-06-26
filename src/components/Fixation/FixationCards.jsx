import React from 'react';
import Loader from 'components/Main/Loader';
import { useSelector } from 'react-redux';
import FixationCard from './FixationCard';
import styled from 'styled-components';
import { device } from 'styles/device';

const FixationCardsContainer = styled.div`
  padding: 0.5rem;
  flex-grow: 1;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const FixationCardsStyle = styled.div`
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

const FixationCards = () => {
  const { loadingList, fixationList } = useSelector((state) => state.fixation);
  if (loadingList) {
    return <Loader />;
  }
  return (
    <FixationCardsContainer>
      <FixationCardsStyle>
        {fixationList.map((card) => (
          <FixationCard key={card.UID} fixation={card} />
        ))}
      </FixationCardsStyle>
    </FixationCardsContainer>
  );
};

export default FixationCards;
