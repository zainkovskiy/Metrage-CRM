import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { TextSpanStyle } from 'styles/styles';
import ChatList from 'components/Chat/ChatList';

const FieldMobileListTitle = styled.div`
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
`
const FieldMobileList = () => {
  const selectButton = useSelector((state) => state.chat.selectButton);
  return (
    <>
      <FieldMobileListTitle>
        <TextSpanStyle size={16}>{selectButton === 'chat' ? 'Чат' : 'Открытые линии'}</TextSpanStyle>
      </FieldMobileListTitle>
      <ChatList />
    </>
  );
};

export default FieldMobileList;