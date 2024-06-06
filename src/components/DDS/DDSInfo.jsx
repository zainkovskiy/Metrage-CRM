import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNumberTriad } from 'hooks/StringHook';
import alertUrl from 'images/alert-triangle.svg';
import arrowGreenUrl from 'images/arrow-green.svg';
import arrowRedUrl from 'images/arrow-red.svg';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { SliderTitle } from '../../styles/slider';
import { ReactComponent as ArrowDown } from 'images/arrow-down.svg';

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
const DDSInfoStyle = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid rgb(133, 0, 158);
  border-radius: 5px;
`;
const DDSInfoContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0.5rem;
  overflow: hidden;
`;
const IconSvg = styled.img`
  height: 16px;
  object-fit: contain;
`;
const DDSInfo = () => {
  const { ddsData } = useSelector((state) => state.dds);
  const [isActive, setActive] = useState(false);
  return (
    <DDSInfoStyle>
      <Header>
        <SliderTitle
          onClick={() => {
            setActive(!isActive);
          }}
        >
          Сводка
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
          <DDSInfoContainer
            variants={variants}
            animate={isActive ? 'open' : 'close'}
            exit={'close'}
            initial={'close'}
          >
            <Box column ai='flex-start'>
              <Box jc='flex-start'>
                <IconSvg src={arrowGreenUrl} />
                <TextSpanStyle>
                  Поступления:{' '}
                  {ddsData?.coming ? useNumberTriad(ddsData?.coming) : '0'} руб.
                </TextSpanStyle>
              </Box>
              <Box jc='flex-start'>
                <IconSvg src={arrowRedUrl} />
                <TextSpanStyle>
                  Выплаты:{' '}
                  {ddsData?.expense ? useNumberTriad(ddsData?.expense) : '0'}{' '}
                  руб.
                </TextSpanStyle>
              </Box>
              <TextSpanStyle>Организация: {ddsData.legal.name}</TextSpanStyle>
            </Box>
            <Box column ai='flex-start'>
              <Box jc='flex-start'>
                <IconSvg src={alertUrl} />
                <TextSpanStyle>
                  Совокупный ДП:{' '}
                  {ddsData?.agregate ? useNumberTriad(ddsData?.agregate) : '0'}{' '}
                  руб.
                </TextSpanStyle>
              </Box>
              <TextSpanStyle>
                Остаток на конец периода:{' '}
                {ddsData?.remains ? useNumberTriad(ddsData?.remains) : '0'} руб.
              </TextSpanStyle>
              <TextSpanStyle>Банк: {ddsData?.bank?.bankName}</TextSpanStyle>
            </Box>
          </DDSInfoContainer>
        )}
      </AnimatePresence>
    </DDSInfoStyle>
  );
};

export default DDSInfo;
