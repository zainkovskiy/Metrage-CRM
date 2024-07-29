import React from 'react';
import Loader from 'components/Main/Loader';
import { useDispatch, useSelector } from 'react-redux';
import MortageCard from './MortageCard';
import styled from 'styled-components';
import { device } from 'styles/device';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader';
import { getMortageListMore } from '../../store/slices/mortageSlice';

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
  const dispatch = useDispatch();
  const { loadingList, mortageList, buttonMore, loadingMore } = useSelector(
    (state) => state.mortage
  );
  if (loadingList) {
    return <Loader />;
  }
  const _more = () => {
    dispatch(getMortageListMore());
  };
  return (
    <MortageCardsContainer>
      <MortageCardsStyle>
        {mortageList.map((card) => (
          <MortageCard key={card.UID} mortage={card} />
        ))}
      </MortageCardsStyle>
      {buttonMore && (
        <ButtonLoader onClick={_more} loading={loadingMore} fullWidth>
          Загрузить еще
        </ButtonLoader>
      )}
    </MortageCardsContainer>
  );
};

export default MortageCards;
