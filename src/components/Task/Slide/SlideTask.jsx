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
import styled from 'styled-components';

const ErrorComponent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const SlideTask = ({ closeSlide }) => {
  const task = useAsyncValue();
  const windowSize = useWindowSize();
  if (JSON.stringify(task) === '{}') {
    return <ErrorComponent>error</ErrorComponent>;
  }
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
