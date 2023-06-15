import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const ChatUsersStyle = styled.div`
  background-color: #fff;
  width: 300px;
  border-radius: 5px;
`
export const ChatUsers = () => {
  return (
    <ChatUsersStyle>
      users
    </ChatUsersStyle>
  );
};

export default ChatUsers;


const chats = [
  {
    'chatId': 1,
    'updated': "2023-05-18 20:16:59.584908",
    'unread': 0,
    author: {
      'firstName': "Антон",
      'lastName': "Заинковский",
      'avatar': null,
    },
    lastMessage: {
      'text': "",
      'files': null,
    }
  },
]