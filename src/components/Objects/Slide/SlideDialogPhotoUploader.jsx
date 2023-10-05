import React from 'react';
import UploderPhoto from '../../Main/UploderPhoto';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { uploadPhotos } from '../../../store/photoSlice';

const SlideDialogPhotoUploaderStyle = styled.div`
  margin: 0.5rem;
`;
const SlideDialogPhotoUploader = () => {
  const object = useAsyncValue();
  const dispatch = useDispatch();
  const uploadedPhotos = (photos) => {
    dispatch(uploadPhotos(photos));
  };
  return (
    <SlideDialogPhotoUploaderStyle>
      <UploderPhoto
        UID={object.UID}
        callback={uploadedPhotos}
        label='Загрузка фото'
      />
    </SlideDialogPhotoUploaderStyle>
  );
};

export default SlideDialogPhotoUploader;
