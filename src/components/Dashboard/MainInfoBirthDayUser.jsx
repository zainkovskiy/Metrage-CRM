import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from '../../styles/styles';
import { useGetAvatar } from 'hooks/MakeAvatar';
import { Box } from 'ui/Box';
import { Link } from 'react-router-dom';

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50px;
  object-fit: cover;
  object-position: top;
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  transition: background 0.3s;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  &:hover {
    background: azure;
  }
`;
const MainInfoBirthDayUser = ({ user }) => {
  return (
    <LinkStyle to={`/users/${user?.UID}`}>
      <Avatar
        src={useGetAvatar({
          avatar: user?.avatar,
          firsName: user?.name,
          lastName: user?.lastName,
        })}
      />
      <Box column ai='flex-start' gap='0'>
        <TextSpanStyle size={10}>{user?.office || ''}</TextSpanStyle>
        <TextSpanStyle size={12}>
          {user?.name || ''} {user?.lastName || ''}
        </TextSpanStyle>
      </Box>
    </LinkStyle>
  );
};

export default MainInfoBirthDayUser;
