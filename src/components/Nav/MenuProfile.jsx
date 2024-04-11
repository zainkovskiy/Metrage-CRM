import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import userUrl from 'images/user.svg';
import editUrl, { ReactComponent as Edit } from 'images/edit.svg';
import logoutUrl, { ReactComponent as Logout } from 'images/logout.svg';
import telegramUrl, { ReactComponent as Telegram } from 'images/telegram.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logOutAPI } from 'store/userSlice';
import { Link } from 'react-router-dom';

const MenuProfileStyle = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid #84019e;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
`;
const ProfileMenuButtonStyle = styled.div`
  border-radius: 5px;
  border: 1px solid #84019e;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`;
const IconProfileMenuStyle = styled.img`
  width: ${({ w }) => (w ? w + 'px' : '20px')};
  height: ${({ h }) => (h ? h + 'px' : '20px')};
`;
const IconProfileMenuUser = styled(IconProfileMenuStyle)`
  border-radius: 20px;
  background-color: #e2e2e2;
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
`;
const MenuProfile = ({ id, toggleDialog }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handlerLogOut = () => {
    dispatch(logOutAPI());
  };
  const clickReview = () => {
    window.open(`http://crm.metragegroup.com/reviews/?userId=${user.UID}`);
    // navigator.clipboard.writeText(
    //   `http://crm.metragegroup.com/reviews/?userId=${user.UID}`
    // );
  };
  const clickOffer = () => {
    window.open(`https://crm.metragegroup.com/offer`);
  };
  return (
    <>
      <MenuProfileStyle id={id}>
        <LinkStyle to={`/users/${user.UID}`}>
          <ProfileMenuButtonStyle>
            <IconProfileMenuUser
              w={30}
              h={30}
              src={user.avatar || userUrl}
              alt='user'
            />
            <div>
              <TextSpanStyle color='#85009e' height={14}>
                {user?.lastName || 'Фамилия'} {user?.firstName || 'Имя'}
              </TextSpanStyle>
            </div>
          </ProfileMenuButtonStyle>
        </LinkStyle>
        <ProfileMenuButtonStyle onClick={toggleDialog}>
          <IconProfileMenuStyle w={30} h={30} src={telegramUrl} alt='edit' />
          <div>
            <TextSpanStyle height={14}>Telegram</TextSpanStyle>
            <TextSpanStyle size={10}>
              {user?.telegramChatId ? 'Подключен' : 'Подключить'}
            </TextSpanStyle>
          </div>
        </ProfileMenuButtonStyle>
        <ProfileMenuButtonStyle onClick={clickReview}>
          <TextSpanStyle>Ссылка на отзывы</TextSpanStyle>
        </ProfileMenuButtonStyle>
        <ProfileMenuButtonStyle onClick={clickOffer}>
          <TextSpanStyle>Статусы в соц.сетях</TextSpanStyle>
        </ProfileMenuButtonStyle>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {/* <ProfileMenuButtonStyle>
            <IconProfileMenuStyle src={editUrl} alt="edit" />
            <TextSpanStyle>
              Редактировать
            </TextSpanStyle>
          </ProfileMenuButtonStyle> */}
          <ProfileMenuButtonStyle onClick={handlerLogOut}>
            <IconProfileMenuStyle src={logoutUrl} alt='logout' />
            <TextSpanStyle>Выйти</TextSpanStyle>
          </ProfileMenuButtonStyle>
        </div>
      </MenuProfileStyle>
    </>
  );
};

export default MenuProfile;
