import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useCycle, motion } from "framer-motion";
import { toggleShowChat } from 'store/chatSlice';

import LogoComponent from 'components/Main/Logo';
import MenuToogle from './MenuToogle';
import MenuList from './MenuList';

import { IconButtonSimple } from 'ui/IconButtonSimple';
import { TooltipUI } from 'ui/TooltipUI';
import { BadgeUI } from 'ui/BadgeUI';

const NavMobileStyle = styled.nav`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: rgb(249, 245, 245);
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
`
const NavMobile = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const messageCounter = useSelector((state) => state.chat.messageCounter);
  const dispatch = useDispatch();

  const handlerShowChat = () => {
    dispatch(toggleShowChat());
  }
  return (
    <NavMobileStyle>
      <motion.div animate={isOpen ? 'open' : 'closed'} initial={false}>
        <MenuToogle toggle={() => toggleOpen()} open={isOpen} />
        <MenuList />
      </motion.div>
      <LogoComponent />
      <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
        <TooltipUI title='избранное'>
          <IconButtonSimple icon='heart' />
        </TooltipUI>
        <TooltipUI title='чат'>
          <BadgeUI badgeContent={Number(messageCounter)}>
            <IconButtonSimple icon='chat' onClick={handlerShowChat} />
          </BadgeUI>
        </TooltipUI>
      </div>
    </NavMobileStyle>
  );
};


export default NavMobile;