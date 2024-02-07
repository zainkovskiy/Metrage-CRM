import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ChatListItem from './ChatListItem';
import ChatSearch from './ChatSearch';
import { device } from 'styles/device';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader';
import { getChatListMore } from '../../store/chatSlice';

const ChatListStyle = styled.div`
  background-color: #fff;
  min-width: 300px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 300px;
  @media ${device.tablet} {
    min-width: 100%;
    width: 100%;
    flex-grow: 1;
  }
`;
const ChatListContainer = styled.div`
  overflow: auto;
  flex-grow: 1;
`;
const ButtonContainer = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
`;
export const ChatList = () => {
  const dispatch = useDispatch();
  const selectButton = useSelector((state) => state.chat.selectButton);
  const buttonMore = useSelector((state) => state.chat.buttonMore);
  const loadingMore = useSelector((state) => state.chat.loadingMore);
  const moreChats = () => {
    dispatch(getChatListMore());
  };
  const chatList = useSelector((state) => state.chat.chatList.chats);
  return (
    <ChatListStyle>
      {selectButton === 'line' && (
        <>
          <ChatSearch />
          <ChatListContainer>
            {chatList &&
              chatList.map((chat) => (
                <ChatListItem chat={chat} key={chat.chatId} />
              ))}
            {buttonMore && selectButton === 'line' && (
              <ButtonContainer>
                <ButtonLoader
                  onClick={moreChats}
                  loading={loadingMore}
                  fullWidth
                >
                  Загрузить еще
                </ButtonLoader>
              </ButtonContainer>
            )}
          </ChatListContainer>
        </>
      )}
    </ChatListStyle>
  );
};

export default ChatList;
