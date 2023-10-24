import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import SlideDealStory from './SlideDealStory';
import SlideDealMeta from './SlideDealMeta';
import SlideDealStatus from './SlideDealStatus';
import SlideDealParticipants from './SlideDealParticipants';
import SlideDealSide from './SlideDealSide';
import SlideDealInfo from './SlideDealInfo';
import SlidePreliminaryAgreement from './SlidePreliminaryAgreement';
import SliderFiles from './SliderFiles';
import { SliderStyle, SliderContext } from '../../../styles/slider';

const SlideDeal = () => {
  const deal = useAsyncValue();
  const windowSize = useWindowSize();
  console.log(deal);
  return (
    <SliderStyle>
      <SliderContext>
        <SlideDealMeta />
        <SlideDealStatus />
        <SlideDealInfo />
        <SlideDealParticipants />
        <SlideDealSide />
        <SlidePreliminaryAgreement />
        <SliderFiles />
        {/* {
          windowSize <= 768 && object?.isEditor &&
          <SlideObjectStory type={object?.typeEstate} id={object?.UID} fullWidth height={500}/>
        } */}
      </SliderContext>
      {windowSize > 768 && <SlideDealStory UID={deal.UID} />}
    </SliderStyle>
  );
};

export default SlideDeal;
