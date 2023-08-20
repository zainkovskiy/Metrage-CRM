import React from 'react';
import UploderPhoto from '../../Main/UploderPhoto';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';

const SlideDialogPhotoUploaderStyle = styled.div`
  margin: 0.5rem;
`
const SlideDialogPhotoUploader = ({uploadedPhotos}) => {
  const object = useAsyncValue();
  return (
    <SlideDialogPhotoUploaderStyle>
      <UploderPhoto UID={object.UID} callback={uploadedPhotos} label='Загрузка фото'/>
    </SlideDialogPhotoUploaderStyle>
  );
};

export default SlideDialogPhotoUploader;