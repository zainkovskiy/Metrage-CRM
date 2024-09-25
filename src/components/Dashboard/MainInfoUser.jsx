import React, { useState } from 'react';
import styled from 'styled-components';
import { useGetAvatar } from 'hooks/MakeAvatar';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { ButtonLink } from '../../ui/ButtonLink/ButtonLink';
import DialogWindow from 'components/Main/DialogWindow';
import MainSelectList from './MainSelectList';
import { useDispatch, useSelector } from 'react-redux';
import { changeDashboardMode, changeSource } from '../../store/dashboardSlice';
import warningUrl from 'images/warning.svg';
import alertUrl from 'images/alert.svg';
import { Link, useNavigate } from 'react-router-dom';
import { toggleShowChat } from '../../store/chatSlice';
import { AnimatePresence, motion } from 'framer-motion';

import crownUrl from 'images/crown.svg';
import crownFamaleUrl from 'images/crown_famale.svg';

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50px;
  object-fit: cover;
  object-position: top;
`;
const AvatarContainer = styled.div`
  display: flex;
  position: relative;
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
  ${({ $isButton }) => $isButton && `cursor: pointer`};
  & > span {
    transition: color 0.3s;
  }
  &:hover > span {
    ${({ $isButton, theme }) => $isButton && `color: ${theme.color.primary}`};
  }
  &:active > span {
    ${({ $isButton }) => $isButton && `color: #727272`};
  }
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const ChartMiniLabel = styled(TextSpanStyle)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(100%, -35%);
`;
const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const ButtonList = styled(motion.div)`
  z-index: 99;
  position: absolute;
  background-color: rgb(245, 245, 245);
  top: 15px;
  left: 1.3rem;
  transform: translate(calc(100% + 0.5rem), 0);
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid rgb(204, 204, 204);
  width: max-content;
`;
const ButtonListItem = styled(TextSpanStyle)`
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;
const CrownIcon = styled.img`
  position: absolute;
  top: -1.5rem;
  left: -0.5rem;
  transform: rotate(331deg);
  width: 35px;
  height: 35px;
`;

const MainInfoUser = ({ user, view, rights, notify, rank }) => {
  const dashboardMode = useSelector((state) => state.dashboard.data?.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSelect, setOpenSelect] = useState(null);
  const [open, setOpen] = useState(false);
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
  const handleClickError = (error) => {
    switch (error.source) {
      case 'chat':
        dispatch(toggleShowChat());
        break;
      case 'objects':
        navigate('/objects', { state: error.filter });
        break;
      case 'quize':
        location = 'https://crm.metragegroup.com/quize';
        break;
      default:
        break;
    }
  };
  const openTypeMenu = () => {
    setOpen(!open);
  };
  const handleClickTypeMenu = (e) => {
    const id = e.target.id;
    dispatch(changeDashboardMode(id));
    setOpen(false);
  };
  const toReporting = () => {
    window.open('https://crm.metragegroup.com/reporting/');
  };
  return (
    <MainInfoUserStyle>
      <ButtonContainer>
        <ButtonLink size={12} color='#727272' onClick={openTypeMenu}>
          {dashboardMode === 'default' ? 'По умолчанию' : 'Реклама'}
        </ButtonLink>
        <AnimatePresence>
          {open && (
            <ButtonList
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <ButtonListItem
                size='12'
                color='#727272'
                id='default'
                onClick={handleClickTypeMenu}
              >
                По умолчанию
              </ButtonListItem>
              <ButtonListItem
                size='12'
                color='#727272'
                id='adv'
                onClick={handleClickTypeMenu}
              >
                Реклама
              </ButtonListItem>
            </ButtonList>
          )}
        </AnimatePresence>
      </ButtonContainer>
      <Box jc='space-between'>
        <AvatarContainer>
          <Avatar src={useGetAvatar(user)} />
          {user?.hasCrown && (
            <CrownIcon src={user?.sex === 'male' ? crownUrl : crownFamaleUrl} />
          )}
        </AvatarContainer>
        <LinkStyle to={`/users/${user.UID}`}>
          <Box column ai='flex-start' gap='0'>
            <TextSpanStyle size='10'>{user?.position || ''}</TextSpanStyle>
            <TextSpanStyle size={12}>
              {user?.lastName || ''} {user?.firstName || ''}
            </TextSpanStyle>
            <TextSpanStyle size={12}>{user?.secondName || ''}</TextSpanStyle>
          </Box>
        </LinkStyle>
        {rank?.visible && (
          <Box column gap='0' sp={{ alignSelf: 'flex-start' }}>
            <TextSpanStyle size={12} bold>
              Рейтинг
            </TextSpanStyle>
            <div style={{ position: 'relative' }}>
              <TextSpanStyle size={16}>{rank?.position || 0}</TextSpanStyle>
              {rank?.directionStr && (
                <ChartMiniLabel size={12} color={rank?.color}>
                  {rank?.directionStr || 0}
                </ChartMiniLabel>
              )}
            </div>
          </Box>
        )}
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
      {rights?.officeViewAll && (
        <ButtonLink size={12} bold color='#727272' onClick={toReporting}>
          Отчеты
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
            <ErrorTitle
              key={`error${idx}`}
              onClick={() => handleClickError(error)}
              $isButton={error?.isButton}
            >
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
            <ErrorTitle
              key={`warning${idx}`}
              onClick={() => handleClickError(warning)}
              $isButton={warning?.isButton}
            >
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
