import React from 'react';
import { motion } from "framer-motion";
import styled from 'styled-components';

const PathStyle = styled(motion.path)`
  stroke-width: 3;
  stroke: ${({ theme }) => theme.color.primary};
  stroke-linecap: round;
`
const Path = (props) => {
  return (
    <PathStyle
      {...props}
    />
  )
}
const ButtonToggle = styled(motion.button)`
  border: none;
  background-color: transparent;
  display: flex;
  z-index: 9999;
  top: calc(0.5rem + 1px);
  left: 0.5rem;;
  ${({$open}) => $open && 'position: absolute;'};
  & > svg {
    width: 24px;
    height: 24px;
  }
`

const MenuToogle = ({ toggle, open }) => {
  return (
    <ButtonToggle onClick={toggle} $open={open}>
      <svg viewBox="0 0 24 24">
        <Path
          variants={{
            closed: { d: "M 2 4.5 L 22 4.5" },
            open: { d: "M 4.5 22 L 22 4.5" }
          }}
        />
        <Path
          d="M 2 12.5 L 22 12.5"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 }
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 20.5 L 22 20.5" },
            open: { d: "M 4.5 4.5 L 22 22" }
          }}
        />
      </svg>
    </ButtonToggle>
  );
};

export default MenuToogle;