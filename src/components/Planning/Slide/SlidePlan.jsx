import React, { useState } from 'react';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import SlidePlanMeta from './SlidePlanMeta';
import SlidePlanInfo from './SlidePlanInfo';
import SlidePlanPlatforms from './SlidePlanPlatforms';
import SlidePlanEmployes from './SlidePlanEmployes';

const SlidePlan = () => {
  const [change, setChange] = useState(false);
  const handleChange = () => {
    setChange(!change);
  };
  return (
    <SliderStyle>
      <SliderContext>
        <SlidePlanMeta setChange={handleChange} />
        <SlidePlanInfo />
        <SlidePlanPlatforms setChange={handleChange} />
        <SlidePlanEmployes />
      </SliderContext>
    </SliderStyle>
  );
};
export default SlidePlan;
