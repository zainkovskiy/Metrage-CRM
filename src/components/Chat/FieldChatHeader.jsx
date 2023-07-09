import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Box } from 'ui/Box';
import ChatMenu from './ChatMenu';
import ChatMenuItem from './ChatMenuItem';
import { TextSpanStyle } from 'styles/styles';

const FieldChatHeaderStyle = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};  
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`
const ChatAvatar = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 40px;
`
const FieldChatHeader = () => {
  const targetAuthor = useSelector((state) => state.chat.targetAuthor);
  const getAvatar = () => {
    if (!targetAuthor) {
      return `https://ui-avatars.com/api/?name=Metrage&background=85009e&color=fff`
    }
    if (targetAuthor?.avatar) {
      return targetAuthor.avatar
    }
    return `https://ui-avatars.com/api/?name=${targetAuthor.lastName}+${targetAuthor.firstName}&background=85009e&color=fff`
  }
  return (
    <FieldChatHeaderStyle>
      <Box>
        <ChatAvatar src={getAvatar()} alt='avatar' />
        <TextSpanStyle size={16}>{targetAuthor.lastName} {targetAuthor.firstName}</TextSpanStyle>
      </Box>
      <ChatMenu>
        <ChatMenuItem onClick={() => { }}>Очистить историю</ChatMenuItem>
      </ChatMenu>
    </FieldChatHeaderStyle>
  );
};

export default FieldChatHeader;