import React, { useState } from 'react';
import { Box } from 'ui/Box';
import { ButtonLink } from 'ui/ButtonLink';
import { useAsyncValue } from 'react-router-dom';
import { SlideBlockStyle } from '../ObjectsStyle';
import { copyObjects, sendPhotoToTg } from '../../../api/objectAPI';
import DialogWindow from 'components/Main/DialogWindow';
import SlideDialogCopy from './SlideDialogCopy';
import SlideDialogOffer from './SlideDialogOffer';

const SlideObjectButtons = () => {
  const object = useAsyncValue();
  const [open, setOpen] = useState(false);
  const [openOffer, setOpenOffer] = useState(false);
  const [disPhoto, setDisPhoto] = useState(false);
  const [disCopy, setDisCopy] = useState(false);
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
  const toggleOffer = () => {
    setOpenOffer(!openOffer);
  };
  return (
    <SlideBlockStyle jc='flex-start' $wrap>
      <ButtonLink
        size={12}
        color='rgb(133, 0, 158)'
        onClick={getPhoto}
        disabled={disPhoto}
      >
        Получить фото
      </ButtonLink>
      <ButtonLink
        size={12}
        color='rgb(133, 0, 158)'
        onClick={toggleDialog}
        disabled={disCopy}
      >
        Копировать объект
      </ButtonLink>
      <ButtonLink size={12} color='rgb(133, 0, 158)' onClick={toggleOffer}>
        Для соц сетей
      </ButtonLink>
      <DialogWindow open={open} onClose={toggleDialog}>
        <SlideDialogCopy onClose={toggleDialog} copyObj={copyObj} />
      </DialogWindow>
      <DialogWindow open={openOffer} onClose={toggleOffer}>
        <SlideDialogOffer onClose={toggleOffer} />
      </DialogWindow>
    </SlideBlockStyle>
  );
};

export default SlideObjectButtons;
