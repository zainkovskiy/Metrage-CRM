import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import styled from 'styled-components';

//переделать addEventListener 
export const HiddenBoxUI = ({ children, id, onClose, open }) => {
  return (
    <>
      {
        open &&
        <HiddenBoxContainer
          id={id}
          onClose={onClose}
        >
          {children}
        </HiddenBoxContainer>
      }
    </>
  );
};

const HiddenBoxContainer = ({ children, id, onClose }) => {
  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  const handleClick = (e) => {
    // console.log(e.target);
    if (e?.target?.id !== id) {
      onClose();
    };
  }
  const variants = {
    open: {
      opacity: 1,
      scale: 1,
      x: 'calc(-100% + 20px)',
      y: '100%',
    }, 
    close: {
      opacity: 0,
      scale: 0,
      x: 'calc(-60% + 20px)',
      y: '50%',
    }
  }
  return (
    <HiddenBoxUIStyle
      id={id}
      variants={variants}
      initial={'close'}
      animate={'open'}
      exit={'close'}
    >
      {children}
    </HiddenBoxUIStyle>
  )
}

const HiddenBoxUIStyle = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  box-shadow: rgba(0, 0, 0, 0.71) 0px 0px 12px -2px;
  z-index: 9999;
  border-radius: 5px;
`
