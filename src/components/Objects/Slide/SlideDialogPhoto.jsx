import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { getPhotoListAPI, setChangePhotoListAPI } from 'api/objectAPI';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import { TextSpanStyle } from 'styles/styles';
import { ButtonUI } from 'ui/ButtonUI';
import SlideDialogPhotoSceleton from './SlideDialogPhotoSceleton';
import SlideDialogPhotoUploader from './SlideDialogPhotoUploader';
import SlideDialogEditPhoto from './SlideDialogEditPhoto';
import SlideDialogPhotoItem from './SlideDialogPhotoItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPhotoList,
  clearPhotos,
  setWebAllPhotos,
  swapPhoto,
  saveChangeList,
} from '../../../store/photoSlice';
import { useAsyncValue } from 'react-router-dom';

const SlideDialogPhotoStyle = styled.div`
  width: 80vw;
  height: 80vh;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;
const SlideDialogPhotoHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
`;
const SlideDialogPhotoContext = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: min-content;
  gap: 0.5rem;
  flex-grow: 1;
  overflow: auto;
  padding: 0.5rem;
`;
const SlideDialogPhotoFooter = styled.div`
  position: sticky;
  bottom: 0px;
  border-top: 1px solid rgb(204, 204, 204);
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
`;
const CloseButtonStyle = styled.img`
  width: 18px;
  height: 18px;
  opacity: 0.5;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;
const ButtonWrap = styled.div`
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
`;
const SlideDialogPhoto = ({ onClose, changePhoto }) => {
  const object = useAsyncValue();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.photo.loading);
  const photos = useSelector((state) => state.photo.photos);
  const photosOrigin = useSelector((state) => state.photo.photosOrigin);
  const targetPhoto = useSelector((state) => state.photo.targetPhoto);
  const dragPhotoRef = React.useRef(null);
  useEffect(() => {
    dispatch(
      getPhotoList({
        UID: object.UID,
        type: object.typeEstate,
      })
    );
    return () => {
      dispatch(clearPhotos());
    };
  }, []);
  const setWebAll = () => {
    dispatch(setWebAllPhotos());
  };
  const saveChange = async () => {
    if (JSON.stringify(photos) === JSON.stringify(photosOrigin)) {
      onClose();
      return;
    }
    dispatch(
      saveChangeList({
        UID: object.UID,
        type: object.typeEstate,
        photos: photos,
      })
    )
      .unwrap()
      .then((answer) => {
        if (answer === 'OK') {
          changePhoto(photos);
          onClose();
        }
      });
  };
  const setDragPhotoStart = (dragStart) => {
    dragPhotoRef.current = dragStart;
  };
  const setDragPhotoEnd = (dragEnd) => {
    if (dragEnd.UID === dragPhotoRef.current.UID) {
      return;
    }
    dispatch(
      swapPhoto({
        dragStart: dragPhotoRef.current,
        dragEnd: dragEnd,
      })
    );
  };
  if (targetPhoto) {
    return <SlideDialogEditPhoto />;
  }
  return (
    <SlideDialogPhotoStyle onClick={(e) => e.stopPropagation()}>
      <SlideDialogPhotoHeaderStyle>
        <TextSpanStyle>Фото {photos.length}</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} onClick={onClose} />
      </SlideDialogPhotoHeaderStyle>
      <SlideDialogPhotoUploader />
      {photos.length > 0 && (
        <ButtonWrap>
          <ButtonUI size='small' onClick={setWebAll}>
            Выгрузить все
          </ButtonUI>
        </ButtonWrap>
      )}
      <SlideDialogPhotoContext>
        {loading ? (
          <>
            <SlideDialogPhotoSceleton />
            <SlideDialogPhotoSceleton />
            <SlideDialogPhotoSceleton />
            <SlideDialogPhotoSceleton />
          </>
        ) : (
          <>
            {photos.map((item, idx) => (
              <SlideDialogPhotoItem
                key={item?.UID || idx}
                photo={item}
                setDragPhotoStart={setDragPhotoStart}
                setDragPhotoEnd={setDragPhotoEnd}
              />
            ))}
          </>
        )}
      </SlideDialogPhotoContext>
      <SlideDialogPhotoFooter>
        <ButtonUI size='small' onClick={onClose}>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' onClick={saveChange} variant='outline'>
          Сохранить
        </ButtonUI>
      </SlideDialogPhotoFooter>
    </SlideDialogPhotoStyle>
  );
};

export default SlideDialogPhoto;
