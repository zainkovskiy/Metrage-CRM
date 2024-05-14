import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
`;
const variants = {
  close: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const DialogWindow = ({ onClose, children, open, disabledClose }) => {
  const handleClose = () => {
    if (disabledClose) {
      return;
    }
    onClose();
  };
  return (
    <AnimatePresence>
      {open && (
        <DialogWindowStyle
          onClick={handleClose}
          initial={'close'}
          animate={'open'}
          exit={'close'}
          variants={variants}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </DialogWindowStyle>
      )}
    </AnimatePresence>
  );
};

export default DialogWindow;
