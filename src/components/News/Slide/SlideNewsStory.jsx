import React from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';
import { useAsyncValue } from 'react-router-dom';

const SlideNewsStory = ({ fullWidth, height }) => {
  const news = useAsyncValue();

  return (
    <SliderStory
      fullWidth={fullWidth}
      height={height}
      source='news'
      type='news'
      sourceId={news?.UID}
    />
  );
};

export default SlideNewsStory;
