import React from 'react';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import SlidePlanMeta from './SlidePlanMeta';
import SlidePlanInfo from './SlidePlanInfo';
import SlidePlanPlatforms from './SlidePlanPlatforms';
import SlidePlanEmployes from './SlidePlanEmployes';

const SlidePlan = () => {
  return (
    <SliderStyle>
      <SliderContext>
        <SlidePlanMeta />
        <SlidePlanInfo />
        <SlidePlanPlatforms />
        <SlidePlanEmployes />
      </SliderContext>
    </SliderStyle>
  );
};

export default SlidePlan;
