import React, { useEffect, useRef, useState } from 'react';
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
import WindowAvatarEdit from './WindowAvatarEdit';
import OfficeFinder from '../../Main/OfficeFinder';
import { setNewUserValue } from '../../../api/usersApi';

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  object-fit: cover;
  object-position: top;
`;
const AvatarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
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
  width: 100%;
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
const CustomTextArea = styled.textarea`
  resize: none;
  width: 100%;
  border: none;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  border: none;
  outline: none;
  ${({ disabled }) =>
    disabled ? 'background-color: #fff;' : 'background-color: #eee;'};
`;
const SlideUserMain = () => {
  const user = useAsyncValue();
  const textareaRef = useRef(null);
  const { control } = useFormContext();
  const [showPass, setShowPass] = useState(false);
  const [showOffice, setShowOffice] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const isAdmin = user?.rights?.admin || false;
  const editMain = user?.rights?.editMain || false;
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);
  useEffect(() => {
    if (textareaRef.current && editAbout) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = textareaRef.current.value.length;
    }
  }, [editAbout]);
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
  const toggleAvatarEdit = () => {
    setShowAvatar(!showAvatar);
  };
  const toggleEditAbout = () => {
    setEditAbout(!editAbout);
  };
  const growTextArea = () => {
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
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
        <Box fullWidth gap='0.5rem' ai='normal' wrap>
          <UserBlock>
            <UserLine>
              <TextSpanStyle>Фамилия:</TextSpanStyle>
              <Controller
                control={control}
                name='lastName'
                render={({ field }) => (
                  <InputText
                    disabled={!editMain}
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
                    disabled={!editMain}
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
                    disabled={!editMain}
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
                    disabled={!editMain}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </UserLine>
            <UserLine>
              <TextSpanStyle>VK:</TextSpanStyle>
              <Controller
                control={control}
                name='vkURL'
                render={({ field }) => (
                  <InputText
                    disabled={!editMain}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </UserLine>
            <Box gap='0' column ai='flex-start' fullWidth>
              <UserLine>
                <TextSpanStyle>Instagram*:</TextSpanStyle>
                <Controller
                  control={control}
                  name='instagramId'
                  render={({ field }) => (
                    <InputText
                      disabled={!editMain}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
              </UserLine>
              <TextSpanStyle size={10}>
                *иностранный владелец ресурса нарушает закон РФ
              </TextSpanStyle>
            </Box>
            <UserLine>
              <TextSpanStyle nowrap>Дата рождения:</TextSpanStyle>
              {editMain ? (
                <Controller
                  control={control}
                  name='birthDate'
                  render={({ field }) => (
                    <InputText
                      type='date'
                      disabled={!editMain}
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
            <Box column gap='0' ai='flex-start'>
              <Box jc='flex-start'>
                <TextSpanStyle>О себе:</TextSpanStyle>
                {editMain && (
                  <ButtonLink
                    size={12}
                    color='#7d7d7d'
                    onClick={toggleEditAbout}
                  >
                    {editAbout ? 'сохранить' : 'редактировать'}
                  </ButtonLink>
                )}
              </Box>
              <Controller
                control={control}
                name='aboutMe'
                render={({ field }) => (
                  <CustomTextArea
                    ref={textareaRef}
                    onInput={growTextArea}
                    disabled={!editAbout}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Box>
          </UserBlock>
          <AvatarContainer style={{ position: 'relative' }}>
            {!user?.active && <InfoText size={12}>Уволен</InfoText>}
            <Avatar
              src={useGetAvatar({
                avatar: user?.avatar,
                firstName: user?.firstName,
                lastName: user?.lastName,
              })}
            />
            <ButtonLink onClick={toggleAvatarEdit} color='#7d7d7d' size={10}>
              редактировать
            </ButtonLink>
          </AvatarContainer>
        </Box>
      </Box>
      <DialogWindow open={showAvatar} onClose={toggleAvatarEdit}>
        <WindowAvatarEdit onClose={toggleAvatarEdit} />
      </DialogWindow>
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
