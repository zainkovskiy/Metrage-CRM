import React from 'react';
import { useSelector } from 'react-redux';
import FieldMobileList from './FieldMobileList';
import FieldChatMobile from './FieldChatMobile';

const FieldMobile = () => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const route = useSelector((state) => state.chat.route);
  if (currentChat || route) {
    return <FieldChatMobile />;
  }
  return <FieldMobileList />;
};

export default FieldMobile;
