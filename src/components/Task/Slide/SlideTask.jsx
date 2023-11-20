import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { SliderStyle, SliderContext } from '../../../styles/slider';
import SlideTaskMeta from './SlideTaskMeta';
import SlideTaskInfo from './SlideTaskInfo';
import SlideTaskDetail from './SlideTaskDetail';
import SlideTaskResult from './SlideTaskResult';
import SlideTaskStory from './SlideTaskStory';
import SlideTaskStatus from './SlideTaskStatus';

const SlideTask = ({ closeSlide }) => {
  const task = useAsyncValue();
  const windowSize = useWindowSize();
  return (
    <SliderStyle>
      <SliderContext>
        <SlideTaskMeta />
        <SlideTaskStatus status={task?.stageId || 0} UID={task.UID} />
        <SlideTaskInfo closeSlide={closeSlide} />
        {task?.result && <SlideTaskResult />}
        {windowSize < 768 && <SlideTaskDetail />}
        <SlideTaskStory />
      </SliderContext>
      {windowSize > 768 && <SlideTaskDetail />}
    </SliderStyle>
  );
};

export default SlideTask;
