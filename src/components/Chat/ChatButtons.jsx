import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import bellUrl, { ReactComponent as Bell } from 'images/bell.svg';
import messageUrl, { ReactComponent as Message } from 'images/chat-message.svg';
import advertisingUrl, { ReactComponent as Advertising } from 'images/advertising.svg';
import { setSelectButton, getCurrentChat } from 'store/chatSlice';
import ChatIconButton from './ChatIconButton';

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
  const chats = useSelector((state) => state.chat.chatList);

  const handleClick = (e) => {
    const currentButton = e.target.id;
    dispatch(setSelectButton(currentButton));
    if (currentButton === 'chat' && chats.length > 0) {
      dispatch(getCurrentChat(chats[0]));
    }
  }
  return (
    <ChatButtonsStyle>
      <ChatIconButton onClick={handleClick} id='chat'><Message /></ChatIconButton>
      <ChatIconButton onClick={handleClick} id='notification'><Bell /></ChatIconButton>
      <ChatIconButton onClick={handleClick} id='line'><Advertising /></ChatIconButton>
    </ChatButtonsStyle>
  );
};

export default ChatButtons;