import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { InputChatUI } from 'ui/InputChatUI';
import { sendChatMessage } from 'store/chatSlice';
import { device } from 'styles/device';

const FieldSendStyle = styled.div`
  background-color: #fff;
  border-radius: 0 0 5px 5px;
  padding: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.color.primary};
  @media ${device.tablet} {
    border-radius: 5px;
  }
`;

const FieldSend = () => {
  const dispatch = useDispatch();
  const sendMessage = (message) => {
    if (message.trimStart().length === 0) {
      return;
    }
    dispatch(sendChatMessage(message));
  };
  return (
    <FieldSendStyle>
      <InputChatUI onClick={sendMessage} noAttachment />
    </FieldSendStyle>
  );
};

export default FieldSend;
