import React, { useRef } from 'react';
import styled from 'styled-components';
import TaskSlideStoryItem from './TaskSlideStoryItem';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

const TaskSlideStoryFieldStyle = styled.div`
  background-color: ${({ theme }) => theme.color.secondary};
  flex-grow: 1;
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
`
const TaskSlideStoryField = () => {
  const fieldRef = useRef(null);
  const firstUpdate = useRef(true);
  const taskStory = useSelector((state) => state.task.taskStory);
  const scrollField = () => {
    if (fieldRef.current) {
      fieldRef.current.scrollTop = fieldRef.current.scrollHeight;
      firstUpdate.current = false;
    }
  }
  return (
    <TaskSlideStoryFieldStyle ref={fieldRef}>
      <AnimatePresence>
        {
          taskStory.map((story, idx) => {
            return <TaskSlideStoryItem
              key={story.UID}
              story={story}
              last={idx === taskStory?.length - 1}
              scrollField={scrollField}
              firstUpdate={firstUpdate.current}
            />
          })
        }
      </AnimatePresence>
    </TaskSlideStoryFieldStyle>
  );
};

export default TaskSlideStoryField;