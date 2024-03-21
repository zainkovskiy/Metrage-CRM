import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import { motion } from 'framer-motion';
import { Box } from 'ui/Box';
import logoUrl from 'images/logo_small.svg';
import { ReactComponent as Done } from 'images/done2.svg';
import moment from 'moment';

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
  background-color: #f5f5f5;
  padding: 0.6rem;
  border-radius: 0 0 40px 0;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
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
const NoCallImg = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
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
    <LinkStyle to={`${application.UID}`}>
      <ApplicationStyle
        variants={variants}
        initial='hidden'
        animate='visible'
        $color={application?.color}
      >
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
            Контакт:{' '}
            <TextSpanStyle
              size={10}
              color={application?.demand?.nextContactColor || '#000'}
            >
              {application?.demand?.nextContactStr}
            </TextSpanStyle>
          </TextListStyle>
          <TextListStyle>Примечание:</TextListStyle>
          <ApplicationComment size={10}>
            {application?.demand?.comment}
          </ApplicationComment>
        </ApplicationContent>
        <ApplicationFooter>
          <div>
            <TextSpanStyle size={12}>
              {application?.responsible?.title}
            </TextSpanStyle>
            <TextSpanStyle size={10}>ID: {application?.UID}</TextSpanStyle>
          </div>
          {!application.hasCall && (
            <NoCallImg
              src={
                'https://crm.metragegroup.com/uploads/contents/demands/no-phone.png'
              }
            />
          )}
        </ApplicationFooter>
      </ApplicationStyle>
    </LinkStyle>
  );
};

export default ApplicationCard;
