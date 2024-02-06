import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import UserFinder from 'components/Main/UserFinder';
import DialogWindow from 'components/Main/DialogWindow';
import { createNewChat } from 'store/chatSlice';

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
  transition: color 0.3s, background-color 0.3s;
  &:hover {
    background-color: #fff;
    color: #84019e;
  }
  &:active {
    background-color: #84019e;
    color: #fff;
  }
`;
const ChatSearch = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const currentUserID = useSelector((state) => state.user.UID);
  const [open, setOpen] = useState(false);
  const openUserFinder = () => {
    setOpen(!open);
  };
  const selectUser = (user) => {
    openUserFinder();
    if (currentUserID.toString() === user.UID.toString()) {
      return;
    }
    dispatch(createNewChat(user));
  };
  return (
    <>
      <ChatSearchStyle>
        <ChatSearchInput
          type='search'
          value={value}
          onChange={onChange}
          placeholder='Поиск'
        />
        {/* TODO: вернуть для чата */}
        {/* <ChatSearchAdd onClick={openUserFinder}>+</ChatSearchAdd> */}
      </ChatSearchStyle>
      <DialogWindow onClose={openUserFinder} open={open}>
        <div onClick={(e) => e.stopPropagation()}>
          <UserFinder
            title='Новый чат'
            onClose={openUserFinder}
            onChange={selectUser}
          />
        </div>
      </DialogWindow>
    </>
  );
};

export default ChatSearch;
