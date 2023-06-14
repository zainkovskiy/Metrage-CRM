import React from 'react';
import styled from 'styled-components';

const ChatUsersStyle = styled.div`
  background-color: ${({theme}) => theme.color.primary};
  width: 300px;
`
export const ChatUsers = () => {
  return (
    <ChatUsersStyle>
      
    </ChatUsersStyle>
  );
};

export default ChatUsers;
