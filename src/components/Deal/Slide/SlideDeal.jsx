import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import { useWindowSize } from 'hooks/windowSize';
import SlideDealStory from './SlideDealStory';
import SlideDealMeta from './SlideDealMeta';
import SlideDealStatus from './SlideDealStatus';
import SlideDealParticipants from './SlideDealParticipants';
import SlideDealSide from './SlideDealSide';
import SlideDealInfo from './SlideDealInfo';
import SlidePreliminaryAgreement from './SlidePreliminaryAgreement';
import SliderFiles from './SliderFiles';

const SlideDealStyle = styled.div`
  height: 100%;
  display: flex;
  gap: 0.5rem;
`;
const SlideDealContext = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  @media (min-width > 768) {
    min-width: 450px;
  }
`;

const SlideDeal = ({ onCloseSlide }) => {
  const deal = useAsyncValue();
  const windowSize = useWindowSize();
  console.log(deal);
  return (
    <SlideDealStyle>
      <SlideDealContext>
        <SlideDealMeta />
        <SlideDealStatus />
        <SlideDealParticipants />
        <SlideDealSide />
        <SlideDealInfo />
        <SlidePreliminaryAgreement />
        <SliderFiles />
        {/* {
          windowSize <= 768 && object?.isEditor &&
          <SlideObjectStory type={object?.typeEstate} id={object?.UID} fullWidth height={500}/>
        } */}
      </SlideDealContext>
      {windowSize > 768 && <SlideDealStory />}
    </SlideDealStyle>
  );
};

export default SlideDeal;
