import React, { useRef } from 'react';
import styled from 'styled-components';
import TaskSlideStoryItem from './TaskSlideStoryItem';
import { AnimatePresence } from 'framer-motion';
import TaskSlideStoryItemSkeleton from './TaskSlideStoryItemSkeleton';

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
const TaskSlideStoryField = ({ history, loader }) => {
  const fieldRef = useRef(null);
  const firstUpdate = useRef(true);
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
          loader ?
            <TaskSlideStoryItemSkeleton /> :
            <>
              {
                history.map((story, idx) => {
                  return <TaskSlideStoryItem
                    key={story.UID}
                    story={story}
                    last={idx === history?.length - 1}
                    scrollField={scrollField}
                    firstUpdate={firstUpdate.current}
                  />
                })
              }
            </>
        }
      </AnimatePresence>
    </TaskSlideStoryFieldStyle>
  );
};

export default TaskSlideStoryField;