import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { useNumberTriad } from 'hooks/StringHook';
import { useDateFormat } from 'hooks/DateFormat';
import { Box } from 'ui/Box';

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;
const CardsItem = styled(motion.div)`
  border-radius: 40px 0 40px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  height: 100%;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.03);
      /* box-shadow: 7px 8px 14px -6px rgba(0, 0, 0, 0.75); */
    }
  }
  @media (hover: none) {
    &:active {
      transform: scale(1.03);
      /* box-shadow: 7px 8px 14px -6px rgba(0, 0, 0, 0.75); */
    }
  }
`;
const CardsItemHeader = styled.div`
  border-radius: 40px 0 0 0;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${({ $back }) => ($back ? $back : 'rgb(173 127 201)')};
  width: 100%;
  box-sizing: border-box;
`;
const CardsItemContent = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-grow: 1;
  background-color: #f5f5f5;
`;
const CardsItemFooter = styled.div`
  background-color: #e2e2e2;
  padding: 0.6rem;
  border-radius: 0 0 40px 0;
  display: flex;
  justify-content: space-between;
`;
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const DDSCardsItem = ({ dds }) => {
  const getColor = (value) => {
    if (value > 0) {
      return '#47c520';
    }
    if (value < 0) {
      return '#eb5e26  ';
    }
    return;
  };
  return (
    <LinkStyle to={`${dds.UID}`}>
      <CardsItem variants={variants} initial='hidden' animate='visible'>
        <CardsItemHeader $back={dds.flag}>
          <TextSpanStyle color='#fff' size={12}>
            ID: {dds.UID}
          </TextSpanStyle>
          <TextSpanStyle color='#fff' size={12}>
            {dds.bank}
          </TextSpanStyle>
        </CardsItemHeader>
        <CardsItemContent>
          <Box jc='flex-end' gap='0.2rem'>
            <TextSpanStyle size={12}>Дата:</TextSpanStyle>
            <TextSpanStyle size={12} bold>
              {useDateFormat(dds.reportDate)}
            </TextSpanStyle>
          </Box>
          <Box jc='flex-start' gap='0.2rem' ai='flex-start'>
            <TextSpanStyle size={12}>Категория:</TextSpanStyle>
            <TextSpanStyle size={12} bold>
              {dds.category}
            </TextSpanStyle>
          </Box>
          <Box jc='flex-start' gap='0.2rem' ai='flex-start'>
            <TextSpanStyle size={12}>Сделка:</TextSpanStyle>
            <TextSpanStyle size={12} bold>
              {dds.deal}
            </TextSpanStyle>
          </Box>
          <Box jc='flex-start' gap='0.2rem'>
            <TextSpanStyle size={12}>Получатель:</TextSpanStyle>
            <TextSpanStyle size={12} bold>
              {dds.resipient}
            </TextSpanStyle>
          </Box>
        </CardsItemContent>
        <CardsItemFooter>
          <Box>
            <TextSpanStyle size={12}>Сумма:</TextSpanStyle>
            <TextSpanStyle size={12} color={getColor(dds.coming)} bold>
              {useNumberTriad(dds.coming)} руб.
            </TextSpanStyle>
          </Box>
        </CardsItemFooter>
      </CardsItem>
    </LinkStyle>
  );
};

export default DDSCardsItem;
