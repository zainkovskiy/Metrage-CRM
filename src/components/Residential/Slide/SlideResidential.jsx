import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import SlideResidentialInfo from './SlideResidentialInfo';
import SlideResidentialFeature from './SlideResidentialFeature';
import SlideResidentialBuilings from './SlideResidentialBuilings';

const SlideResidential = () => {
  return (
    <SliderStyle>
      <SliderContext>
        <SlideResidentialInfo />
        <SlideResidentialFeature />
        <SlideResidentialBuilings />
      </SliderContext>
    </SliderStyle>
  );
};

export default SlideResidential;
