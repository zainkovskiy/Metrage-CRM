import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import backUrl, { ReactComponent as Back } from 'images/back.svg';
const FieldChatHeaderStyle = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};  
  display: flex;
  gap: 1rem;
  align-items: center;
`
const ChatAvatar = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 40px;
`
const Field = styled.div`
  background-image: url(${backUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-grow: 1;
`

const FieldChat = () => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const targetAuthor = useSelector((state) => state.chat.targetAuthor);
  console.log(currentChat);
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
    <>
      {
        (currentChat && targetAuthor) &&
        <>
          <FieldChatHeaderStyle>
            <ChatAvatar src={getAvatar()} alt='avatar' />
            <TextSpanStyle size={16}>{targetAuthor.lastName} {targetAuthor.firstName}</TextSpanStyle>
          </FieldChatHeaderStyle>
          <Field></Field>
        </>
      }
    </>
  );
};

export default FieldChat;