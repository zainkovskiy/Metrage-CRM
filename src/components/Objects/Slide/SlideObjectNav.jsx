import React, { useState } from 'react';
import { SlideBlockStyle } from '../ObjectsStyle';
import { Box } from 'ui/Box';
import styled from 'styled-components';
import DialogWindow from 'components/Main/DialogWindow';
import SlideDialogAd from './SlideDialogAd';
import SlideDialogVideo from './SlideDialogVideo';
import SlideDialogPhoto from './SlideDialogPhoto';
import SlideAttention from './SlideAttention';
import { useAsyncValue, useNavigate } from 'react-router-dom';

const ObjectSlideButton = styled.div`
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  transition: border-bottom 0.3s, color 0.3s;
  &:hover {
    border-bottom: 1px solid #676767;
    color: #676767;
  }
  &:active {
    border-bottom: 1px solid transparent;
  }
`;
const ObjectNavDivide = styled.span`
  width: 1px;
  background-color: #ccc;
`;

const SlideObjectNav = ({ changePhoto, onCloseSlide }) => {
  const object = useAsyncValue();
  const navigate = useNavigate();
  const [ad, setAd] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [video, setVideo] = useState(false);
  //TODO: переделать или удалить SlideDialogAdSkeleton
  //TODO: сделать лоадер при запуске и сохранении
  const clickEdit = () => {
    setTimeout(() => {
      navigate(`/objects/edit/${object?.typeEstate}/${object?.UID}`, {
        replace: true,
      });
    }, 300);
    onCloseSlide();
  };
  const isShowAd = () => {
    setAd(!ad);
  };
  const isShowPhoto = () => {
    setPhoto(!photo);
  };
  const isShowVideo = () => {
    setVideo(!video);
  };
  return (
    <SlideBlockStyle $wrap jc='space-between'>
      <Box jc='flex-start' ai='normal'>
        <ObjectSlideButton onClick={isShowPhoto}>Фото</ObjectSlideButton>
        <ObjectNavDivide />
        <ObjectSlideButton onClick={isShowVideo}>Видео</ObjectSlideButton>
        <ObjectNavDivide />
        <ObjectSlideButton onClick={isShowAd}>Реклама</ObjectSlideButton>
      </Box>
      <ObjectSlideButton onClick={clickEdit}>Редактировать</ObjectSlideButton>
      <DialogWindow open={photo} onClose={isShowPhoto}>
        <SlideDialogPhoto onClose={isShowPhoto} changePhoto={changePhoto} />
      </DialogWindow>
      <DialogWindow open={video} onClose={isShowVideo}>
        <SlideDialogVideo onClose={isShowVideo} />
      </DialogWindow>
      <DialogWindow open={ad} onClose={isShowAd}>
        {object?.isFake || object.contact ? (
          <SlideDialogAd onClose={isShowAd} />
        ) : (
          <SlideAttention onClose={isShowAd} />
        )}
      </DialogWindow>
    </SlideBlockStyle>
  );
};

export default SlideObjectNav;
