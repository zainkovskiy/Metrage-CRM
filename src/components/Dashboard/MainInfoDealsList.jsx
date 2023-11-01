import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from '../../styles/styles';
import { useDateFormat } from '../../hooks/DateFormat';
import MainInfoDealsItem from './MainInfoDealsItem';

const MainInfoDealsListStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;
const MainInfoDate = styled(TextSpanStyle)`
  position: sticky;
  top: 0;
  background-color: #f0dbf5;
`;
const MainInfoDealsList = ({ list }) => {
  return (
    <MainInfoDealsListStyle>
      <MainInfoDate bold color='#8d8c8c'>
        {useDateFormat(list?.date, 'DD MMMM YYYY')}
      </MainInfoDate>
      {list?.deals?.length > 0 &&
        list.deals.map((deal, idx) => (
          <MainInfoDealsItem deal={deal} key={deal.UID} />
        ))}
    </MainInfoDealsListStyle>
  );
};

export default MainInfoDealsList;
