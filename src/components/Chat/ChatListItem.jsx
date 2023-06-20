import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useChatDate } from 'hooks/DateFormat';
import { useDispatch } from 'react-redux';
import { setSelectButton, getCurrentChat } from 'store/chatSlice';

const ChatListContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ccc;
`
const ChatListItemStyle = styled.div`
  padding: 0 0.5rem;
  height: 65px;
  background-color: #fff;
  transition: background-color .3s;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  &:hover{
    background-color: #f3f3f3;
  }
  &:last-child ${ChatListContainer}{
    border-bottom: none;
  }
`
const ChatItemAvatar = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 40px;
`
const ChatItemContent = styled.div`
  width: 100%;
  align-self: flex-start;
`
const ChatItemContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ChatLastMessage = styled(TextSpanStyle)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`
const ChatListItem = ({ chat }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(getCurrentChat(chat))
    if(chat?.isOpenLines){
      return
    }
    dispatch(setSelectButton('chat'));
  }
  const getAvatar = () => {
    const user = chat?.chatWith || null;
    if (!user) {
      return `https://ui-avatars.com/api/?name=Metrage&background=85009e&color=fff`
    }
    if (user?.avatar) {
      return chat?.chatWith?.avatar
    }
    return `https://ui-avatars.com/api/?name=${user.lastName}+${user.firstName}&background=85009e&color=fff`
  }
  return (
    <ChatListItemStyle onClick={handleClick}>
      <ChatListContainer>
        <ChatItemAvatar src={getAvatar()} alt='avatar' />
        <ChatItemContent>
          <ChatItemContentHeader>
            <TextSpanStyle>{chat?.chatWith?.lastName} {chat?.chatWith?.firstName}</TextSpanStyle>
            <TextSpanStyle size={10} color='#ccc'>{useChatDate(chat?.updated)}</TextSpanStyle>
          </ChatItemContentHeader>
          <ChatLastMessage size={12} color='#a6a3a3'>{chat?.lastMessage?.text}</ChatLastMessage>
        </ChatItemContent>
      </ChatListContainer>
    </ChatListItemStyle>
  );
};

export default ChatListItem;