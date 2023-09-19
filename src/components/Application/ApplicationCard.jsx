import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import { motion } from 'framer-motion';
import { Box } from 'ui/Box';
import logoUrl, { ReactComponent as Logo } from 'images/logo_small.svg';
import doneUrl, { ReactComponent as Done } from 'images/done2.svg';

const ApplicationStyle = styled(motion.div)`
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
const ApplicationHeader = styled.div`
  border-radius: 40px 0 0 0;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme, $color }) => $color || theme.color.secondary};
  width: 100%;
  box-sizing: border-box;
`;
const ApplicationSourceStyle = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
const ApplicationContent = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-grow: 1;
  background-color: #f5f5f5;
`;
const ApplicationEvents = styled(TextSpanStyle)`
  border-radius: 40px 0;
  background-color: antiquewhite;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 25px;
  height: 25px;
  color: red;
`;
const TextListStyle = styled.p`
  font-family: ${({ theme }) => theme.font.familyBold};
  font-size: 10px;
  display: flex;
  gap: 0.2rem;
  margin: 0;
  & > span {
    font-family: ${({ theme }) => theme.font.family};
  }
`;
const ApplicationComment = styled(TextSpanStyle)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const ApplicationFooter = styled.div`
  background-color: #d9d9d9;
  padding: 0.6rem;
  border-radius: 0 0 40px 0;
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;
const DoneIcon = styled(Done)`
  width: 24px;
  height: 24px;
  fill: green;
`;
const TextSpanEllipsis = styled(TextSpanStyle)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;
const TextHeaderContainer = styled.div`
  width: 50%;
  flex-grow: 1;
`;
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
const ApplicationCard = ({ application }) => {
  return (
    <LinkStyle to={`application/${application.UID}`}>
      <ApplicationStyle variants={variants} initial='hidden' animate='visible'>
        <ApplicationHeader $color={application?.color}>
          {application?.demand?.events !== 0 ? (
            <ApplicationEvents size={12}>
              {application?.demand?.events}
            </ApplicationEvents>
          ) : (
            <span></span>
          )}
          <TextHeaderContainer>
            <TextSpanStyle align='end' color='#fff' size={10}>
              Клиент
            </TextSpanStyle>
            <TextSpanEllipsis align='end' color='#fff' size={12}>
              {application?.client?.title}
            </TextSpanEllipsis>
          </TextHeaderContainer>
        </ApplicationHeader>
        <ApplicationContent>
          <TextSpanStyle align='end' size={10}>
            Создано: {useDateFormat(application?.created)}
          </TextSpanStyle>
          <Box jc='space-between' ai='flex-start'>
            <ApplicationSourceStyle
              src={application?.source?.picture || logoUrl}
              alt='logo'
            />
            {application?.demand?.isChecked === '1' && <DoneIcon />}
          </Box>
          <TextListStyle>
            Источник: <span>{application?.source?.name}</span>
          </TextListStyle>
          <TextListStyle>
            Статус: <span>{application?.status?.title}</span>
          </TextListStyle>
          <TextListStyle>
            Потребность: <span>{application?.demand?.title}</span>
          </TextListStyle>
          <TextListStyle>
            Тип: <span>{application?.demand?.typePlace}</span>
          </TextListStyle>
          <TextListStyle>Примечание:</TextListStyle>
          <ApplicationComment size={10}>
            {application?.demand?.comment}
          </ApplicationComment>
        </ApplicationContent>
        <ApplicationFooter>
          <TextSpanStyle size={10}>Агент:</TextSpanStyle>
          <TextSpanStyle size={12}>
            {application?.responsible?.title}
          </TextSpanStyle>
        </ApplicationFooter>
      </ApplicationStyle>
    </LinkStyle>
  );
};

export default ApplicationCard;
