import React, { useState } from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { ReactComponent as ArrowDown } from 'images/arrow-down.svg';
import { useAsyncValue } from 'react-router-dom';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';
import DialogWindow from 'components/Main/DialogWindow';
import DialogEditText from './DialogEditText';
import { TextSpanStyle } from 'styles/styles';

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
  const [isActive, setIsActive] = useState(residential?.description ? [1] : []);
  const [open, setOpen] = useState();

  const editWindow = (e) => {
    e.stopPropagation();
    const id = e.target.id;
    setOpen(id);
  };

  const closeWindow = () => {
    setOpen(null);
  };
  const onChangeIndex = (index) => {
    setIsActive((currentActiveIndex) => {
      if (currentActiveIndex.includes(index)) {
        return currentActiveIndex.filter((curIndex) => curIndex !== index);
      }
      return currentActiveIndex.concat(index);
    });
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
              <TextSpanStyle size={12}>
                {residential?.description || ''}
              </TextSpanStyle>
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
              <TextSpanStyle size={12}>
                {residential?.overestimation || ''}
              </TextSpanStyle>
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
              <TextSpanStyle size={12}>
                {residential?.repair || ''}
              </TextSpanStyle>
            </motion.div>
          )}
        </AnimatePresence>
      </Accordion>
      <DialogWindow onClose={closeWindow} open={Boolean(open)}>
        <DialogEditText onClose={closeWindow} source={open} />
      </DialogWindow>
    </ResidentialFeature>
  );
};

export default SlideResidentialFeature;
