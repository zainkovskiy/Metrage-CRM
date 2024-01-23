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
import warningUrl, { ReactComponent as Warning } from 'images/warning.svg';
import alertUrl, { ReactComponent as Alert } from 'images/alert.svg';
import { Link } from 'react-router-dom';

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
const IconError = styled.img`
  width: 14px;
  height: 14px;
`;
const ErrorTitle = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const MainInfoUser = ({ user, view, rights, notify }) => {
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
  const setAllCompany = () => {
    selectSource({
      source: 'user',
      select: {
        UID: 6,
      },
    });
  };
  return (
    <MainInfoUserStyle>
      <Box jc='flex-start'>
        <Avatar src={useGetAvatar(user)} />
        <LinkStyle to={`/users/${user.UID}`}>
          <Box column ai='flex-start' gap='0'>
            <TextSpanStyle size='10'>{user?.position || ''}</TextSpanStyle>
            <TextSpanStyle size={12}>
              {user?.lastName || ''} {user?.firstName || ''}
            </TextSpanStyle>
            <TextSpanStyle size={12}>{user?.secondName || ''}</TextSpanStyle>
          </Box>
        </LinkStyle>
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
      {rights?.companyView && (
        <ButtonLink size={12} color='#727272' onClick={setAllCompany}>
          Вся компания
        </ButtonLink>
      )}
      {notify?.errors && notify?.errors?.length > 0 && (
        <div>
          <ErrorTitle>
            <TextSpanStyle color='#ffa328' size={12}>
              Важно
            </TextSpanStyle>
            <IconError src={alertUrl} />
          </ErrorTitle>
          {notify.errors.map((error, idx) => (
            <ErrorTitle key={`error${idx}`}>
              <TextSpanStyle size={12} color='#727272'>
                {error?.title}
              </TextSpanStyle>
              <TextSpanStyle size={12} color='#727272'>
                {error?.value}
              </TextSpanStyle>
            </ErrorTitle>
          ))}
        </div>
      )}
      {notify?.warnings && notify.warnings.length > 0 && (
        <div>
          <ErrorTitle>
            <TextSpanStyle color='red' size={12}>
              Критически важно
            </TextSpanStyle>
            <IconError src={warningUrl} />
          </ErrorTitle>
          {notify.warnings.map((warning, idx) => (
            <ErrorTitle key={`warning${idx}`}>
              <TextSpanStyle size={12} color='#727272'>
                {warning?.title}
              </TextSpanStyle>
              <TextSpanStyle size={12} color='#727272'>
                {warning?.value}
              </TextSpanStyle>
            </ErrorTitle>
          ))}
        </div>
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
