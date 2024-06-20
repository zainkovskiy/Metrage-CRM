import React from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';

import { useAsyncValue } from 'react-router-dom';

const SlideMortageStory = ({ height, fullWidth }) => {
  const mortage = useAsyncValue();
  return (
    <SliderStory
      fullWidth={fullWidth}
      height={height}
      source='mortgage'
      type='mortgage'
      sourceId={mortage.UID}
    />
  );
};

export default SlideMortageStory;
