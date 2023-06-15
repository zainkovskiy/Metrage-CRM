import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ChatListItem from './ChatListItem';
import ChatSearch from './ChatSearch';


const ChatListStyle = styled.div`
  background-color: #fff;
  width: 300px;
  border-radius: 5px;
`
const ChatListContainer = styled.div`
  overflow: auto;
`
export const ChatList = () => {
  const [search, setSearch] = useState('');
  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
  }
  const filterList = (chat) => {
    if (search.length === 0) {
      return chat;
    }
    const regExp = new RegExp(search, 'i');
    const user = chat?.chatWith || null;
    if (user){
      if (regExp.test(user.lastName) || regExp.test(user.firstName)){
        return chat;
      }
    }
  }
  const chatList = useSelector((state) => state.chat.chatList);
  return (
    <ChatListStyle>
      <ChatSearch value={search} onChange={handleChange} />
      <ChatListContainer>
        {
          chatList.filter(filterList).map((chat) =>
            <ChatListItem chat={chat} key={chat.chatId} />
          )
        }
      </ChatListContainer>
    </ChatListStyle>
  );
};

export default ChatList;

