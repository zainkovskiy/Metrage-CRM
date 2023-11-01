import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from '../../styles/styles';
import { useGetAvatar } from 'hooks/MakeAvatar';
import { Box } from 'ui/Box';

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50px;
  object-fit: cover;
  object-position: top;
`;
const MainInfoBirthDayUserStyle = styled.div`
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
const MainInfoBirthDayUser = ({ user }) => {
  return (
    <MainInfoBirthDayUserStyle>
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
    </MainInfoBirthDayUserStyle>
  );
};

export default MainInfoBirthDayUser;
