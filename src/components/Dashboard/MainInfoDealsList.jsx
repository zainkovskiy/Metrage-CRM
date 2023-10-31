import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from '../../styles/styles';
import { useDateFormat } from '../../hooks/DateFormat';
import MainInfoDealsItem from './MainInfoDealsItem';

const MainInfoDealsListStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;
const MainInfoDealsList = ({ list }) => {
  return (
    <MainInfoDealsListStyle>
      <TextSpanStyle bold color='#8d8c8c'>
        {useDateFormat(list?.date, 'DD MMMM YYYY')}
      </TextSpanStyle>
      {list?.deals?.length > 0 &&
        list.deals.map((deal, idx) => (
          <MainInfoDealsItem deal={deal} key={deal.UID} />
        ))}
    </MainInfoDealsListStyle>
  );
};

export default MainInfoDealsList;
