import React from 'react';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import SliderInfo from './SliderInfo';
import SliderResedentions from './SliderResedentions';
import SliderAddition from './SliderAddition';

const SliderBuilder = () => {
  return (
    <SliderStyle>
      <SliderContext>
        <SliderInfo />
        <SliderAddition />
        {/* <SliderResedentions /> */}
      </SliderContext>
    </SliderStyle>
  );
};

export default SliderBuilder;
