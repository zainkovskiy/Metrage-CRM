import React from 'react';
import Loader from 'components/Main/Loader';
import { useDispatch, useSelector } from 'react-redux';
import FixationCard from './FixationCard';
import styled from 'styled-components';
import { device } from 'styles/device';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader';
import { getFixationListMore } from '../../store/slices/fixationSlice';

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
  const dispatch = useDispatch();
  const { loadingList, fixationList, buttonMore, loadingMore } = useSelector(
    (state) => state.fixation
  );
  if (loadingList) {
    return <Loader />;
  }
  const _more = () => {
    dispatch(getFixationListMore());
  };
  return (
    <FixationCardsContainer>
      <FixationCardsStyle>
        {fixationList.map((card) => (
          <FixationCard key={card.UID} fixation={card} />
        ))}
      </FixationCardsStyle>
      {buttonMore && (
        <ButtonLoader onClick={_more} loading={loadingMore} fullWidth>
          Загрузить еще
        </ButtonLoader>
      )}
    </FixationCardsContainer>
  );
};

export default FixationCards;
