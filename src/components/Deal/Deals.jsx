import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import DealCard from './DealCard';
import { device } from 'styles/device';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader';
import { getDealListMore } from '../../store/dealSlice';
const DealContainer = styled.div`
  overflow: auto;
  flex-grow: 1;
  padding: 0.5rem;
  box-sizing: border-box;
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
  @media ${device.tablet} {
    gap: 0.5rem;
  }
`;

const Deals = () => {
  const disaptch = useDispatch();
  const loadingMore = useSelector((state) => state.deal.loadingMore);
  const buttonMore = useSelector((state) => state.deal.buttonMore);
  const loading = useSelector((state) => state.deal.loadingList);
  const deals = useSelector((state) => state.deal.deals);
  if (loading) {
    return <Loader />;
  }
  const loadMore = () => {
    disaptch(getDealListMore());
  };
  return (
    <DealContainer>
      <DealStyle>
        <AnimatePresence>
          {deals.length > 0 &&
            deals.map((deal) => <DealCard key={deal.UID} deal={deal} />)}
        </AnimatePresence>
      </DealStyle>
      <AnimatePresence>
        {buttonMore && (
          <ButtonLoader onClick={loadMore} loading={loadingMore} fullWidth>
            Загрузить еще
          </ButtonLoader>
        )}
      </AnimatePresence>
    </DealContainer>
  );
};

export default Deals;
