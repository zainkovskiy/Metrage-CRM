import React from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';
import { useAsyncValue } from 'react-router-dom';

const SlideDealStory = () => {
  const deal = useAsyncValue();
  return <SliderStory source='deal' sourceId={deal.UID} type='deal' />;
};

export default SlideDealStory;
