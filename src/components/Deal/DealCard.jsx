import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import { Box } from 'ui/Box';

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`
const DealCardStyle = styled(motion.div)`
  border-radius: 40px 0 40px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow .2s, transform .2s;
  height: 100%;
  @media (hover: hover){
    &:hover{
      transform: scale(1.03);
      box-shadow: 7px 8px 14px -6px rgba(0,0,0,0.75);
    }
  }
  @media (hover: none){
    &:active{
      transform: scale(1.03);
      box-shadow: 7px 8px 14px -6px rgba(0,0,0,0.75);
    }
  }
`
const DealHeader = styled.div`
  border-radius: 40px 0 0 0;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: #6ECD4C;
  width: 100%;
  box-sizing: border-box;
`
const DealContent = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-grow: 1;
  background-color: #F5F5F5;
`
const DealFooter = styled.div`
  background-color: #D9D9D9;
  padding: 0.6rem;
  border-radius: 0 0 40px 0;
`
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0
  }
}

const DealCard = ({ deal }) => {
  console.log(deal);
  return (
    <LinkStyle to={`${deal?.UID}`}>
      <DealCardStyle
        variants={variants}
        initial='hidden'
        animate='visible'
      >
        <DealHeader>
          <TextSpanStyle size={10}>Сделка №{deal?.UID}</TextSpanStyle>
          <TextSpanStyle size={12}>{deal?.street || ''} {deal?.house || ''}</TextSpanStyle>
        </DealHeader>
        <DealContent>
          <TextSpanStyle size={10}>Дата сделки (план): {useDateFormat(deal?.plannedDate)}</TextSpanStyle>
          <TextSpanStyle size={10}>Тип сделки: {deal?.dealType === 'simple' ? 'обычнвя' : 'от застройщика'}</TextSpanStyle>
          <TextSpanStyle size={10}>Тип недвижимости: {deal?.realtyType === 'live' ? 'жилая' : 'коммерческая'}</TextSpanStyle>
          <TextSpanStyle size={10}>Задаток: {deal?.Price}</TextSpanStyle>
          <TextSpanStyle size={10}>Задаток подтвержден: {deal?.depositAccepted ? 'да' : 'нет'}</TextSpanStyle>
          <TextSpanStyle size={10}>Оставить в рекламе: {deal?.advertising ? 'да' : 'нет'}</TextSpanStyle>
          <TextSpanStyle size={10}>Реклама в "Домклик": {deal?.hasDomclick ? 'да' : 'нет '}</TextSpanStyle>
        </DealContent>
        <DealFooter>
        <TextSpanStyle size={10}> Статус: {deal?.dealStatus}</TextSpanStyle>
        </DealFooter>
      </DealCardStyle>
    </LinkStyle>
  );
};

export default DealCard;