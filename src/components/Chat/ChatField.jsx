import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import FieldNotification from './FieldNotification';
import FieldChat from './FieldChat';
import FieldLine from './FieldLine';
import FieldNew from './FieldNew';

const ChatFieldStyle = styled.div`
  background-color: #fff;
  flex-grow: 1;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`
const ChatField = () => {
  const selectButton = useSelector((state) => state.chat.selectButton);
  const FieldComponent = getFieldComponent(selectButton);
  return (
    <ChatFieldStyle>
      <FieldComponent />
    </ChatFieldStyle>
  );
};
const getFieldComponent = (select) => {
  switch (select) {
    case 'chat':
      return FieldChat;
    case 'line':
      return FieldLine;
    case 'new':
      return FieldNew;
    default:
      return FieldNotification;
  }
}
export default ChatField;
