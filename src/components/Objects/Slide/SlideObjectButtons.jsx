import React, { useState } from 'react';
import { Box } from 'ui/Box';
import { ButtonLink } from 'ui/ButtonLink';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import { SlideBlockStyle } from '../ObjectsStyle';
import { copyObjects, sendPhotoToTg } from '../../../api/objectAPI';
import DialogWindow from 'components/Main/DialogWindow';
import SlideDialogCopy from './SlideDialogCopy';

const SlideObjectButtons = ({ onCloseSlide }) => {
  const object = useAsyncValue();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [disPhoto, setDisPhoto] = useState(false);
  const [disCopy, setDisCopy] = useState(false);
  const clickEdit = () => {
    setTimeout(() => {
      navigate(`/objects/edit/${object?.typeEstate}/${object?.UID}`, {
        replace: true,
      });
    }, 300);
    onCloseSlide();
  };
  const getPhoto = () => {
    setDisPhoto(true);
    sendPhotoToTg({
      UID: object.UID,
      type: object.subTypeEstate,
    });
  };
  const copyObj = () => {
    setOpen(false);
    setDisCopy(true);
    copyObjects({
      UID: object.UID,
      type: object.subTypeEstate,
    });
  };
  const toggleDialog = () => {
    setOpen(!open);
  };
  return (
    <SlideBlockStyle>
      <Box jc='space-between' fullWidth>
        <Box jc='flex-start' fullWidth>
          {(object?.subTypeEstate === 'live' ||
            object?.subTypeEstate === 'Business') && (
            <>
              <ButtonLink
                size={12}
                color='#000'
                onClick={getPhoto}
                disabled={disPhoto}
              >
                Получить фото
              </ButtonLink>
              <ButtonLink
                size={12}
                color='#000'
                onClick={toggleDialog}
                disabled={disCopy}
              >
                Копировать объект
              </ButtonLink>
            </>
          )}
        </Box>
        <ButtonLink size={12} color='#000' onClick={clickEdit}>
          Редактировать
        </ButtonLink>
      </Box>
      <DialogWindow open={open} onClose={toggleDialog}>
        <SlideDialogCopy onClose={toggleDialog} copyObj={copyObj} />
      </DialogWindow>
    </SlideBlockStyle>
  );
};

export default SlideObjectButtons;
