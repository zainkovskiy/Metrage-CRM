import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as Upload } from 'images/upload.svg';
import { TextSpanStyle } from 'styles/styles';
import { uploadPhoto } from 'api/objectAPI';

const UploaderStyle = styled.label`
  border: 1px dashed ${({ theme }) => theme.color.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  flex-direction: column;
  box-sizing: border-box;
  ${({$disabled}) => $disabled && 'pointer-events: none;'};
  ${({$fullWidth}) => $fullWidth && 'width: 100%;'};
`
const UploaderIcon = styled(Upload)`
  width: 24px;
  height: 24px;
  stroke: ${({ theme }) => theme.color.primary};
`
const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const UploadingIcon = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid rgb(133 0 158);
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`

const UploderPhoto = ({ UID, callback, fullWidth, label }) => {
  const [uploading, setUploading] = useState(false);
  const handleChange = (e) => {
    upload(e?.target?.files);
  }
  const dragEntertHandler = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('uploader')) {
      event.target.style.background = "#E5E5E5";
    }
  }
  const dragLeaveHandler = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('uploader')) {
      event.target.style.background = "";
    }
  }
  const dragOverHandler = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('uploader')) {
      event.target.style.background = "#E5E5E5";
    }
  }
  const dropHandler = (event) => {
    event.preventDefault();
    upload(event?.dataTransfer?.files);
  }
  const upload = (files) => {
    setUploading(true);
    uploadPhoto(files, UID).then((uploadPhoto) => {
      if(callback){
        callback(uploadPhoto)
      }
    }).finally(() => {
      setUploading(false);
    });
  }
  return (
    <UploaderStyle
      htmlFor="uploader"
      className='uploader'
      onDragEnter={dragEntertHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
      $disabled={uploading}
      $fullWidth={fullWidth}
    >
      {
        uploading ? <UploadingIcon /> : <UploaderIcon />
      }
      <input
        id="uploader"
        type="file"
        multiple={true}
        hidden
        onChange={handleChange}
      />
      <TextSpanStyle>{uploading ? 'Загрузка' : `${label || 'Загрузка файлов'}`}</TextSpanStyle>
    </UploaderStyle>
  );
};

export default UploderPhoto;