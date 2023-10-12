import React from 'react';
import styled from 'styled-components';
import { useGetAvatar } from 'hooks/MakeAvatar';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { ButtonLink } from '../../ui/ButtonLink/ButtonLink';

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50px;
  object-fit: cover;
  object-position: top;
`;

const MainInfoUserStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Line = styled.span`
  width: 100%;
  height: 1px;
  background-color: black;
`;
const MainInfoUser = ({ user, view, rights }) => {
  // console.log(view);
  // console.log(rights);
  const getButton = () => {
    if (rights?.changeViewer) {
      return (
        <ButtonLink size={12} color='#727272'>
          {view?.type === 'user' && view?.title
            ? view?.title
            : 'Другой пользователь'}
        </ButtonLink>
      );
    }
    if (rights?.officeViewOne) {
      return (
        <ButtonLink size={12} color='#727272'>
          {view?.title || ''}
        </ButtonLink>
      );
    }
    if (rights?.officeViewAll) {
      return (
        <ButtonLink size={12} color='#727272'>
          {view?.title || 'Офис'}
        </ButtonLink>
      );
    }
  };
  return (
    <MainInfoUserStyle>
      <Box jc='flex-start'>
        <Avatar src={useGetAvatar(user)} />
        <Box column ai='flex-start' gap='0'>
          <TextSpanStyle size='10'>{user?.position || ''}</TextSpanStyle>
          <TextSpanStyle size={12}>
            {user?.lastName || ''} {user?.firstName || ''}
          </TextSpanStyle>
          <TextSpanStyle size={12}>{user?.secondName || ''}</TextSpanStyle>
        </Box>
      </Box>
      <TextSpanStyle>{user?.officeName || ''}</TextSpanStyle>
      <Line />
      {getButton()}
    </MainInfoUserStyle>
  );
};

export default MainInfoUser;
