import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SliderTitle } from '../../styles/slider';
import { ReactComponent as ArrowDown } from 'images/arrow-down.svg';
import { variants, variantsIcon } from './variants';
import * as S from './style';

const Accordeon = ({ title, children }) => {
  const [isActive, setActive] = useState(false);
  return (
    <S.Accordeon>
      <S.AccordeonHeader
        onClick={() => {
          setActive(!isActive);
        }}
      >
        <SliderTitle color='#000' size={14}>
          {title}
          <S.ArrowIcon
            variants={variantsIcon}
            animate={isActive ? 'open' : 'close'}
            exit={'close'}
            initial={'close'}
            transition={{ duration: 0.2 }}
          >
            <ArrowDown />
          </S.ArrowIcon>
        </SliderTitle>
      </S.AccordeonHeader>
      <AnimatePresence>
        {isActive && (
          <S.AccordeonContent
            variants={variants}
            animate={isActive ? 'open' : 'close'}
            exit={'close'}
            initial={'close'}
          >
            {children}
          </S.AccordeonContent>
        )}
      </AnimatePresence>
    </S.Accordeon>
  );
};

export default Accordeon;
