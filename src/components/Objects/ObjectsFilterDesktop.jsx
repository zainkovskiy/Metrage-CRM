import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';
import { BadgeUI } from 'ui/BadgeUI';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import ObjectsFilterForm from './ObjectsFilterForm';
import SlideWindow from 'components/Main/SlideWindow';
import { useWindowSize } from 'hooks/windowSize';
import { IconButtonSimple } from '../../ui/IconButtonSimple/IconButtonSimple';
import { HiddenBoxUI } from 'ui/HiddenBoxUI';
import { useSelector } from 'react-redux';
import ObjectBasket from './ObjectBasket';
const ObjectsFilterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-wrap: wrap;
`;
const ObjectsFilterDesktop = () => {
  const [open, setOpen] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const basket = useSelector((state) => state.objects.basket);
  const windowSize = useWindowSize();
  const handlerHiddenBox = () => {
    setOpenBox(!openBox);
  };
  const onCloseHiddenBox = () => {
    setOpenBox(null);
  };
  const getWidth = () => {
    if (windowSize <= 768) {
      return '100%';
    }
    return '30%';
  };
  const toggleFilter = () => {
    setOpen(!open);
  };
  return (
    <ObjectsFilterStyle>
      <Box>
        <ButtonUI size='small' onClick={toggleFilter}>
          Фильтр
        </ButtonUI>
        {windowSize > 768 && (
          <TextSpanStyle>Обязательно проверьте фильтр</TextSpanStyle>
        )}
      </Box>
      <Box>
        <motion.div style={{ position: 'relative' }}>
          <BadgeUI badgeContent={Number(basket.length)}>
            <IconButtonSimple
              icon='basket'
              onClick={handlerHiddenBox}
              id='basket'
            />
            <AnimatePresence>
              {openBox && (
                <HiddenBoxUI
                  id='basket'
                  onClose={onCloseHiddenBox}
                  open={openBox}
                >
                  <ObjectBasket />
                </HiddenBoxUI>
              )}
            </AnimatePresence>
          </BadgeUI>
        </motion.div>
        <Link to='new'>
          <ButtonUI size='small' variant='outline'>
            Создать
          </ButtonUI>
        </Link>
      </Box>
      <SlideWindow open={open} onClose={toggleFilter} width={getWidth()}>
        <ObjectsFilterForm onClose={toggleFilter} />
      </SlideWindow>
    </ObjectsFilterStyle>
  );
};

export default ObjectsFilterDesktop;
