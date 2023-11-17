import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { SliderStyle, SliderContext } from '../../../styles/slider';
import SlideTaskMeta from './SlideTaskMeta';
import SlideTaskInfo from './SlideTaskInfo';
import SlideTaskDetail from './SlideTaskDetail';
import SlideTaskResult from './SlideTaskResult';
import SlideTaskStory from './SlideTaskStory';

const SlideTask = () => {
  const task = useAsyncValue();
  const windowSize = useWindowSize();
  console.log(task);
  return (
    <SliderStyle>
      <SliderContext>
        <SlideTaskMeta />
        <SlideTaskInfo />
        <SlideTaskResult />
        {windowSize < 768 && <SlideTaskDetail />}
        <SlideTaskStory />
      </SliderContext>
      {windowSize > 768 && <SlideTaskDetail />}
    </SliderStyle>
  );
};

export default SlideTask;
