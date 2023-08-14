import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getPhotoListAPI, setChangePhotoListAPI } from 'api/objectAPI';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import { ReactComponent as NoImage } from 'images/no-image.svg';
import { TextSpanStyle } from 'styles/styles';
import { ButtonUI } from 'ui/ButtonUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import SlideDialogPhotoSceleton from './SlideDialogPhotoSceleton';
import UploderPhoto from './UploderPhoto';

const SlideDialogPhotoStyle = styled.div`
  width: 80vw;
  height: 80vh;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`
const SlideDialogPhotoHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
`
const SlideDialogPhotoContext = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: min-content;
  gap: 0.5rem;
  flex-grow: 1;
  overflow: auto;
  padding: 0.5rem;
`
const SlideDialogPhotoFooter = styled.div`
  position: sticky;
  bottom: 0px;
  border-top: 1px solid rgb(204, 204, 204);
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;  
`
const CloseButtonStyle = styled.img`
  width: 18px;
  height: 18px;
  opacity: .5;
  cursor: pointer;
  transition: transform .3s;
  &:hover{
    transform: scale(1.1);
  }
  &:active{
    transform: scale(0.9);
  }
`
const ButtonWrap = styled.div`
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
`
const SlideDialogPhoto = ({ UID, estate, onClose, changePhoto }) => {
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [photosOrigin, setPhotosOrigin] = useState([]);
  const dragPhotoRef = React.useRef(null);
  useEffect(() => {
    getPhotoList();
  }, [])
  const getPhotoList = async () => {
    try {
      const res = await getPhotoListAPI(UID, estate);
      setPhotos(res);
      setPhotosOrigin(JSON.parse(JSON.stringify(res)));
    } catch (err) {

    } finally {
      setLoading(false);
    }
  }
  const removePhoto = (UID) => {
    setPhotos((prevState) => prevState.filter((item) => item.UID !== UID));
  }
  const setWeb = (photo) => {
    setPhotos(photos.map((item) => {
      if (item.UID === photo.UID) {
        item.isWeb = !item.isWeb;
        return item;
      }
      return item;
    }))
  }
  const setWebAll = () => {
    setPhotos(photos.map((item) => {
      item.isWeb = true;
      return item;
    }))
  }
  const saveChange = async () => {
    if (JSON.stringify(photos) === JSON.stringify(photosOrigin)) {
      onClose();
      return
    }
    setLoading(true);
    try {
      await setChangePhotoListAPI(UID, estate, photos);
    } catch (error) {

    } finally {
      setLoading(false);
      changePhoto(photos);
      onClose();
    }
  }
  const setDragPhotoStart = (dragStart) => {
    dragPhotoRef.current = dragStart;
  }
  const setDragPhotoEnd = (dragEnd) => {
    if (dragEnd.UID === dragPhotoRef.current.UID) {
      return
    }
    swapPhoto(dragEnd);
  }
  const swapPhoto = (dragEnd) => {
    let statePhotos = photos;
    statePhotos.splice(statePhotos.indexOf(dragEnd), 0, ...statePhotos.splice(statePhotos.indexOf(dragPhotoRef.current), 1));
    setPhotos(statePhotos);
    setChange(!change);
  }
  const uploadedPhotos = (newPhotos) => {
    setPhotos([...photos, ...newPhotos]);
  }
  return (
    <SlideDialogPhotoStyle onClick={(e) => e.stopPropagation()}>
      <SlideDialogPhotoHeaderStyle>
        <TextSpanStyle>Фото {photos.length}</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} onClick={onClose} />
      </SlideDialogPhotoHeaderStyle>
      <UploderPhoto UID={UID} uploadedPhotos={uploadedPhotos} />
      <ButtonWrap>
        <ButtonUI small onClick={setWebAll}>Выгрузить все</ButtonUI>
      </ButtonWrap>
      <SlideDialogPhotoContext>
        {
          loading ?
            <>
              <SlideDialogPhotoSceleton />
              <SlideDialogPhotoSceleton />
              <SlideDialogPhotoSceleton />
              <SlideDialogPhotoSceleton />
            </>
            :
            <>
              {
                photos.map((item, idx) => (
                  <SliderPhoto
                    key={item?.UID || idx}
                    photo={item}
                    removePhoto={removePhoto}
                    setDragPhotoStart={setDragPhotoStart}
                    setDragPhotoEnd={setDragPhotoEnd}
                    setWeb={setWeb}
                  />
                ))
              }
            </>
        }
      </SlideDialogPhotoContext>
      <SlideDialogPhotoFooter>
        <ButtonUI size='small' onClick={onClose}>Отменить</ButtonUI>
        <ButtonUI size='small' onClick={saveChange} variant='outline'>Сохранить</ButtonUI>
      </SlideDialogPhotoFooter>
    </SlideDialogPhotoStyle>
  );
};

const SliderPhotoSContainer = styled(motion.div)`
  position: relative;
  transition: opacity .3s;
  cursor: grab;
  display: flex;
  flex-direction: column;
`
const SliderPhotoItem = styled.img`
  width: 100%;
  height: 250px;
  object-fit: contain;
  background-color: #929292;
  border-radius: 5px 5px 0 0;
`
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
  transition: background-color .3s;
  &:hover{
    background-color: #f9ebeb9c;
  }
  &:active{
    background-color: transparent;
  }
`
const SliderPhotoItemFooter = styled.div`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0 0 5px 5px;
`
const SliderPhoto = ({ photo, removePhoto, setDragPhotoStart, setDragPhotoEnd, setWeb }) => {
  const dragStartHandler = () => {
    //событие взятие карточки
    setDragPhotoStart(photo);
  }
  const dragEndHandler = (event) => {
    //отпустили перемещение
    event.target.style.opacity = 1;
  }
  const dragOverHandler = (event) => {
    //местоположение над другой карточки
    event.preventDefault();
    event.target.style.opacity = 0.5;
  }
  const dropHandler = (event) => {
    //отпустили карточку
    setDragPhotoEnd(photo);
    event.target.style.opacity = 1;
  }
  if (photo?.allow === false) {
    return <PhotoNotAllow />
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
      <RemoveIcon onClick={() => removePhoto(photo.UID)} />
      <SliderPhotoItemFooter>
        <CheckboxUI
          label='Выгружать'
          id={photo.UID}
          checked={photo?.isWeb}
          onChange={() => { setWeb(photo) }}
        />
      </SliderPhotoItemFooter>
    </SliderPhotoSContainer>
  )
}
const PhotoNotAllowContext = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  border-radius: 5px 5px 0 0;
  background-color: #ccc;
`
const NoImageStyle = styled(NoImage)`
  width: 60px;
  height: 60px;
  fill: ${({ theme }) => theme.color.primary};
`
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
  )
}

export default SlideDialogPhoto;