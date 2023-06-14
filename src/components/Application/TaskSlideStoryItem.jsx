import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import userUrl, { ReactComponents as User } from 'images/user.svg';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import { motion } from 'framer-motion';

const StoryItemStyle = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
`
const StoryItemStyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
const StoryItemAvatarStyle = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 40px;
  background-color: rgb(226, 226, 226);
  min-width: 30px;
  object-fit: cover;
`
const TaskSlideStoryItem = ({ story, last, scrollField, firstUpdate }) => {
  const messageRef = useRef(null);
  useEffect(() => {
    if (firstUpdate) {
      scrollField();
      return
    }
    if (messageRef?.current && last) {
      messageRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [])
  const author = story?.author;
  const details = story?.details[0];
  const getMessage = () => {
    if (details?.type === 'message') {
      return <TextSpanStyle size={12}>{details?.new}</TextSpanStyle>
    }
    return <TextSpanStyle size={12} color='#8d8d8d'><em>{details?.title}</em></TextSpanStyle>
  }
  return (
    <StoryItemStyle ref={messageRef} initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <StoryItemAvatarStyle src={author?.avatar || userUrl} alt="avatar" />
      <StoryItemStyleContainer>
        <TextSpanStyle color='#84019e' weight={700} size={14}>{author?.lastName} {author?.firstName}</TextSpanStyle>
        <TextSpanStyle size={9}>{useDateFormat(story?.created)}</TextSpanStyle>
        {getMessage()}
      </StoryItemStyleContainer>
    </StoryItemStyle>
  );
};

export default TaskSlideStoryItem;