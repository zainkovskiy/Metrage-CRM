import React from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';
import { useAsyncValue } from 'react-router-dom';

const SlideTaskStory = () => {
  const task = useAsyncValue();

  return (
    <SliderStory
      fullWidth
      height={300}
      source='task'
      sourceId={task.UID}
      type='tasks'
    />
  );
};

export default SlideTaskStory;
