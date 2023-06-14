import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CloseCircleButtonUI } from 'ui/CloseCircleButtonUI';
import ChatUsers from 'components/Chat/ChatUsers';
import ChatField from 'components/Chat/ChatField';
import { toggleShowChat } from '../../store/chatSlice';

const ChatStyle = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #00000066;
  display: flex;
  z-index: 999;
  padding-left: 30px;
  overflow: hidden;
`
const ChatContainerStyle = styled(motion.div)`
  display: flex;
  flex-grow: 1;
`
const variants = {
  open: {
    opacity: 1,
    transition: {
      duration: .3,
    }
  },
  close: {
    opacity: 0,
    transition: {
      duration: .3,
    }
  }
}
const variantsContainer = {
  open: {
    x: 0,
    transition: {
      duration: .3,
    }
  },
  close: {
    x: 1000,
    transition: {
      duration: .3,
    }
  }
}

const Chat = () => {
  const showChat = useSelector((state) => state.chat.show);
  const dispatch = useDispatch();
  const toggleChat = () => {
    dispatch(toggleShowChat());
  }
  return (
    <AnimatePresence>
      {
        showChat &&
        <ChatStyle
          variants={variants}
          initial='close'
          animate='open'
          exit='close'
        >
          <ChatContainerStyle
            variants={variantsContainer}
            initial='close'
            animate='open'
            exit='close'
          >
            <CloseCircleButtonUI onClose={toggleChat} />
            <ChatUsers />
            <ChatField />
          </ChatContainerStyle>
        </ChatStyle>
      }
    </AnimatePresence>
  );
};

export default Chat;
