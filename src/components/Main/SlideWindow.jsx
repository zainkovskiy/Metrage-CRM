import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { CloseCircleButtonUI } from 'ui/CloseCircleButtonUI';

const SlideWindowStyle = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #00000066;
  display: flex;
  justify-content: flex-end;
  z-index: 999;
  overflow: hidden;
`
const SlideWindowContainer = styled(motion.div)`
  display: flex;
  width: ${({ width }) => width || '100%'}
`
const SlideWindowContent = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primary};
  padding: 0.5rem;
  overflow: auto;
`
const variantsBack = {
  open: {
    opacity: 1,
    transition: {
      duration: .2,
    }
  },
  close: {
    opacity: 0,
    transition: {
      duration: .2,
    }
  }
}
const variantsContent = {
  open: {
    x: 0,
    transition: {
      duration: .3,
    }
  },
  close: {
    x: 1000,
    transition: {
      duration: .3,
    }
  }
}

const SlideWindow = ({ children, width, onClose, open }) => {
  return (
    <AnimatePresence>
      {
        open &&
        <SlideWindowStyle
          variants={variantsBack}
          initial='close'
          animate='open'
          exit='close'
          onClick={onClose}
        >
          <SlideWindowContainer
            variants={variantsContent}
            initial='close'
            animate='open'
            exit='close'
            width={width}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseCircleButtonUI onClose={onClose} />
            <SlideWindowContent>
              {children}
            </SlideWindowContent>
          </SlideWindowContainer>
        </SlideWindowStyle >
      }
    </AnimatePresence>
  );
};

export default SlideWindow;
