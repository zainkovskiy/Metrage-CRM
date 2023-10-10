import React, { useRef } from 'react';
import styled from 'styled-components';
import ButtonBack from '../../../ui/ButtonBack/ButtonBack';
import { ButtonUI } from '../../../ui/ButtonUI/ButtonUI';
import { TooltipUI } from '../../../ui/TooltipUI/TooltipUI';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeBrightnessPhoto,
  clearTargetPhoto,
  cropPhoto,
  getPhotoList,
  removeStampPhoto,
  saveChangeTargetPhoto,
  turnPhoto,
} from '../../../store/photoSlice';
import { IconButtonSimple } from '../../../ui/IconButtonSimple/IconButtonSimple';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const SlideDialogEditPhotoStyle = styled.div`
  width: 80vw;
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
const EditButtonGrouo = styled.div`
  display: frex;
  gap: 1rem;
`;
const EditPhotoContainer = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const EditPhotoStyle = styled.img`
  // height: 100%;
  // background-image: url(${({ url }) => url});
  // background-position: center;
  // background-repeat: no-repeat;
  // background-size: contain;
  width: 100%;
  height: 60vh;
  object-fit: contain;
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
  const photoRef = useRef(null);
  const dispatch = useDispatch();
  const [crop, setCrop] = React.useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

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
  const cropTargetPhoto = () => {
    console.log(photoRef);
    if (crop.width === 0 && crop.height === 0) {
      return;
    }
    dispatch(
      cropPhoto({
        UID: editPhoto.UID,
        ...crop,
        clientWidth: photoRef.current.clientWidth,
        clientHeight: photoRef.current.clientHeight,
      })
    );
  };
  return (
    <SlideDialogEditPhotoStyle onClick={(e) => e.stopPropagation()}>
      <EditPhotoNav>
        <ButtonBack color='#85009e' onClick={toBack} />
        <EditButtonGrouo>
          <TooltipUI title='Обрезать'>
            <IconButtonSimple icon='cut' onClick={cropTargetPhoto} />
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
          <TooltipUI title='Поставить лого'>
            <IconButtonSimple icon='stamp' onClick={removeStampTargetPhoto} />
          </TooltipUI>
          <TooltipUI title='Осветлить'>
            <IconButtonSimple
              icon='brush'
              onClick={changeBrightnessTargetPhoto}
            />
          </TooltipUI>
        </EditButtonGrouo>
      </EditPhotoNav>
      <EditPhotoContainer>
        <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
          <EditPhotoStyle ref={photoRef} src={editPhoto.URL} />
        </ReactCrop>
      </EditPhotoContainer>
      <EditPhotoFooter>
        <ButtonUI size='small' onClick={saveChange}>
          Сохранить
        </ButtonUI>
      </EditPhotoFooter>
    </SlideDialogEditPhotoStyle>
  );
};

export default SlideDialogEditPhoto;
