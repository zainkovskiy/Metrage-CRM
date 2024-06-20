import React from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';
import { useAsyncValue } from 'react-router-dom';

const SlideClientStory = ({ height, fullWidth }) => {
  const client = useAsyncValue();
  return (
    <SliderStory
      fullWidth={fullWidth}
      height={height}
      source='client'
      sourceId={client.UID}
      type='contact'
    />
  );
};

export default SlideClientStory;
