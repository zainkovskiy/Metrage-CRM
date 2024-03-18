import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { device } from 'styles/device';
import { useAsyncValue } from 'react-router-dom';
import { addNewPhotoResidential } from '../../../api/residential';

const DialogPhoto = styled.form`
  width: 60vw;
  /* height: 60vh; */
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  box-sizing: border-box;
  @media ${device.tablet} {
    width: calc(100vw - 1rem);
    /* height: 80vh; */
  }
`;
const PhotoContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  background-color: #ccc;
`;
const DialogImg = styled.img`
  width: 100%;
  height: 60vh;
  object-fit: contain;
  background-color: #ccc;
  @media ${device.tablet} {
    height: 50vh;
  }
`;

const DialogAddPhoto = ({ photo, onClose }) => {
  const residential = useAsyncValue();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      photoType: 'renderer',
    },
  });
  const onSubmit = (data) => {
    addNewPhotoResidential({
      photoType: data.photoType,
      URL: photo.URL,
      JKId: residential.UID,
    }).then((newPhoto) => {
      if (newPhoto) {
        residential[data.photoType] = [
          ...residential[data.photoType],
          newPhoto,
        ];
        onClose();
      }
    });
  };
  return (
    <DialogPhoto
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
    >
      <DialogImg src={photo.URL} />
      <Controller
        name='photoType'
        control={control}
        render={({ field }) => (
          <SelectUI
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            select={field.value}
            label='Тип фото'
            small
          >
            <SelectItemUI value='renderer'>Основное</SelectItemUI>
            <SelectItemUI value='plan'>Планировка</SelectItemUI>
          </SelectUI>
        )}
      />
      <Box jc='flex-start' fullWidth>
        <ButtonUI variant='outline' size='small' onClick={onClose}>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' type='submit'>
          Сохранить
        </ButtonUI>
      </Box>
    </DialogPhoto>
  );
};

export default DialogAddPhoto;
