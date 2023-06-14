import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const DialogWindowStyle = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`
const variants = {
  close: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: .3,
    }
  },
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: .3,
    }
  }
}

const DialogWindow = ({ onClose, children, open }) => {
  return (
    <>
      {
        open &&
        <DialogWindowStyle onClick={onClose}
          initial={'close'}
          animate={'open'}
          exit={'close'}
          variants={variants}
        >
          {children}
        </DialogWindowStyle>
      }
    </>
  );
};

export default DialogWindow;