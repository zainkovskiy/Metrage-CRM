import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Bell } from 'images/bell.svg';
import { ReactComponent as Message } from 'images/chat-message.svg';
import { ReactComponent as Advertising } from 'images/advertising.svg';
import { setSelectButton, getChatList } from 'store/chatSlice';
import ChatIconButton from './ChatIconButton';
import { BadgeUI } from 'ui/BadgeUI/BadgeUI';
import { getNotification } from '../../store/chatSlice';

const ChatButtonsStyle = styled.div`
  display: flex;
  ${({ $column }) => $column && 'flex-direction: column;'}
  ${({ $jc }) => $jc && `justify-content: ${$jc};`}
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
`;

const ChatButtons = ({ column, jc }) => {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chatList);
  const notification = useSelector((state) => state.chat.notification);

  const handleClick = (e) => {
    const currentButton = e.target.id;
    dispatch(setSelectButton(currentButton));
    if (currentButton === 'notification') {
      dispatch(getNotification());
      return;
    }
    dispatch(getChatList());
  };
  return (
    <ChatButtonsStyle $column={column} $jc={jc}>
      {/* TODO: вернуть для чата */}
      {/* <BadgeUI back='#0095a0' badgeContent={chatList?.unreadCount || 0}>
        <ChatIconButton onClick={handleClick} id='chat'>
          <Message />
        </ChatIconButton>
      </BadgeUI> */}
      <BadgeUI back='#0095a0' badgeContent={notification?.notifyUnread || 0}>
        <ChatIconButton onClick={handleClick} id='notification'>
          <Bell />
        </ChatIconButton>
      </BadgeUI>
      <BadgeUI
        back='#0095a0'
        badgeContent={chatList?.unreadOpenLinesCount || 0}
      >
        <ChatIconButton onClick={handleClick} id='line'>
          <Advertising />
        </ChatIconButton>
      </BadgeUI>
    </ChatButtonsStyle>
  );
};

export default ChatButtons;
