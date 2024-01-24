import React from 'react';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import SliderInfo from './SliderInfo';
import SliderManagers from './SliderManagers';
import SliderResedentions from './SliderResedentions';

const SliderBuilder = () => {
  return (
    <SliderStyle>
      <SliderContext>
        <SliderInfo />
        <SliderManagers />
        <SliderResedentions />
      </SliderContext>
    </SliderStyle>
  );
};

export default SliderBuilder;
