import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from 'ui/Box';
import UploderFiles from '../../Main/UploderFiles';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { device } from '../../../styles/device';
import { useAsyncValue } from 'react-router-dom';
import { removeAvatar, updateAvatar } from '../../../api/usersApi';
import { ButtonLink } from '../../../ui/ButtonLink/ButtonLink';

const DialogAvatarEdit = styled.div`
  padding: 0.5rem;
  width: 40vw;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 5px;
  box-sizing: border-box;
  @media (${device.tablet}) {
    width: 90vw;
  }
`;
const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  object-fit: cover;
  object-position: top;
  background-color: #ccc;
`;
const AvatarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WindowAvatarEdit = ({ onClose }) => {
  const user = useAsyncValue();
  const userId = useSelector((state) => state.user.UID);
  const raw = { entityId: '', entityType: 'news', author: userId };
  const [newAvatar, setNewAvatar] = useState(null);
  const [curAvatar, setCurAvatar] = useState(user?.avatar || '');

  const uploadFiles = (avatar) => {
    setNewAvatar(avatar);
  };
  const saveAvatar = () => {
    console.log(newAvatar);
    if (newAvatar) {
      updateAvatar({
        UID: user.UID,
        URL: newAvatar.URL,
      }).then(() => {
        user.avatar = newAvatar.URL;
        onClose();
      });
      return;
    }
    onClose();
  };
  const getUrl = () => {
    if (newAvatar) {
      return newAvatar.URL;
    }
    return curAvatar;
  };
  const delAvatar = () => {
    removeAvatar(user.UID);
    if (newAvatar) {
      setNewAvatar(null);
    }
    setCurAvatar('');
    user.avatar = '';
  };
  return (
    <DialogAvatarEdit onClick={(e) => e.stopPropagation()}>
      <TextSpanStyle>Редактировать аватар</TextSpanStyle>
      <div style={{ height: '20vh', display: 'flex' }}>
        <AvatarContainer>
          <Avatar src={getUrl()} />
          <ButtonLink size={12} onClick={delAvatar}>
            удалить
          </ButtonLink>
        </AvatarContainer>
        <UploderFiles
          raw={raw}
          fullWidth
          callback={uploadFiles}
          height='100%'
          news
        />
      </div>
      <Box jc='flex-start'>
        <ButtonUI variant='outline' onClick={onClose} size='small'>
          Закрыть
        </ButtonUI>
        <ButtonUI size='small' onClick={saveAvatar}>
          Сохранить
        </ButtonUI>
      </Box>
    </DialogAvatarEdit>
  );
};

export default WindowAvatarEdit;
