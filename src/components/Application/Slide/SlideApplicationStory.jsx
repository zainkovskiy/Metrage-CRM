import React, { useEffect, useRef } from 'react';
import { useAsyncValue, useLocation } from 'react-router-dom';
import SliderStory from 'components/Main/SliderStory/SliderStory';

const SlideApplicationStory = ({ UID, fullWidth, height }) => {
  const application = useAsyncValue();
  const locationRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (!locationRef.current) {
      locationRef.current = location;
      return;
    }
    if (locationRef?.current?.key === location?.current?.key) {
      return;
    }
    // getHistory();
  }, [location]);

  return (
    <SliderStory
      fullWidth={fullWidth}
      height={height}
      source='application'
      sourceId={application.UID}
      type='demands'
    />
  );
};

export default SlideApplicationStory;
