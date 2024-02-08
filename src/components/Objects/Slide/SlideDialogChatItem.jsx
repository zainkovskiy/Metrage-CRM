import React, { useState } from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useChatDate } from 'hooks/DateFormat';
import { AnimatePresence, motion } from 'framer-motion';
import { useGetAvatar } from 'hooks/MakeAvatar';
import { useDispatch } from 'react-redux';
import { toggleShowChat } from '../../../store/chatSlice';

const ChatListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ccc;
`;
const ChatListItemStyle = styled(motion.div)`
  padding: 0 0.5rem;
  height: 65px;
  background-color: ${({ $unreded }) => ($unreded ? '#fbe8ff' : '#fff')};
  transition: background-color 0.3s;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  &:hover {
    background-color: ${({ $unreded }) => ($unreded ? '#f1c7fa' : '#f3f3f3')};
  }
  &:last-child ${ChatListContainer} {
    border-bottom: none;
  }
`;
const ChatItemAvatar = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 40px;
`;
const ChatItemContent = styled.div`
  width: 100%;
  align-self: flex-start;
`;
const ChatItemContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ChatMesageContainer = styled.div`
  display: flex;
`;
const ChatName = styled(TextSpanStyle)`
  max-width: 180px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const ChatLastMessage = styled(TextSpanStyle)`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const ChatCountUnreadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
  height: 30px;
`;
const ChatCountUnread = styled(motion.span)`
  font-family: ${({ theme }) => theme.font.family};
  color: #fff;
  background-color: #808080;
  width: 1rem;
  height: 1rem;
  border-radius: 40px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  ${({ $width }) => $width && 'min-width: 30px'};
`;

const variants = {
  visible: (custom) => ({
    x: 0,
    transition: { type: 'spring', delay: custom * 0.2 },
  }),
  hidden: { x: 1000 },
};

const SlideDialogChatItem = ({ curChat, idx }) => {
  const [chat, setChat] = useState(curChat);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleShowChat(chat));
    setChat({ ...chat, unread: 0 });
  };
  return (
    <ChatListItemStyle
      onClick={handleClick}
      $unreded={chat?.unread > 0}
      variants={variants}
      custom={idx}
      animate='visible'
      initial='hidden'
    >
      <ChatListContainer>
        <ChatItemAvatar
          src={useGetAvatar(chat?.chatWith || null)}
          alt='avatar'
        />
        <ChatItemContent>
          <ChatItemContentHeader>
            <ChatName nowrap>
              {chat?.chatWith?.lastName} {chat?.chatWith?.firstName}
            </ChatName>
            <TextSpanStyle size={10} color='#909090'>
              {useChatDate(chat?.updated)}
            </TextSpanStyle>
          </ChatItemContentHeader>
          <ChatMesageContainer>
            <ChatLastMessage size={12} color='#a6a3a3'>
              {chat?.lastMessage?.text}
            </ChatLastMessage>
            <ChatCountUnreadContainer>
              <AnimatePresence>
                {chat?.unread > 0 && (
                  <ChatCountUnread
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    $width={chat?.unread > 99}
                  >
                    {chat?.unread}
                  </ChatCountUnread>
                )}
              </AnimatePresence>
            </ChatCountUnreadContainer>
          </ChatMesageContainer>
        </ChatItemContent>
      </ChatListContainer>
    </ChatListItemStyle>
  );
};

export default SlideDialogChatItem;
