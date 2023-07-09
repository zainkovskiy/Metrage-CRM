import React from 'react';
import { useSelector } from 'react-redux';
import FieldMobileList from './FieldMobileList';
import FieldChatMobile from './FieldChatMobile';

const FieldMobile = () => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  if (currentChat) { return <FieldChatMobile /> }
  return (
    <FieldMobileList />
  );
};

export default FieldMobile;