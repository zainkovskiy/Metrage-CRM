import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useCycle, motion, AnimatePresence } from 'framer-motion';
import { toggleShowChat } from 'store/chatSlice';

import TelegramConect from 'components/Nav/TelegramConect';
import TelegramDiscription from 'components/Nav/TelegramDiscription';
import DialogWindow from 'components/Main/DialogWindow';
import MenuProfile from 'components/Nav/MenuProfile';
import LogoComponent from 'components/Main/Logo';
import MenuToogle from './MenuToogle';
import MenuList from './MenuList';

import { HiddenBoxUI } from 'ui/HiddenBoxUI';
import { IconButtonSimple } from 'ui/IconButtonSimple';
import { TooltipUI } from 'ui/TooltipUI';
import { BadgeUI } from 'ui/BadgeUI';

const NavMobileStyle = styled.nav`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: rgb(249, 245, 245);
  justify-content: space-between;
  box-sizing: border-box;
`;
const NavMobile = () => {
  const [openBox, setOpenBox] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const isTelegram = useSelector((state) => state.user.telegramChatId);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const messageCounter = useSelector((state) => state.chat.messageCounter);
  const dispatch = useDispatch();

  const handlerShowChat = () => {
    dispatch(toggleShowChat());
  };
  const handlerHiddenBox = () => {
    setOpenBox(!openBox);
  };
  const onCloseHiddenBox = () => {
    setOpenBox(null);
  };
  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <NavMobileStyle>
      <motion.div animate={isOpen ? 'open' : 'closed'} initial={false}>
        <MenuToogle toggle={toggleOpen} open={isOpen} />
        {isOpen && <MenuList onClose={toggleOpen} />}
      </motion.div>
      <LogoComponent />
      <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
        <IconButtonSimple id='user' icon='user' onClick={handlerHiddenBox} />
        {/* <IconButtonSimple icon='heart' /> */}
        <BadgeUI badgeContent={Number(messageCounter)}>
          <IconButtonSimple icon='chat' onClick={handlerShowChat} />
        </BadgeUI>
        <AnimatePresence>
          {openBox && (
            <HiddenBoxUI id='user' onClose={onCloseHiddenBox} open={openBox}>
              <MenuProfile id='user' toggleDialog={toggleDialog} />
            </HiddenBoxUI>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        <DialogWindow onClose={toggleDialog} open={open}>
          {isTelegram ? (
            <TelegramDiscription onClose={toggleDialog} />
          ) : (
            <TelegramConect onClose={toggleDialog} />
          )}
        </DialogWindow>
      </AnimatePresence>
    </NavMobileStyle>
  );
};

export default NavMobile;
