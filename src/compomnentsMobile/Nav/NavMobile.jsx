import React from 'react';
import LogoComponent from 'components/Main/Logo';
import MenuToogle from './MenuToogle';
import MenuList from './MenuList';
import styled from 'styled-components';
import { useCycle, motion } from "framer-motion";

const NavMobileStyle = styled.nav`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: rgb(249, 245, 245);
  justify-content: space-between;
  position: relative;
  height: 40px;
  box-sizing: border-box;
`
const NavMobile = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  return (
    <NavMobileStyle>
      <motion.div animate={isOpen ? 'open' : 'closed'} initial={false}>
        <MenuToogle toggle={() => toggleOpen()} open={isOpen}/>
        <MenuList />
      </motion.div>
      <LogoComponent />
      <div></div>
    </NavMobileStyle>
  );
};


export default NavMobile;