import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import bellUrl, { ReactComponent as Bell } from 'images/bell.svg';
import messageUrl, { ReactComponent as Message } from 'images/chat-message.svg';
import advertisingUrl, { ReactComponent as Advertising } from 'images/advertising.svg';
import { setSelectButton, getCurrentChat, clearCurrentChat } from 'store/chatSlice';
import ChatIconButton from './ChatIconButton';
import { BadgeUI } from 'ui/BadgeUI/BadgeUI';


const ChatButtonsStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
`

const ChatButtons = () => {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chatList);
  const notification = useSelector((state) => state.chat.notification);

  const handleClick = (e) => {
    const currentButton = e.target.id;
    dispatch(setSelectButton(currentButton));
    if (currentButton !== 'notification' && chatList.chats.length > 0) {
      const findChat = chatList.chats.find((item) => currentButton === 'chat' ? !item?.isOpenLines : item?.isOpenLines);
      if (!findChat) {
        dispatch(clearCurrentChat());
        return
      }
      dispatch(getCurrentChat(findChat));
    }
  }
  return (
    <ChatButtonsStyle>
      <BadgeUI back='#0095a0' badgeContent={chatList?.unreadCount || 0}>
        <ChatIconButton onClick={handleClick} id='chat'><Message /></ChatIconButton>
      </BadgeUI>
      <BadgeUI back='#0095a0' badgeContent={notification?.notifyUnread || 0}>
        <ChatIconButton onClick={handleClick} id='notification'><Bell /></ChatIconButton>
      </BadgeUI>
      <BadgeUI back='#0095a0' badgeContent={0}>
        <ChatIconButton onClick={handleClick} id='line'><Advertising /></ChatIconButton>
      </BadgeUI>
    </ChatButtonsStyle>
  );
};

export default ChatButtons;