import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import bellUrl, { ReactComponent as Bell } from 'images/bell.svg';
import messageUrl, { ReactComponent as Message } from 'images/chat-message.svg';
import advertisingUrl, { ReactComponent as Advertising } from 'images/advertising.svg';
import { setSelectButton } from 'store/chatSlice';
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
  const handleClick = (e) => {
    dispatch(setSelectButton(e.target.id));
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