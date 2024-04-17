import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import closeUrl from 'images/close.svg';
import { TextSpanStyle } from 'styles/styles';
import { ButtonUI } from 'ui/ButtonUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
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
import { motion } from 'framer-motion';

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
const InfoBox = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem 0;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
`;
const SlideDialogPhoto = ({ onClose, changePhoto }) => {
  const object = useAsyncValue();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.photo.loading);
  const photos = useSelector((state) => state.photo.photos);
  const photosRights = useSelector((state) => state.photo.photosRights);
  const photosOrigin = useSelector((state) => state.photo.photosOrigin);
  const targetPhoto = useSelector((state) => state.photo.targetPhoto);
  const dragPhotoRef = React.useRef(null);
  const rightsRef = React.useRef(null);
  const [right, setRight] = useState({
    value: '',
    error: false,
  });
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
  useEffect(() => {
    setRight((prevState) => ({
      ...prevState,
      value: photosRights,
    }));
  }, [photosRights]);
  const setWebAll = () => {
    dispatch(setWebAllPhotos());
  };
  const saveChange = async () => {
    if (photos?.length > 0 && !Boolean(right.value)) {
      setRight((prevState) => ({
        ...prevState,
        error: true,
      }));
      rightsRef?.current && rightsRef.current.focus();
      return;
    }
    if (JSON.stringify(photos) === JSON.stringify(photosOrigin)) {
      onClose();
      return;
    }
    dispatch(
      saveChangeList({
        UID: object.UID,
        type: object.typeEstate,
        photos: photos,
        photoRights: right.value,
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
  const handleSelect = useCallback(
    (newValue) => {
      setRight({
        value: newValue,
        error: false,
      });
    },
    [right]
  );
  if (targetPhoto) {
    return <SlideDialogEditPhoto />;
  }
  return (
    <SlideDialogPhotoStyle onClick={(e) => e.stopPropagation()}>
      <SlideDialogPhotoHeaderStyle>
        <TextSpanStyle>Фото {photos.length}</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} onClick={onClose} />
      </SlideDialogPhotoHeaderStyle>
      {photos.length > 0 && (
        <InfoBox
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TextSpanStyle color='red' align='center'>
            Не допускаются к размещению фотографии, взятые с объявлений
            сторонних агентств, а так же содержащие логотипы.
          </TextSpanStyle>
          <SelectUI
            small
            onChange={handleSelect}
            select={right.value}
            error={right.error}
            inputRef={rightsRef}
            label='Укажите источник фотографий'
          >
            <SelectItemUI value='Делал(а) сам(а)'>Делал(а) сам(а)</SelectItemUI>
            <SelectItemUI value='Наш фотограф'>Наш фотограф</SelectItemUI>
            <SelectItemUI value='От собственника'>От собственника</SelectItemUI>
            <SelectItemUI value='С интернета'>С интернета</SelectItemUI>
          </SelectUI>
        </InfoBox>
      )}
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
