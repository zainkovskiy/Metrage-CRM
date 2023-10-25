import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SliderFormButtonGroupStyle = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  position: fixed;
  top: 0;
  padding: 0.5rem;
  background-color: #fff;
  left: 0;
  right: 0;
  justify-content: center;
  box-shadow: 0px 2px 10px 1px rgba(128, 128, 128, 1);
  overflow: hidden;
  align-items: center;
`;

export const SliderFormButtonGroup = ({ children }) => {
  return (
    <SliderFormButtonGroupStyle
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      transition={{
        duration: 0.3,
      }}
    >
      {children}
    </SliderFormButtonGroupStyle>
  );
};
