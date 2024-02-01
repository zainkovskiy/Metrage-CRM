import React, { useState } from 'react';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { SliderTitle } from '../../../styles/slider';
import { useAsyncValue } from 'react-router-dom';
import { device } from 'styles/device';
import { ReactComponent as Close } from 'images/close.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { removePhotoResidential } from '../../../api/residential';

const RemovePhoto = styled.div`
  width: 60vw;
  height: 60vh;
  background-color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media ${device.tablet} {
    width: calc(-1rem + 100vw);
    height: 80vh;
  }
`;
const PhotoList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.5rem;
  overflow: auto;
`;
const RemoveContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
  flex-grow: 1;
  overflow: auto;
`;
const PhotoConatiner = styled(motion.div)`
  position: relative;
  display: flex;
`;
const Photo = styled.img`
  width: 100%;
`;
const ButtonClose = styled(Close)`
  width: 18px;
  height: 18px;
  fill: red;
  cursor: pointer;
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  transition: transform 0.3s;
  background-color: #ffc9c9;
  border-radius: 40px;
  padding: 0.2rem;
  box-sizing: border-box;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
  }
  @media (hover: none) {
    &:active {
      transform: scale(0.9);
    }
  }
`;
const DialogRemovePhoto = ({ onClose }) => {
  const residential = useAsyncValue();
  const [photos, setPhotos] = useState(residential.renderer || []);
  const removeCurPhoto = (photo) => {
    setPhotos((prevPhotos) => {
      return prevPhotos.filter((curPhoto) => curPhoto.UID !== photo.UID);
    });
  };
  const savePhotoArray = () => {
    removePhotoResidential({
      photos: photos,
    }).then(() => {
      residential.renderer = photos;
      onClose();
    });
  };
  return (
    <RemovePhoto onClick={(e) => e.stopPropagation()}>
      <SliderTitle>Удалить фото</SliderTitle>
      <RemoveContent>
        <PhotoList>
          <AnimatePresence>
            {photos.map((photo) => (
              <PhotoConatiner
                key={photo.URL}
                exit={{ scale: 0 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                layout
              >
                <Photo src={photo.URL} />
                <ButtonClose
                  onClick={() => {
                    removeCurPhoto(photo);
                  }}
                />
              </PhotoConatiner>
            ))}
          </AnimatePresence>
        </PhotoList>
        <Box jc='flex-start'>
          <ButtonUI variant='outline' size='small' onClick={onClose}>
            Отменить
          </ButtonUI>
          <ButtonUI size='small' onClick={savePhotoArray}>
            Сохранить
          </ButtonUI>
        </Box>
      </RemoveContent>
    </RemovePhoto>
  );
};

export default DialogRemovePhoto;
