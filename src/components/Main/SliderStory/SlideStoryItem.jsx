import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import userUrl, { ReactComponents as User } from 'images/user.svg';
import fileUrl, { ReactComponent as File } from 'images/file.svg';
import { TextSpanStyle } from 'styles/styles';
import { LinkUI } from 'ui/LinkUI';
import { useDateFormat } from 'hooks/DateFormat';
import { motion } from 'framer-motion';

const StoryItemStyle = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
`;
const StoryItemStyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const StoryItemAvatarStyle = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 40px;
  background-color: rgb(226, 226, 226);
  min-width: 30px;
  object-fit: cover;
`;
const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 0.3rem;
`;
const FileItem = styled.div`
  display: flex;
  gap: 0.3rem;
`;
const FileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const IconFile = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #85009e;
  border-radius: 40px;
  & > svg {
    width: 14px;
    height: 14px;
  }
`;
const SlideStoryItem = ({ story, last, scrollField, firstUpdate }) => {
  const messageRef = useRef(null);
  useEffect(() => {
    if (firstUpdate) {
      scrollField();
      return;
    }
    if (messageRef?.current && last) {
      messageRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, []);
  const author = story?.author;
  const details = story?.details[0];
  const getMessage = () => {
    if (details?.type === 'message') {
      return <TextSpanStyle size={12}>{details?.new}</TextSpanStyle>;
    }
    return (
      <TextSpanStyle size={12} color='#8d8d8d'>
        <em>{details?.title}</em>
      </TextSpanStyle>
    );
  };
  return (
    <StoryItemStyle
      ref={messageRef}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <StoryItemAvatarStyle src={author?.avatar || userUrl} alt='avatar' />
      <StoryItemStyleContainer>
        <TextSpanStyle color='#84019e' weight={700} size={14}>
          {author?.lastName} {author?.firstName}
        </TextSpanStyle>
        <TextSpanStyle size={9}>
          {useDateFormat(story?.created, 'DD.MM.YYYY HH:mm')}
        </TextSpanStyle>
        {getMessage()}
        {details.files && (
          <FileContainer>
            {details.files.map((file) => (
              <FileItem key={file.UID}>
                <IconFile>
                  <File />
                </IconFile>
                <FileTextContainer>
                  <TextSpanStyle size={12}>{file.name}</TextSpanStyle>
                  <LinkUI
                    size={10}
                    href={file.downloadUrl}
                    target='_blank'
                    download
                  >
                    скачать
                  </LinkUI>
                </FileTextContainer>
              </FileItem>
            ))}
          </FileContainer>
        )}
      </StoryItemStyleContainer>
    </StoryItemStyle>
  );
};

export default SlideStoryItem;
