import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import ChatMenu from 'components/Chat/ChatMenu';
import ChatMenuItem from 'components/Chat/ChatMenuItem';
import ButtonBack from 'ui/ButtonBack/ButtonBack';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentChat } from 'store/chatSlice';

const FieldHeaderChatStyle = styled.div`
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
`
const ChatAvatar = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
  border-radius: 40px;
`
const FieldHeaderChat = () => {
  const dispatch = useDispatch();
  const targetAuthor = useSelector((state) => state.chat.targetAuthor);
  const backToList = () => {
    dispatch(clearCurrentChat());
  }
  const getAvatar = () => {
    if (!targetAuthor) {
      return `https://ui-avatars.com/api/?name=Metrage&background=85009e&color=fff`
    }
    if (targetAuthor?.avatar) {
      return targetAuthor.avatar
    }
    return `https://ui-avatars.com/api/?name=${targetAuthor?.lastName}+${targetAuthor?.firstName}&background=85009e&color=fff`
  }
  return (
    <FieldHeaderChatStyle>
      <Box fullWidth jc='flex-start'>
        <ButtonBack onClick={backToList} />
      </Box>
      <Box fullWidth>
        <ChatAvatar src={getAvatar()} alt='avatar' />
        <TextSpanStyle nowrap size={16}>{targetAuthor?.lastName} {targetAuthor?.firstName}</TextSpanStyle>
      </Box>
      <Box fullWidth jc='flex-end'>
        <ChatMenu>
          <ChatMenuItem onClick={() => { }}>Очистить историю</ChatMenuItem>
        </ChatMenu>
      </Box>
    </FieldHeaderChatStyle>
  );
};

export default FieldHeaderChat;