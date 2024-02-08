import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification, getChatList } from 'store/chatSlice';
import FieldMobileNotification from './FieldMobileNotification';
import FieldMobile from './FieldMobile';
import Loader from 'components/Main/Loader';

const ChatMobileContent = () => {
  const dispatch = useDispatch();
  const selectButton = useSelector((state) => state.chat.selectButton);
  const chatLoading = useSelector((state) => state.chat.chatLoading);
  useEffect(() => {
    dispatch(getNotification());
    dispatch(getChatList());
  }, []);
  const FieldComponent = getFieldComponent(selectButton);
  if (chatLoading) {
    return <Loader fill='#fff' />;
  }
  return <FieldComponent />;
};
const getFieldComponent = (select) => {
  switch (select) {
    case 'chat':
      return FieldMobile;
    case 'line':
      return FieldMobile;
    default:
      return FieldMobileNotification;
  }
};
export default ChatMobileContent;
