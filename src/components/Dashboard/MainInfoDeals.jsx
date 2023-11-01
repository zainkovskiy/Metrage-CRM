import React from 'react';
import { SliderTitle } from '../../styles/slider';
import styled from 'styled-components';
import MainInfoDealsList from './MainInfoDealsList';
const MainInfoDealsStyle = styled.div`
  max-height: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  overflow: auto;
`;
const MainInfoDeals = ({ deals }) => {
  return (
    <MainInfoDealsStyle>
      <SliderTitle>Сделка</SliderTitle>
      <ListContainer>
        {deals?.length > 0 &&
          deals.map((list, idx) => <MainInfoDealsList list={list} key={idx} />)}
      </ListContainer>
    </MainInfoDealsStyle>
  );
};

export default MainInfoDeals;
