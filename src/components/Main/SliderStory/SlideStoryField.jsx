import React, { useRef } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import SlideStoryItemSkeleton from './SlideStoryItemSkeleton';
import SlideStoryItem from './SlideStoryItem';

const SlideStoryFieldStyle = styled.div`
  background-color: ${({ theme }) => theme.color.secondary};
  flex-grow: 1;
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
`
const SlideStoryField = ({ history, loader }) => {
  const fieldRef = useRef(null);
  const firstUpdate = useRef(true);
  const scrollField = () => {
    if (fieldRef.current) {
      fieldRef.current.scrollTop = fieldRef.current.scrollHeight;
      firstUpdate.current = false;
    }
  }
  return (
    <SlideStoryFieldStyle>
      <AnimatePresence>
        {
          loader ?
            <SlideStoryItemSkeleton /> :
            <>
              {
                history.map((story, idx) => {
                  return <SlideStoryItem
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
    </SlideStoryFieldStyle>
  );
};

export default SlideStoryField;