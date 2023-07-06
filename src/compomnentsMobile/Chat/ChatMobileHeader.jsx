import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleShowChat } from 'store/chatSlice';

const ChatMobileHeader = () => {
  const dispatch = useDispatch();
  const click = () => {
    dispatch(toggleShowChat());
  }
  return (
    <div>
      <button onClick={click}>close</button>
    </div>
  );
};

export default ChatMobileHeader;