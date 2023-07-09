import React, { useRef } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import MessageItem from 'components/Chat/MessageItem';
import FieldSend from 'components/Chat/FieldSend';
import back from 'images/back.png';
import FieldHeaderLine from './FieldHeaderLine';
import FieldHeaderChat from './FieldHeaderChat';

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
  border-radius: 5px;
`
const FieldChatMobile = () => {
  const fieldRef = useRef(null);
  const firstUpdate = useRef(true);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const targetAuthor = useSelector((state) => state.chat.targetAuthor);
  const selectButton = useSelector((state) => state.chat.selectButton);

  const scrollField = () => {
    if (fieldRef.current) {
      fieldRef.current.scrollTop = fieldRef.current.scrollHeight;
      firstUpdate.current = false;
    }
  }
  return (
    <>
    {
      selectButton === 'line' ? <FieldHeaderLine/> : <FieldHeaderChat/>
    }
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
  );
};

export default FieldChatMobile;