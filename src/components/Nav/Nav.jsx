import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import { toggleShowChat } from 'store/chatSlice';

import { IconButtonSimple } from 'ui/IconButtonSimple';
import { TooltipUI } from 'ui/TooltipUI';
import { BadgeUI } from 'ui/BadgeUI';
import { HiddenBoxUI } from 'ui/HiddenBoxUI';
import LogoComponent from 'components/Main/Logo';
import MenuProfile from 'components/Nav/MenuProfile';
import TelegramConect from 'components/Nav/TelegramConect';
import TelegramDiscription from 'components/Nav/TelegramDiscription';
import DialogWindow from 'components/Main/DialogWindow';
import Search from './Search';

const NavStyle = styled.nav`
  grid-area: nav;
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 0.8rem;
  box-sizing: border-box;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`
const Nav = () => {
  const dispatch = useDispatch();
  const [openBox, setOpenBox] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const isTelegram = useSelector((state) => state.user.telegramChatId);
  const messageCounter = useSelector((state) => state.chat.messageCounter);
  const handlerHiddenBox = () => {
    setOpenBox(!openBox);
  }
  const onCloseHiddenBox = () => {
    setOpenBox(null);
  }
  const handlerShowChat = () => {
    dispatch(toggleShowChat());
  }
  const toggleDialog = () => {
    setOpen(!open);
  }
  return (
    <NavStyle>
      <LogoComponent />
      <Search />
      <div style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
        <TooltipUI title='пользователи'>
          <IconButtonSimple id='user' icon='user' onClick={handlerHiddenBox} />
        </TooltipUI>
        <TooltipUI title='база знаний'>
          <IconButtonSimple icon='book' />
        </TooltipUI>
        <TooltipUI title='избранное'>
          <IconButtonSimple icon='heart' />
        </TooltipUI>
        <TooltipUI title='чат'>
          <BadgeUI badgeContent={Number(messageCounter)}>
            <IconButtonSimple icon='chat' onClick={handlerShowChat} />
          </BadgeUI>
        </TooltipUI>
        <AnimatePresence>
          {
            openBox &&
            <HiddenBoxUI id='user' onClose={onCloseHiddenBox} open={openBox}>
              <MenuProfile id='user' toggleDialog={toggleDialog} />
            </HiddenBoxUI>
          }
        </AnimatePresence>
      </div>
      <AnimatePresence>
        <DialogWindow onClose={toggleDialog} open={open}>
          {
            isTelegram ?
              <TelegramDiscription onClose={toggleDialog} /> :
              <TelegramConect onClose={toggleDialog} />
          }
        </DialogWindow>
      </AnimatePresence>
    </NavStyle>
  );
};

export default Nav;