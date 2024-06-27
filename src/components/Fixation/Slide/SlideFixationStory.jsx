import React from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';

import { useAsyncValue } from 'react-router-dom';

const SlideFixationStory = ({ height, fullWidth }) => {
  const fixation = useAsyncValue();
  return (
    <SliderStory
      fullWidth={fullWidth}
      height={height}
      source='client_fixation'
      type='client_fixation'
      sourceId={fixation.UID}
    />
  );
};

export default SlideFixationStory;
