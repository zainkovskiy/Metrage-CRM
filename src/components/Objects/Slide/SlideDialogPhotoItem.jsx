import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  removePhoto,
  setWeb,
  setType,
  getEditPhoto,
} from '../../../store/photoSlice';
import { Box } from 'ui/Box';
import { SelectUI, SelectItemUI } from 'ui/SelectUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Edit } from 'images/edit.svg';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import { ReactComponent as NoImage } from 'images/no-image.svg';
import { useAsyncValue } from 'react-router-dom';

const SliderPhotoSContainer = styled(motion.div)`
  position: relative;
  transition: opacity 0.3s;
  cursor: grab;
  display: flex;
  flex-direction: column;
`;
const SliderPhotoItem = styled.img`
  width: 100%;
  height: 250px;
  object-fit: contain;
  background-color: #929292;
  border-radius: 5px 5px 0 0;
`;
const RemoveIcon = styled(Close)`
  fill: red;
  width: 16px;
  height: 16px;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 40px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f9ebeb9c;
  }
  &:active {
    background-color: transparent;
  }
`;
const SliderPhotoItemFooter = styled.div`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0 0 5px 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SlideDialogPhotoItem = ({
  photo,
  setDragPhotoStart,
  setDragPhotoEnd,
}) => {
  const dispatch = useDispatch();
  const object = useAsyncValue();

  const deletePhoto = () => {
    dispatch(removePhoto(photo));
  };
  const setWebPhoto = () => {
    dispatch(setWeb(photo));
  };
  const setNewType = (value) => {
    dispatch(
      setType({
        photo: photo,
        type: value,
      })
    );
  };
  const setTargetEditPhoto = () => {
    dispatch(
      getEditPhoto({
        UID: photo.UID,
        type: object.typeEstate,
      })
    );
  };
  const dragStartHandler = () => {
    //событие взятие карточки
    setDragPhotoStart(photo);
  };
  const dragEndHandler = (event) => {
    //отпустили перемещение
    event.target.style.opacity = 1;
  };
  const dragOverHandler = (event) => {
    //местоположение над другой карточки
    event.preventDefault();
    event.target.style.opacity = 0.5;
  };
  const dropHandler = (event) => {
    //отпустили карточку
    setDragPhotoEnd(photo);
    event.target.style.opacity = 1;
  };
  if (photo?.allow === false) {
    return <PhotoNotAllow />;
  }
  return (
    <SliderPhotoSContainer
      draggable={true}
      onDragStart={dragStartHandler}
      onDragLeave={dragEndHandler}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      <SliderPhotoItem src={photo.URL} />
      <RemoveIcon onClick={deletePhoto} />
      <SliderPhotoItemFooter>
        <Box>
          <CheckboxUI
            fullWidth
            label='Выгружать'
            id={`isWeb${photo.UID}`}
            checked={photo?.isWeb}
            onChange={setWebPhoto}
          />
          {photo?.UID && (
            <IconButton onClick={setTargetEditPhoto}>
              <Edit />
            </IconButton>
          )}
        </Box>
        <SelectUI
          onChange={setNewType}
          select={photo?.type || ''}
          placeholder='Тип фото'
          fullWidth
          small
        >
          <SelectItemUI value='object'>Объект</SelectItemUI>
          <SelectItemUI value='plan'>Планировка</SelectItemUI>
          <SelectItemUI value='room'>Комната</SelectItemUI>
          <SelectItemUI value='kitchen'>Кухня</SelectItemUI>
          <SelectItemUI value='front'>Фасад</SelectItemUI>
          <SelectItemUI value='yard'>Двор</SelectItemUI>
        </SelectUI>
      </SliderPhotoItemFooter>
    </SliderPhotoSContainer>
  );
};

const PhotoNotAllowContext = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  border-radius: 5px 5px 0 0;
  background-color: #ccc;
`;
const NoImageStyle = styled(NoImage)`
  width: 60px;
  height: 60px;
  fill: ${({ theme }) => theme.color.primary};
`;
const PhotoNotAllow = () => {
  return (
    <SliderPhotoSContainer>
      {/* <RemoveIcon onClick={() => removePhoto(photo.UID)} /> */}
      <PhotoNotAllowContext>
        <NoImageStyle />
      </PhotoNotAllowContext>
      <SliderPhotoItemFooter>
        <TextSpanStyle>Формат не поддерживается</TextSpanStyle>
      </SliderPhotoItemFooter>
    </SliderPhotoSContainer>
  );
};
export default SlideDialogPhotoItem;
