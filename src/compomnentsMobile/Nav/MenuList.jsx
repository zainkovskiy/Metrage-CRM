import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const variants = {
  open: {},
  closed: {}
}
const MenuListStyle = styled(motion.div)`
  position: fixed;
  background-color: #000000ab;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
`
const LinkNav = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-family: ${({ theme }) => theme.font.family};
`
const MenuList = ({ onClose }) => {
  return (
    <MenuListStyle variants={variants}>
      <LinkNav to='/' onClick={onClose}>Заявки</LinkNav>
      <LinkNav to='/objects' onClick={onClose}>Объекты</LinkNav>
    </MenuListStyle>
  );
};
export default MenuList;