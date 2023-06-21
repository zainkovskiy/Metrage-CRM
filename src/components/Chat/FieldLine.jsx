import React, { useRef } from 'react';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import ChatMenu from './ChatMenu';
import { TextSpanStyle } from 'styles/styles';
import { useSelector } from 'react-redux';
import back from 'images/back.png';
import MessageItem from './MessageItem';
import FieldSend from './FieldSend';
import { AnimatePresence } from 'framer-motion';
import { LinkUI } from 'ui/LinkUI/LinkUI';

const FieldLineHeaderStyle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};  
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`
const ChatAvatar = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 40px;
`
const Field = styled.div`
  background-image: url(${back});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  overflow-y: auto;
  overflow-x: hidden;
`
const FieldLine = () => {
  const fieldRef = useRef(null);
  const firstUpdate = useRef(true);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const targetAuthor = useSelector((state) => state.chat.targetAuthor);
  const getAvatar = () => {
    if (!targetAuthor) {
      return `https://ui-avatars.com/api/?name=Metrage&background=85009e&color=fff`
    }
    if (targetAuthor?.avatar) {
      return targetAuthor.avatar
    }
    return `https://ui-avatars.com/api/?name=${targetAuthor?.lastName}+${targetAuthor?.firstName}&background=85009e&color=fff`
  }
  const scrollField = () => {
    if (fieldRef.current) {
      fieldRef.current.scrollTop = fieldRef.current.scrollHeight;
      firstUpdate.current = false;
    }
  }
  if (!currentChat){
    return
  }
  return (
    <>
      <FieldLineHeaderStyle>
        <Box>
          <ChatAvatar src={getAvatar()} alt='avatar' />
          <Box column gap='0' ai='flex-start'>
            <TextSpanStyle size={16}>{targetAuthor?.lastName} {targetAuthor?.firstName}</TextSpanStyle>
            <TextSpanStyle size={12}>
              По объекту: <LinkUI size={12} href={currentChat?.itemUrl} target='_blank'>{currentChat?.itemAddress}</LinkUI>
            </TextSpanStyle>
          </Box>
        </Box>
        <ChatMenu />
      </FieldLineHeaderStyle>
      <Field ref={fieldRef}>
        <AnimatePresence>
          {
            currentChat?.messages.map((message, idx) =>
              <MessageItem
                key={idx}
                message={message}
                target={message?.author?.UID === targetAuthor?.UID}
                last={idx === currentChat?.messages?.length - 1}
                scrollField={scrollField}
                firstUpdate={firstUpdate.current}
              />
            )
          }
        </AnimatePresence>
      </Field>
      <FieldSend />
    </>
  );
};

export default FieldLine;