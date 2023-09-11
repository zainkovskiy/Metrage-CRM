import React from 'react';
import { SlideBlockStyle } from '../ObjectsStyle';
import { SliderTitle } from '../../../styles/slider';
import SlideObjectAdItems from './SlideObjectAdItems';

const SlideObjectAd = () => {
  return (
    <SlideBlockStyle $column gap='0'>
      <SliderTitle>Реклама</SliderTitle>
      <SlideObjectAdItems />
    </SlideBlockStyle>
  );
};

export default SlideObjectAd;
