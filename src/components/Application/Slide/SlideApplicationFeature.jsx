import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import styled from 'styled-components';
import { ReactComponent as ArrowDown } from 'images/arrow-down.svg';
import BuySellEditForm from './BuySellEditForm';

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
const BuySellContainer = styled(motion.div)`
  overflow: hidden;
`;
const SlideApplicationFeature = () => {
  const [isActive, setActive] = useState(false);
  return (
    <SliderBlock>
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
          <BuySellContainer
            variants={variants}
            animate={isActive ? 'open' : 'close'}
            exit={'close'}
            initial={'close'}
          >
            <BuySellEditForm />
          </BuySellContainer>
        )}
      </AnimatePresence>
    </SliderBlock>
  );
};
export default SlideApplicationFeature;
