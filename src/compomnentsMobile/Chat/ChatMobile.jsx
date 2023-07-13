import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import ChatMobileHeader from './ChatMobileHeader';
import ChatMobileContent from './ChatMobileContent';
import ChatButtons from 'components/Chat/ChatButtons';

const ChatMobileStyle = styled(motion.div)`
  background-color: ${({ theme }) => theme.color.primary};
  display: flex;
  height: ${document.documentElement.clientHeight}px;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  box-sizing: border-box;
`
const ChatContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  overflow: hidden;
  height: ${document.documentElement.clientHeight}px;
`
const variantsChat = {
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

const ChatMobile = () => {
  return (
    <ChatContainer>
      <ChatMobileStyle
        variants={variantsChat}
        initial='close'
        animate='open'
        exit='close'
      >
        <ChatMobileHeader />
        <ChatButtons jc='space-around' />
        <ChatMobileContent/>
      </ChatMobileStyle>
    </ChatContainer>
  );
};
export default ChatMobile;