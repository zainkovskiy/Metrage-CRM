import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNotification, getChatList } from 'store/chatSlice';
import ChatUsers from './ChatUsers';
import ChatField from './ChatField';
import ChatButtons from './ChatButtons';

const ChatContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotification());
    dispatch(getChatList());
  }, [])
  return (
    <>
      <ChatButtons />
      <ChatUsers />
      <ChatField />
    </>
  );
};

export default ChatContent;