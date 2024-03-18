import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useAsyncValue } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ImageGalary } from 'components/Main/ImageGalary';
import { SliderBlock } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { LinkUI } from 'ui/LinkUI';
import DialogWindow from 'components/Main/DialogWindow';
import DialogMap from './DialogMap';
import DialogEditInfo from './DialogEditInfo';
import DialogAddPhoto from './DialogAddPhoto';
import DialogRemovePhoto from './DialogRemovePhoto';
import DialogEditID from './DialogEditID';
import { uploadPhotosNews } from '../../../api/uploadAPI';

const SliderBlockCustom = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const InfoButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #787878;
`;
const InfoHeader = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 0.5rem;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;
const InfoAddres = styled(TextSpanStyle)`
  text-align: end;
  @media (max-width: 480px) {
    text-align: start;
  }
`;
const InfoMortage = styled.div`
  border-radius: 5px;
  background-color: #64b27a;
  padding: 0.2rem 0.5rem;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
`;
const GalaryContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;
const SlideResidentialInfo = () => {
  const userId = useSelector((state) => state.user.UID);
  const fileRef = useRef(null);
  const residential = useAsyncValue();
  const [open, setOpen] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const openWindow = (e) => {
    const id = e.target.id;
    setOpen(id);
  };
  const closeWindow = () => {
    setOpen(null);
  };
  const openFileInput = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  const uploadPhoto = (e) => {
    const raw = { entityId: '', entityType: 'developer', author: userId };
    const files = e.target.files;
    uploadPhotosNews(files, raw).then((data) => {
      setPhoto(data);
    });
  };
  const closeWindowPhoto = () => {
    setPhoto(null);
  };
  const toggleRemoveWindow = () => {
    setRemovePhoto(!removePhoto);
  };
  return (
    <SliderBlockCustom>
      <InfoButtons>
        <Box jc='flex-start' wrap>
          {residential?.hasSubsidy && (
            <InfoMortage>Субсидированная ипотека</InfoMortage>
          )}
          {residential?.hasTransh && (
            <InfoMortage>Траншевая ипотека</InfoMortage>
          )}
        </Box>
        <Box>
          <ButtonLink size={12} color='#787878' id='edit' onClick={openWindow}>
            Редактировать
          </ButtonLink>
          <ButtonLink size={12} color='#787878' id='id' onClick={openWindow}>
            ID ЖК
          </ButtonLink>
        </Box>
      </InfoButtons>
      <InfoHeader>
        <Box column gap='0' ai='flex-start' jc='flex-start'>
          <TextSpanStyle lHeight={20} nowrap size={20} bold>
            {residential.name}
          </TextSpanStyle>
          <ButtonLink size={12} color='#85009e' id='map' onClick={openWindow}>
            показать на карте
          </ButtonLink>
        </Box>
        <InfoAddres>{residential.addrStr}</InfoAddres>
      </InfoHeader>
      <div>
        <GalaryContainer>
          {residential?.plan && (
            <ImageGalary
              images={
                residential?.plan || [
                  {
                    URL: '',
                  },
                ]
              }
              height={300}
              status
            />
          )}
          <ImageGalary
            images={
              residential?.renderer || [
                {
                  URL: '',
                },
              ]
            }
            height={300}
            status
          />
        </GalaryContainer>
        <Box jc='flex-end'>
          <input type='file' hidden ref={fileRef} onChange={uploadPhoto} />
          <ButtonLink size={12} color='#787878' onClick={openFileInput}>
            Загрузить фото
          </ButtonLink>
          <ButtonLink size={12} color='#787878' onClick={toggleRemoveWindow}>
            Удалить фото
          </ButtonLink>
        </Box>
      </div>
      <Box jc='space-between' ai='flex-start'>
        <Box column gap='0' ai='flex-start'>
          <TextSpanStyle size={12}>
            Застройщик: {residential?.devObj?.devName || ''}
          </TextSpanStyle>
          <TextSpanStyle size={12}>
            Дата сдачи:{' '}
            {residential?.deadLine &&
              useDateFormat(residential?.deadLine, 'MMMM YYYY')}
          </TextSpanStyle>
        </Box>
        <Box column gap='0' ai='flex-end'>
          <TextSpanStyle size={12}>
            Тип: {residential?.JKType || ''}
          </TextSpanStyle>
          {residential?.site && (
            <LinkUI href={residential?.site} target='_blank'>
              Ссылка на сайт
            </LinkUI>
          )}
        </Box>
      </Box>
      <DialogWindow onClose={closeWindow} open={open === 'map'}>
        <DialogMap onClose={closeWindow} />
      </DialogWindow>
      <DialogWindow onClose={closeWindow} open={open === 'edit'}>
        <DialogEditInfo onClose={closeWindow} />
      </DialogWindow>
      <DialogWindow onClose={closeWindow} open={open === 'id'}>
        <DialogEditID onClose={closeWindow} />
      </DialogWindow>
      <DialogWindow onClose={closeWindowPhoto} open={Boolean(photo)}>
        <DialogAddPhoto onClose={closeWindowPhoto} photo={photo} />
      </DialogWindow>
      <DialogWindow onClose={toggleRemoveWindow} open={removePhoto}>
        <DialogRemovePhoto onClose={toggleRemoveWindow} />
      </DialogWindow>
    </SliderBlockCustom>
  );
};

export default SlideResidentialInfo;
