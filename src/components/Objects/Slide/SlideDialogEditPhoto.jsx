import React from 'react';
import styled from 'styled-components';
import ButtonBack from '../../../ui/ButtonBack/ButtonBack';
import { ButtonUI } from '../../../ui/ButtonUI/ButtonUI';
import { TooltipUI } from '../../../ui/TooltipUI/TooltipUI';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeBrightnessPhoto,
  clearTargetPhoto,
  getPhotoList,
  removeStampPhoto,
  saveChangeTargetPhoto,
  turnPhoto,
} from '../../../store/photoSlice';
import { IconButtonSimple } from '../../../ui/IconButtonSimple/IconButtonSimple';
import { useAsyncValue } from 'react-router-dom';

const SlideDialogEditPhotoStyle = styled.div`
  width: 80vw;
  height: 80vh;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;
const EditPhotoNav = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;
const EditPhotoContainer = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  flex-grow: 1;
`;
const EditPhotoStyle = styled.div`
  height: 100%;
  background-image: url(${({ url }) => url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;
const EditPhotoFooter = styled.div`
  padding: 0.5rem;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  gap: 1rem;
`;
const SlideDialogEditPhoto = () => {
  const editPhoto = useSelector((state) => state.photo.targetPhoto);
  const dispatch = useDispatch();

  const toBack = () => {
    dispatch(clearTargetPhoto());
  };
  const saveChange = () => {
    dispatch(saveChangeTargetPhoto(editPhoto.UID));
  };
  const turnTargetPhoto = (degrees) => {
    dispatch(
      turnPhoto({
        UID: editPhoto.UID,
        degrees: degrees,
      })
    );
  };
  const changeBrightnessTargetPhoto = () => {
    dispatch(
      changeBrightnessPhoto({
        UID: editPhoto.UID,
      })
    );
  };
  const removeStampTargetPhoto = () => {
    dispatch(
      removeStampPhoto({
        UID: editPhoto.UID,
      })
    );
  };
  return (
    <SlideDialogEditPhotoStyle onClick={(e) => e.stopPropagation()}>
      <EditPhotoNav>
        <ButtonBack color='#85009e' onClick={toBack} />
        <ButtonUI size='small' onClick={saveChange}>
          Сохранить
        </ButtonUI>
      </EditPhotoNav>
      <EditPhotoContainer>
        <EditPhotoStyle url={editPhoto.URL} />
      </EditPhotoContainer>
      <EditPhotoFooter>
        <TooltipUI title='Обрезать'>
          <IconButtonSimple icon='cut' />
        </TooltipUI>
        <TooltipUI title='Повернуть влево'>
          <IconButtonSimple
            icon='back'
            onClick={() => {
              turnTargetPhoto(-90);
            }}
          />
        </TooltipUI>
        <TooltipUI title='Повернуть вправо'>
          <IconButtonSimple
            icon='repeat'
            onClick={() => {
              turnTargetPhoto(90);
            }}
          />
        </TooltipUI>
        <TooltipUI title='Удалить лого'>
          <IconButtonSimple icon='stamp' onClick={removeStampTargetPhoto} />
        </TooltipUI>
        <TooltipUI title='Осветлить'>
          <IconButtonSimple
            icon='brush'
            onClick={changeBrightnessTargetPhoto}
          />
        </TooltipUI>
      </EditPhotoFooter>
    </SlideDialogEditPhotoStyle>
  );
};

export default SlideDialogEditPhoto;
