import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ChatListItem from './ChatListItem';
import ChatSearch from './ChatSearch';
import { device } from 'styles/device';


const ChatListStyle = styled.div`
  background-color: #fff;
  width: 300px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;
  @media ${device.tablet}{
    width: 100%;
    flex-grow: 1;
  }
`
const ChatListContainer = styled.div`
  overflow: auto;
  flex-grow: 1;
`
export const ChatList = () => {
  const selectButton = useSelector((state) => state.chat.selectButton);
  const [search, setSearch] = useState('');
  const handleChange = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
  }
  const filterList = (chat) => {
    if (selectButton === 'line') {
      if (chat?.isOpenLines) {
        return filterSearch(chat)
      }
      return
    }
    if (!chat?.isOpenLines){
      return filterSearch(chat);
    }
  }
  const filterSearch = (chat) => {
    if (search.length === 0) {
      return chat;
    }
    const regExp = new RegExp(search, 'i');
    const user = chat?.chatWith || null;
    if (user) {
      if (regExp.test(user.lastName) || regExp.test(user.firstName)) {
        return chat;
      }
    }
  }
  const chatList = useSelector((state) => state.chat.chatList.chats);
  return (
    <ChatListStyle>
      <ChatSearch value={search} onChange={handleChange} />
      <ChatListContainer>
        {
          chatList &&
          chatList.filter(filterList).map((chat) =>
            <ChatListItem chat={chat} key={chat.chatId} />
          )
        }
      </ChatListContainer>
    </ChatListStyle>
  );
};

export default ChatList;

