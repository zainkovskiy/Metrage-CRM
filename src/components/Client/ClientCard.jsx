import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import userUrl, { ReactComponent as User } from 'images/user.svg';

const ClientCardStyle = styled(motion.div)`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  border: 1px solid #d9d9d9;
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
const ClientContent = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 5px 5px 0 0;
`;
const ClientFooter = styled.div`
  background-color: #d9d9d9;
  padding: 0.6rem;
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;
const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50px;
  background: #d9d9d9;
  background-image: url(${userUrl});
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: 0px 5px;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.5;
`;
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
const ClientCard = ({ client }) => {
  return (
    <LinkStyle to={`${client.UID}`}>
      <ClientCardStyle variants={variants} initial='hidden' animate='visible'>
        <ClientContent>
          <Avatar />
          <TextSpanStyle size={12}>{client?.title || ''}</TextSpanStyle>
        </ClientContent>
        <ClientFooter>
          <TextSpanStyle size={10}>
            {client?.responsible?.title || ''}
          </TextSpanStyle>
          <TextSpanStyle size={10}>
            Создан: {useDateFormat(client?.created, 'DD.MM.YY')}
          </TextSpanStyle>
        </ClientFooter>
      </ClientCardStyle>
    </LinkStyle>
  );
};

export default ClientCard;
