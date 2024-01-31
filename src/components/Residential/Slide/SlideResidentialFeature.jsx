import React, { useState } from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { ReactComponent as ArrowDown } from 'images/arrow-down.svg';
import { useAsyncValue } from 'react-router-dom';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';

const Accordion = styled.div`
  overflow: hidden;
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
const AccordionHeader = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ResidentialFeature = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
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
//TODO: сделать нормальный Аккордеон
//https://codesandbox.io/p/sandbox/framer-motion-accordion-yhixfe?file=%2Fsrc%2FApp.jsx%3A14%2C5-14%2C19
const SlideResidentialFeature = () => {
  const residential = useAsyncValue();
  const [isActive, setIsActive] = useState([]);
  const onChangeIndex = (index) => {
    setIsActive((currentActiveIndex) => {
      if (currentActiveIndex.includes(index)) {
        return currentActiveIndex.filter((curIndex) => curIndex !== index);
      }
      return currentActiveIndex.concat(index);
    });
  };
  const editWindow = (e) => {
    e.stopPropagation();
    console.log(e.target.id);
  };
  return (
    <ResidentialFeature>
      <Accordion>
        <AccordionHeader
          onClick={() => {
            onChangeIndex(1);
          }}
        >
          <SliderTitle>
            <Box>
              Описание:
              <ButtonLink
                id='description'
                size={12}
                color='#787878'
                onClick={editWindow}
              >
                Редактировать
              </ButtonLink>
            </Box>
            <ArrowIcon
              variants={variantsIcon}
              animate={isActive.includes(1) ? 'open' : 'close'}
              initial={'close'}
              transition={{ duration: 0.2 }}
            >
              <ArrowDown />
            </ArrowIcon>
          </SliderTitle>
        </AccordionHeader>
        <AnimatePresence>
          {isActive.includes(1) && (
            <motion.div
              variants={variants}
              animate={isActive.includes(1) ? 'open' : 'close'}
              exit={'close'}
              initial={'close'}
            >
              {residential?.description || ''}
            </motion.div>
          )}
        </AnimatePresence>
      </Accordion>
      <Accordion>
        <AccordionHeader
          onClick={() => {
            onChangeIndex(2);
          }}
        >
          <SliderTitle>
            <Box>
              Завышение:
              <ButtonLink
                id='overestimation'
                size={12}
                color='#787878'
                onClick={editWindow}
              >
                Редактировать
              </ButtonLink>
            </Box>
            <ArrowIcon
              variants={variantsIcon}
              animate={isActive.includes(2) ? 'open' : 'close'}
              initial={'close'}
              transition={{ duration: 0.2 }}
            >
              <ArrowDown />
            </ArrowIcon>
          </SliderTitle>
        </AccordionHeader>
        <AnimatePresence>
          {isActive.includes(2) && (
            <motion.div
              variants={variants}
              animate={isActive.includes(2) ? 'open' : 'close'}
              exit={'close'}
              initial={'close'}
            >
              {residential?.overestimation || ''}
            </motion.div>
          )}
        </AnimatePresence>
      </Accordion>
      <Accordion>
        <AccordionHeader
          onClick={() => {
            onChangeIndex(3);
          }}
        >
          <SliderTitle>
            <Box>
              Ремонт:
              <ButtonLink
                id='repair'
                size={12}
                color='#787878'
                onClick={editWindow}
              >
                Редактировать
              </ButtonLink>
            </Box>
            <ArrowIcon
              variants={variantsIcon}
              animate={isActive.includes(3) ? 'open' : 'close'}
              initial={'close'}
              transition={{ duration: 0.2 }}
            >
              <ArrowDown />
            </ArrowIcon>
          </SliderTitle>
        </AccordionHeader>
        <AnimatePresence>
          {isActive.includes(3) && (
            <motion.div
              variants={variants}
              animate={isActive.includes(3) ? 'open' : 'close'}
              exit={'close'}
              initial={'close'}
            >
              {residential?.repair || ''}
            </motion.div>
          )}
        </AnimatePresence>
      </Accordion>
    </ResidentialFeature>
  );
};

export default SlideResidentialFeature;
