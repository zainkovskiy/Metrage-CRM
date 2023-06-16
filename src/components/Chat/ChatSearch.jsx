import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setSelectButton } from 'store/chatSlice';

const ChatSearchStyle = styled.div`
  padding: 0.5rem;
  display: flex; 
  align-items: center;
  gap: 0.5rem;
`
const ChatSearchInput = styled.input`
  font-family: ${({theme}) => theme.font.family};
  font-size: 14px;
  padding: 0.5rem;
  border: none;
  border-bottom: 1px solid #84019e;
  width: 100%;
  outline: none;
  &:placeholder{
    font-family: ${({theme}) => theme.font.family};
    font-size: 14px;
  }
`
const ChatSearchAdd = styled.button`
  min-width: 30px;
  width: 30px;
  height: 30px;
  border-radius: 40px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #84019e;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: color .3s, background-color .3s;
  &:hover{
    background-color: #fff;
    color: #84019e;
  }
  &:active{
    background-color: #84019e;
    color: #fff;
  }
`
const ChatSearch = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const newChat = () => {
    dispatch(setSelectButton('new'));
  }
  return (
    <ChatSearchStyle>
      <ChatSearchInput type="search" value={value} onChange={onChange} placeholder='Поиск'/>
      <ChatSearchAdd onClick={newChat}>+</ChatSearchAdd>
    </ChatSearchStyle>
  );
};

export default ChatSearch;