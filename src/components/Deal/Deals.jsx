import React from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import DealCard from './DealCard';
import { device } from 'styles/device';
const DealContainer = styled.div`
  padding: 0.5rem;
  flex-grow: 1;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const DealStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: min-content;
  width: 100%;
  gap: 1rem;
  flex-grow: 1;
  overflow: auto;
  padding: 0.5rem;
  box-sizing: border-box;
  @media ${device.tablet} {
    gap: 0.5rem;
  }
`;

const Deals = () => {
  const loading = useSelector((state) => state.deal.loadingList);
  const deals = useSelector((state) => state.deal.deals);

  if (loading) {
    return <Loader />;
  }
  return (
    <DealStyle>
      <AnimatePresence>
        {deals.length > 0 &&
          deals.map((deal) => <DealCard key={deal.UID} deal={deal} />)}
      </AnimatePresence>
    </DealStyle>
  );
};

export default Deals;
