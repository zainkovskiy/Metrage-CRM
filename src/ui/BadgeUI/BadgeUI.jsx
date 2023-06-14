import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const BadgeUIStyleContainer = styled.div`
  position: relative;
`
const BadgeUIStyle = styled(motion.div)`
  font-size: 9px;
  background-color: #84019e;
  display: flex;
  justify-content: center;
  border-radius: 40px;
  align-items: center;
  color: #fff;
  position: absolute;
  height: 1rem;
  width: 1rem;
  top: 0;
  right: 0;
`
export const BadgeUI = ({ children, badgeContent }) => {
  const badgeValue = Number.isInteger(badgeContent) ? badgeContent : null;
  return (
    <BadgeUIStyleContainer>
      {children}
      <AnimatePresence>
        {
          badgeValue > 0 &&
          <BadgeUIStyle
            initial={{scale: 0, x: '50%', y: '-50%'}}
            animate={{scale: 1, x: '50%', y: '-50%'}}
            exit={{scale: 0, x: '50%', y: '-50%'}}
          >{badgeValue}</BadgeUIStyle>
        }
      </AnimatePresence>
    </BadgeUIStyleContainer>
  );
};
