import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { ReactComponent as ArrowDown } from 'images/arrow-down.svg';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import SlideResidentialAppartment from './SlideResidentialAppartment';
const Accordion = styled.div`
  overflow: hidden;
`;
const AccordeonHeader = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #e3e3e3;
  border-radius: 5px;
  transition: background-color 0.3s;
  @media (hover: hover) {
    &:hover {
      background-color: #ccc;
    }
    &:active {
      background-color: #e3e3e3;
    }
  }
  @media (hover: none) {
    &:active {
      background-color: #ccc;
    }
  }
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
const AppartmentList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;
`;
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
const SlideResidentialAccordeon = ({
  appartment,
  isActive,
  onChangeIndex,
  idx,
}) => {
  return (
    <Accordion>
      <AccordeonHeader
        onClick={() => {
          onChangeIndex(idx);
        }}
      >
        <TextSpanStyle size={12}>{appartment.title}</TextSpanStyle>
        <TextSpanStyle size={12}>{appartment.area}</TextSpanStyle>
        <TextSpanStyle size={12}>{appartment.priceRange}</TextSpanStyle>
        <TextSpanStyle size={12} color='#85009E'>
          Предложений: {appartment?.items?.length || 0}
        </TextSpanStyle>
        <ArrowIcon
          variants={variantsIcon}
          animate={isActive ? 'open' : 'close'}
          initial={'close'}
          transition={{ duration: 0.2 }}
        >
          <ArrowDown />
        </ArrowIcon>
      </AccordeonHeader>
      <AnimatePresence>
        {isActive && (
          <AppartmentList
            variants={variants}
            animate={'open'}
            exit={'close'}
            initial={'close'}
          >
            {appartment.items.map((item, idx) => (
              <SlideResidentialAppartment flat={item} key={idx} />
            ))}
          </AppartmentList>
        )}
      </AnimatePresence>
    </Accordion>
  );
};
export default SlideResidentialAccordeon;
