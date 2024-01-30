import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResidentialsCard from './ResidentialsCard';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import { AnimatePresence } from 'framer-motion';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader';
import { getResidentialListMore } from '../../store/slices/residentialSlice';

const ResidentialsCardContainer = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  overflow: auto;
  justify-content: space-between;
`;
const ResidentialsCardsStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: min-content;
  gap: 1rem;
`;

const ResidentialsCards = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.residential.loadingList);
  const residentials = useSelector((state) => state.residential.residentials);
  const buttonMore = useSelector((state) => state.residential.buttonMore);
  const loadingMore = useSelector((state) => state.residential.loadingMore);
  const loadMore = () => {
    dispatch(getResidentialListMore());
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <ResidentialsCardContainer>
      <ResidentialsCardsStyle>
        {residentials.map((item) => (
          <ResidentialsCard residential={item} key={item.UID} />
        ))}
      </ResidentialsCardsStyle>
      <AnimatePresence>
        {buttonMore && (
          <ButtonLoader onClick={loadMore} loading={loadingMore} fullWidth>
            Загрузить еще
          </ButtonLoader>
        )}
      </AnimatePresence>
    </ResidentialsCardContainer>
  );
};

export default ResidentialsCards;
