import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from '../../hooks/DateFormat';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useGetAvatar } from 'hooks/MakeAvatar';

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: #000;
`;
const UserCardStyle = styled(motion.div)`
  border-radius: 40px 0 40px 0;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.color.primary};
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
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
const UserCardHeader = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  padding: 0.5rem;
  & > span {
    color: #fff;
  }
`;
const UserCardContent = styled.div`
  padding: 0.5rem;
`;
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
const UserCardAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  object-position: top;
  object-fit: contain;
`;
const AvatarContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  margin-bottom: 0.5rem;
`;
const UserCard = ({ user }) => {
  return (
    <LinkStyle to={user?.UID}>
      <UserCardStyle variants={variants} initial='hidden' animate='visible'>
        <UserCardHeader>
          <TextSpanStyle size={10} align='end'>
            Создан {useDateFormat(user?.created || '')}
          </TextSpanStyle>
        </UserCardHeader>
        <UserCardContent>
          <AvatarContainer>
            <UserCardAvatar
              src={useGetAvatar({
                avatar: user?.avatar,
                firsName: user?.firsName,
                lastName: user?.lastName,
              })}
            />
            <div>
              <TextSpanStyle size={12}>
                {user?.firstName || ''} {user?.secondName || ''}
              </TextSpanStyle>
              <TextSpanStyle size={12}>{user?.lastName || ''}</TextSpanStyle>
            </div>
          </AvatarContainer>
          <TextSpanStyle size={12}>e-mail: {user?.email || ''}</TextSpanStyle>
          <TextSpanStyle size={12}>Офис: {user?.office || ''}</TextSpanStyle>
        </UserCardContent>
      </UserCardStyle>
    </LinkStyle>
  );
};

export default UserCard;