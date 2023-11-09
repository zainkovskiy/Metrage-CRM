import React, { useState } from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import InputText from '../../../ui/InputText/InputText';
import { useAsyncValue } from 'react-router-dom';
import { useGetAvatar } from 'hooks/MakeAvatar';
import { useDateFormat } from '../../../hooks/DateFormat';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { ButtonLink } from '../../../ui/ButtonLink/ButtonLink';
import DialogWindow from 'components/Main/DialogWindow';
import WindowPassword from './WindowPassword';
import OfficeFinder from '../../Main/OfficeFinder';
import { setNewUserValue } from '../../../api/usersApi';

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  object-fit: cover;
  object-position: top;
`;
const AvatarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const UserBlock = styled.div`
  flex-grow: 1;
`;
const UserLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  height: ${({ $height }) => $height && $height};
`;
const InfoText = styled(TextSpanStyle)`
  padding: 0 0.5rem;
  border-radius: 5px;
  background: #c0cfbf;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
`;

const SlideUserMain = () => {
  const user = useAsyncValue();
  const { control } = useFormContext();
  const [showPass, setShowPass] = useState(false);
  const [showOffice, setShowOffice] = useState(false);
  const isAdmin = user?.rights?.admin || false;
  const editMain = user?.rights?.editMain || false;
  const toggleShowPass = () => {
    setShowPass(!showPass);
  };
  const toggleShowOffice = () => {
    setShowOffice(!showOffice);
  };
  const setOffice = (office) => {
    user.office = office;
    setNewUserValue({
      UID: user.UID,
      office: office,
    });
  };
  return (
    <SliderBlock>
      <Box column>
        <SliderTitle ai='center'>
          Основное
          {editMain && (
            <ButtonLink color='#85009e' size={12} onClick={toggleShowPass}>
              Пароль
            </ButtonLink>
          )}
        </SliderTitle>
        <Box fullWidth gap='0.5rem' ai='normal'>
          <AvatarContainer style={{ position: 'relative' }}>
            {!user?.active}
            <InfoText size={12}>Уволен</InfoText>
            <Avatar
              src={useGetAvatar({
                avatar: user?.avatar,
                firsName: user?.firsName,
                lastName: user?.lastName,
              })}
            />
          </AvatarContainer>
          <UserBlock>
            <UserLine>
              <TextSpanStyle>Фамилия:</TextSpanStyle>
              <Controller
                control={control}
                name='lastName'
                render={({ field }) => (
                  <InputText
                    disabled={!isAdmin}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </UserLine>
            <UserLine>
              <TextSpanStyle>Имя:</TextSpanStyle>
              <Controller
                control={control}
                name='firstName'
                render={({ field }) => (
                  <InputText
                    disabled={!isAdmin}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </UserLine>
            <UserLine>
              <TextSpanStyle>Отчество:</TextSpanStyle>
              <Controller
                control={control}
                name='secondName'
                render={({ field }) => (
                  <InputText
                    disabled={!isAdmin}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </UserLine>
            <UserLine>
              <TextSpanStyle>Почта:</TextSpanStyle>
              <Controller
                control={control}
                name='email'
                render={({ field }) => (
                  <InputText
                    disabled={!isAdmin}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </UserLine>
            <UserLine>
              <TextSpanStyle nowrap>Дата рождения:</TextSpanStyle>
              {editMain ? (
                <Controller
                  control={control}
                  name='birthDate'
                  render={({ field }) => (
                    <InputText
                      type='date'
                      disabled={!isAdmin}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
              ) : (
                <TextSpanStyle>
                  {useDateFormat(user?.birthDate, 'DD MMMM')}
                </TextSpanStyle>
              )}
            </UserLine>
            <UserLine $height='27.89px'>
              <TextSpanStyle>Офис:</TextSpanStyle>
              <Box>
                <TextSpanStyle color='#898989'>
                  {user?.office?.name || ''}
                </TextSpanStyle>
                {isAdmin && (
                  <ButtonLink
                    color='#85009e'
                    size={12}
                    onClick={toggleShowOffice}
                  >
                    Сменить
                  </ButtonLink>
                )}
              </Box>
            </UserLine>
          </UserBlock>
        </Box>
      </Box>
      <DialogWindow open={showPass} onClose={toggleShowPass}>
        <WindowPassword UID={user?.UID} onClose={toggleShowPass} />
      </DialogWindow>
      <DialogWindow open={showOffice} onClose={toggleShowOffice}>
        <OfficeFinder
          onChange={setOffice}
          onClose={toggleShowOffice}
        ></OfficeFinder>
      </DialogWindow>
    </SliderBlock>
  );
};

export default SlideUserMain;
