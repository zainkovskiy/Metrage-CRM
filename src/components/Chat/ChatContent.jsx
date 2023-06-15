import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNotification, getChatList } from 'store/chatSlice';
import ChatList from './ChatList';
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
      <ChatList />
      <ChatField />
    </>
  );
};

export default ChatContent;