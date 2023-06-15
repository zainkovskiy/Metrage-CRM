import { motion } from 'framer-motion';
import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { CloseCircleButtonUI } from 'ui/CloseCircleButtonUI';
const ChatContent = lazy(() => import('components/Chat/ChatContent'));
import { toggleShowChat } from 'store/chatSlice';
import Loader from 'components/Main/Loader';

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
const ChatWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primary};
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
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
  const dispatch = useDispatch();
  const toggleChat = () => {
    dispatch(toggleShowChat());
  }
  return (
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
        <ChatWrapper>
          <Suspense fallback={<Loader fill='#fff' />}>
            <ChatContent />
          </Suspense>
        </ChatWrapper>
      </ChatContainerStyle>
    </ChatStyle>
  );
};

export default Chat;
