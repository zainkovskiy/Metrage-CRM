import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import back from 'images/back.png';
import MessageItem from './MessageItem';
import FieldSend from './FieldSend';
import { AnimatePresence } from 'framer-motion';
import FieldChatHeader from './FieldChatHeader';

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

const FieldChat = () => {
  const fieldRef = useRef(null);
  const firstUpdate = useRef(true);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const targetAuthor = useSelector((state) => state.chat.targetAuthor);

  const scrollField = () => {
    if (fieldRef.current) {
      fieldRef.current.scrollTop = fieldRef.current.scrollHeight;
      firstUpdate.current = false;
    }
  }
  return (
    <>
      {
        (currentChat && targetAuthor) &&
        <>
          <FieldChatHeader />
          <Field ref={fieldRef}>
            <AnimatePresence>
              {
                currentChat &&
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
      }
    </>
  );
};

export default FieldChat;