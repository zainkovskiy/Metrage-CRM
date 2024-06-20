import React from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';
import { useAsyncValue } from 'react-router-dom';

const SlideObjectStory = ({ type, fullWidth, height }) => {
  const object = useAsyncValue();
  return (
    <SliderStory
      fullWidth={fullWidth}
      height={height}
      source='object'
      sourceId={object.UID}
      type={type === 'live' ? 'LivingObjects' : 'BusinessObjects'}
    />
  );
};

export default SlideObjectStory;
