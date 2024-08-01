import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import DDSCardsItem from './DDSCardsItem';
import { device } from 'styles/device';

const DDSCardsStyle = styled.div`
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
const DDSCards = () => {
  const { ddsData } = useSelector((state) => state.dds);
  return (
    <DDSCardsStyle>
      {ddsData?.records?.length > 0 &&
        ddsData.records.map((item) => (
          <DDSCardsItem key={item.UID} dds={item} />
        ))}
    </DDSCardsStyle>
  );
};

export default DDSCards;
