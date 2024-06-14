import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const TooltipUISttyle = styled(motion.div)`
  position: relative;
  ${({ $flex }) => $flex && 'display: flex;'};
`;
const TooltipTitleStyle = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  background-color: #bc3fd4cc;
  padding: 0 0.4rem;
  border-radius: 5px;
  text-transform: lowercase;
  font-size: 12px;
  font-family: ${({ theme }) => theme.font.family};
  z-index: 99;
  user-select: none;
  pointer-events: none;
  ${({ $maxWidth }) => $maxWidth && `max-width: ${$maxWidth}px;`};
  ${({ $maxWidth }) => `white-space: ${$maxWidth ? 'wrap' : 'nowrap'};`};
`;
const hoverTextLeft = {
  initial: {
    scale: 0,
    opacity: 0,
    x: '-50%',
    y: '-100%',
  },
  animate: {
    scale: 1,
    opacity: 1,
    x: '-50%',
    y: '-100%',
  },
};
const hoverTextRight = {
  initial: {
    scale: 0,
    opacity: 0,
    x: '0',
    y: '-100%',
  },
  animate: {
    scale: 1,
    opacity: 1,
    x: '0',
    y: '-100%',
  },
};
export const TooltipUI = ({
  title,
  children,
  flex,
  maxWidth,
  position = 'left',
}) => {
  return (
    <TooltipUISttyle
      initial='initial'
      animate='initial'
      whileHover='animate'
      $flex={flex}
    >
      <TooltipTitleStyle
        $maxWidth={maxWidth}
        $position={position}
        variants={position === 'left' ? hoverTextLeft : hoverTextRight}
        transition={{
          duration: 0.3,
        }}
      >
        {title}
      </TooltipTitleStyle>
      {children}
    </TooltipUISttyle>
  );
};
