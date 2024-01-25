import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UploderFiles from '../../Main/UploderFiles';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { useAsyncValue } from 'react-router-dom';
import { setNewLogo } from '../../../api/builderAPI';

const EditLogo = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
  box-sizing: border-box;
`;

const DialogEditLogo = ({ onClose }) => {
  const builder = useAsyncValue();
  const userId = useSelector((state) => state.user.UID);
  const raw = { entityId: '', entityType: 'developer', author: userId };
  const [url, setUrl] = useState(null);
  const uploadFiles = (file) => {
    file && setUrl(file?.URL);
  };
  const saveLogo = () => {
    setNewLogo({
      UID: builder.UID,
      logo: url,
    });
    builder.logo = url;
    onClose();
  };
  return (
    <EditLogo onClick={(e) => e.stopPropagation()}>
      <SliderTitle>Редактировать лого</SliderTitle>
      <TextSpanStyle color={url ? 'green' : '#000'} size={10}>
        {url ? 'Лого успешно загружен' : 'Загрузите лого'}
      </TextSpanStyle>
      <UploderFiles
        raw={raw}
        fullWidth
        callback={uploadFiles}
        height='200px'
        news
        disabled={Boolean(url)}
      />
      <Box jc='flex-start'>
        <ButtonUI variant='outline' size='small' onClick={onClose}>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' onClick={saveLogo}>
          Сохранить
        </ButtonUI>
      </Box>
    </EditLogo>
  );
};

export default DialogEditLogo;
