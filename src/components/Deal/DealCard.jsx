import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import doneUrl, { ReactComponent as Done } from 'images/done2.svg';
import { Box } from 'ui/Box';
import { statusVarinants } from './DealStatus';
import { useNumberTriad } from '../../hooks/StringHook';

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;
const DealCardStyle = styled(motion.div)`
  border-radius: 40px 0 40px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  height: 100%;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.03);
      box-shadow: ${({ $color }) =>
        `7px 8px 14px -6px ${$color || rgba(0, 0, 0, 0.75)};`};
    }
  }
  @media (hover: none) {
    &:active {
      transform: scale(1.03);
      box-shadow: ${({ $color }) =>
        `7px 8px 14px -6px ${$color || rgba(0, 0, 0, 0.75)};`};
    }
  }
`;
const DealHeader = styled.div`
  border-radius: 40px 0 0 0;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${({ $color }) => $color};
  width: 100%;
  box-sizing: border-box;
`;
const DealContent = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-grow: 1;
  background-color: #f5f5f5;
`;
const DealFooter = styled.div`
  background-color: #f5f5f5;
  padding: 0.6rem;
  border-radius: 0 0 40px 0;
`;
const DoneIcon = styled(Done)`
  width: 12px;
  height: 12px;
  fill: green;
  right: 0.5rem;
  top: 0.5rem;
`;
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const DealCard = ({ deal }) => {
  const getHeaderColor = () => {
    switch (deal?.dealStatus) {
      case 'loss':
        return '#e94f4f';
      case 'new':
        return '#646262';
      case 'finally':
        return '#84019e';
      default:
        return '#2ba400';
    }
  };
  return (
    <LinkStyle to={`${deal?.UID}`}>
      <DealCardStyle
        variants={variants}
        initial='hidden'
        animate='visible'
        $color={getHeaderColor()}
      >
        <DealHeader $color={getHeaderColor()}>
          <TextSpanStyle color='#fff' size={12} bold>
            Сделка №{deal?.UID}
          </TextSpanStyle>
          <TextSpanStyle color='#fff' size={12}>
            {deal?.dealTitle || ''}
          </TextSpanStyle>
        </DealHeader>
        <DealContent>
          <TextSpanStyle size={12} align='end' bold>
            Дата сделки (план): {useDateFormat(deal?.plannedDate)}
          </TextSpanStyle>
          <TextSpanStyle size={12} align='end' bold>
            Статус: {statusVarinants[deal?.dealStatus]}
          </TextSpanStyle>
          <TextSpanStyle size={10}>
            Тип сделки:{' '}
            {deal?.dealType === 'simple' ? 'обычная' : 'от застройщика'}
          </TextSpanStyle>
          <TextSpanStyle size={10}>
            Тип недвижимости:{' '}
            {deal?.realtyType === 'live' ? 'жилая' : 'коммерческая'}
          </TextSpanStyle>
          <Box jc='flex-start'>
            <TextSpanStyle size={10}>
              Сумма коммисии: {useNumberTriad(deal?.agencyComission || 0)} руб.
            </TextSpanStyle>
            {deal?.agentsCalculated && <DoneIcon title='btb' />}
          </Box>
          <TextSpanStyle size={10}>
            Юрист: {deal?.lawyerName || ''}
          </TextSpanStyle>
        </DealContent>
        <DealFooter>
          <TextSpanStyle size={10}>{deal?.realtor || ''}</TextSpanStyle>
        </DealFooter>
      </DealCardStyle>
    </LinkStyle>
  );
};

export default DealCard;
