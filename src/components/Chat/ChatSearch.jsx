import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getChatList, getListSearch } from '../../store/chatSlice';

const ChatSearchStyle = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const ChatSearchInput = styled.input`
  font-family: ${({ theme }) => theme.font.family};
  font-size: 14px;
  padding: 0.5rem;
  border: none;
  border-bottom: 1px solid #84019e;
  width: 100%;
  outline: none;
  background-color: transparent;
  border-radius: 0;
  &:placeholder {
    font-family: ${({ theme }) => theme.font.family};
    font-size: 14px;
  }
`;
const ChatSearch = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const reqRef = useRef(true);

  const reqChats = (curValue) => {
    if (curValue.length > 1 && reqRef.current) {
      reqRef.current = false;
      dispatch(getListSearch(curValue))
        .unwrap()
        .then(() => {
          reqRef.current = true;
        });
      return;
    }
    if (!curValue) {
      dispatch(getChatList());
    }
  };

  const handleChange = (e) => {
    const curValue = e.target.value;
    setValue(curValue);
    reqChats(curValue);
  };
  return (
    <ChatSearchStyle>
      <ChatSearchInput
        type='search'
        value={value}
        onChange={handleChange}
        placeholder='Поиск'
      />
    </ChatSearchStyle>
  );
};

export default ChatSearch;
