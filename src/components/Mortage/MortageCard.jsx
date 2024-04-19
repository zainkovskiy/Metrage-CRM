import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;
const MortageCardStyle = styled(motion.div)`
  border-radius: 40px 0 40px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  height: 100%;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.03);
      box-shadow: 7px 8px 14px -6px rgba(0, 0, 0, 0.75);
    }
  }
  @media (hover: none) {
    &:active {
      transform: scale(1.03);
      box-shadow: 7px 8px 14px -6px rgba(0, 0, 0, 0.75);
    }
  }
`;
const MortageHeader = styled.div`
  border-radius: 40px 0 0 0;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${({ $back }) => ($back ? $back : '#000')};
  width: 100%;
  box-sizing: border-box;
`;
const MortageContent = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-grow: 1;
  background-color: #f5f5f5;
`;
const MortageFooter = styled.div`
  background-color: #d9d9d9;
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

const MortageCard = ({ mortage }) => {
  return (
    <LinkStyle to={`${mortage.UID}`}>
      <MortageCardStyle variants={variants} initial='hidden' animate='visible'>
        <MortageHeader $back={mortage.stageColour}>
          <TextSpanStyle color='#fff' size={12}>
            ID: {mortage.UID}
          </TextSpanStyle>
          <TextSpanStyle color='#fff' size={12}>
            {mortage.client.fullName}
          </TextSpanStyle>
        </MortageHeader>
        <MortageContent>
          <Box jc='flex-end' gap='0.2rem'>
            <TextSpanStyle size={12}>Тип объекта:</TextSpanStyle>
            <TextSpanStyle size={12} bold>
              {mortage.typeRealty}
            </TextSpanStyle>
          </Box>
          <Box column gap='0' ai='flex-start'>
            <TextSpanStyle size={10}>Риелтор:</TextSpanStyle>
            <TextSpanStyle size={12} bold>
              {mortage.realtor.fullName}
            </TextSpanStyle>
            <TextSpanStyle size={10} color='#9d9c9c'>
              {mortage.realtor.office}
            </TextSpanStyle>
          </Box>
          <Box column gap='0' ai='flex-start'>
            <TextSpanStyle size={10}>Брокер:</TextSpanStyle>
            <TextSpanStyle size={12} bold>
              {mortage.broker.fullName}
            </TextSpanStyle>
            <TextSpanStyle size={10} color='#9d9c9c'>
              {mortage.broker.office}
            </TextSpanStyle>
          </Box>
          {mortage.accreditationPaid && (
            <TextSpanStyle color='#5DDF48' size={12}>
              Аккредитация оплачена
            </TextSpanStyle>
          )}
          <Box column ai='flex-end' gap='0'>
            <TextSpanStyle size={10}>Сумма кредита:</TextSpanStyle>
            <TextSpanStyle size={12}>{mortage.creditSumm}</TextSpanStyle>
          </Box>
          <TextSpanStyle size={12}>
            От: {useDateFormat(mortage.created)}
          </TextSpanStyle>
        </MortageContent>
        <MortageFooter>
          <TextSpanStyle size={12}>{mortage.stageName}</TextSpanStyle>
        </MortageFooter>
      </MortageCardStyle>
    </LinkStyle>
  );
};

export default MortageCard;
