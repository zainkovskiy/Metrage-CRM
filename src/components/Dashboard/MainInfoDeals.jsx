import React from 'react';
import { SliderTitle } from '../../styles/slider';
import styled from 'styled-components';
import MainInfoDealsList from './MainInfoDealsList';
const MainInfoDealsStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-height: 50%;
  overflow: auto;
`;
const MainInfoDeals = ({ deals }) => {
  const dealsList = Array.isArray(deals) ? deals : dealDefault;
  return (
    <MainInfoDealsStyle>
      <SliderTitle>Сделка</SliderTitle>
      {dealsList?.length > 0 &&
        dealsList.map((list, idx) => (
          <MainInfoDealsList list={list} key={idx} />
        ))}
    </MainInfoDealsStyle>
  );
};

const dealDefault = [
  {
    date: '2023-10-31',
    deals: [
      {
        UID: 55,
        dealTitle: null,
        Price: 4750000,
        responsible: 'Касьянова Елена',
        avatar: 'https://crm.metragegroup.com/uploads/users/1248.jpg',
      },
      {
        UID: 89,
        dealTitle: null,
        Price: 6850000,
        responsible: 'Маслова Екатерина',
        avatar: 'https://crm.metragegroup.com/uploads/users/1272.jpg',
      },
      {
        UID: 90,
        dealTitle: null,
        Price: 3750000,
        responsible: 'Касьянов Виктор',
        avatar: 'https://crm.metragegroup.com/uploads/users/1252.jpg',
      },
    ],
  },
];

export default MainInfoDeals;
