import React, { useState } from 'react';
import styled from 'styled-components';
import { useGetAvatar } from 'hooks/MakeAvatar';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { ButtonLink } from '../../ui/ButtonLink/ButtonLink';
import DialogWindow from 'components/Main/DialogWindow';
import MainSelectList from './MainSelectList';
import { useDispatch } from 'react-redux';
import { changeSource } from '../../store/dashboardSlice';

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
  const dispatch = useDispatch();
  const [openSelect, setOpenSelect] = useState(null);
  const openSelectList = (source) => {
    setOpenSelect(source);
  };
  const closeSelectList = () => {
    setOpenSelect(null);
  };
  const selectSource = (source) => {
    dispatch(changeSource(source));
  };
  const setOneOffice = () => {
    selectSource({
      source: 'office',
      select: {
        UID: view?.UID,
      },
    });
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
      {rights?.changeViewer && (
        <ButtonLink
          size={12}
          color='#727272'
          onClick={() => {
            openSelectList('user');
          }}
        >
          {view?.type === 'user' && view?.title
            ? view?.title
            : 'Другой пользователь'}
        </ButtonLink>
      )}
      {(rights?.officeViewOne || rights?.officeViewAll) && (
        <ButtonLink
          size={12}
          color='#727272'
          onClick={() => {
            rights?.officeViewOne ? setOneOffice() : openSelectList('office');
          }}
        >
          {view?.type === 'office' ? view?.title : 'Офис'}
        </ButtonLink>
      )}
      <DialogWindow open={Boolean(openSelect)} onClose={closeSelectList}>
        <MainSelectList
          source={openSelect}
          onClose={closeSelectList}
          onChange={selectSource}
        />
      </DialogWindow>
    </MainInfoUserStyle>
  );
};

export default MainInfoUser;
