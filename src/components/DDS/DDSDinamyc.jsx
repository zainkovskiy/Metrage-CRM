import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { SliderTitle } from '../../styles/slider';
import { ReactComponent as ArrowDown } from 'images/arrow-down.svg';
import DDSTable from './DDSTable';

const variants = {
  open: {
    height: 'auto',
    opacity: 1,
    marginTop: '0.5rem',
  },
  close: {
    height: 0,
    opacity: 0,
    marginTop: 0,
  },
};
const variantsIcon = {
  open: {
    rotate: 180,
  },
  close: {
    rotate: 0,
  },
};
const DDSDinamycStyle = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid rgb(133, 0, 158);
  border-radius: 5px;
`;
const Header = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ArrowIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    width: 12px;
    height: 12px;
  }
`;
const ContentContainer = styled(motion.div)`
  overflow: hidden;
  display: flex;
  gap: 0.5rem;
`;
const ChartSkelet = styled.div`
  background-color: #ccc;
  height: 300px;
  width: 100%;
`;
const DDSDinamyc = () => {
  const [isActive, setActive] = useState(false);
  return (
    <DDSDinamycStyle>
      <Header
        onClick={() => {
          setActive(!isActive);
        }}
      >
        <SliderTitle>
          Потребность
          <ArrowIcon
            variants={variantsIcon}
            animate={isActive ? 'open' : 'close'}
            exit={'close'}
            initial={'close'}
            transition={{ duration: 0.2 }}
          >
            <ArrowDown />
          </ArrowIcon>
        </SliderTitle>
      </Header>
      <AnimatePresence>
        {isActive && (
          <ContentContainer
            variants={variants}
            animate={isActive ? 'open' : 'close'}
            exit={'close'}
            initial={'close'}
          >
            <ChartSkelet />
            <DDSTable />
          </ContentContainer>
        )}
      </AnimatePresence>
    </DDSDinamycStyle>
  );
};

export default DDSDinamyc;
