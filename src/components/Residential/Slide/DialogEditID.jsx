import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { useAsyncValue } from 'react-router-dom';
import { InputUI } from 'ui/InputUI';
import { updateResidential } from '../../../api/residential';

const EditID = styled.form`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
  box-sizing: border-box;
  max-height: 80vh;
  overflow: auto;
`;

const DialogEditID = ({ onClose }) => {
  const residential = useAsyncValue();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cianJKId: residential?.cianJKId || '',
      yandexJKId: residential?.yandexJKId || '',
      avitoJKId: residential?.avitoJKId || '',
      trandJKId: residential?.trandJKId || null,
    },
  });
  const onSubmit = (data) => {
    updateResidential({
      ...residential,
      ...data,
    }).then(() => {
      residential.cianJKId = data.cianJKId;
      residential.yandexJKId = data.yandexJKId;
      residential.avitoJKId = data.avitoJKId;
      residential.trandJKId = data.trandJKId;
      onClose();
    });
  };
  return (
    <EditID
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SliderTitle>Редактировать ID ЖК</SliderTitle>
      <Controller
        control={control}
        name='cianJKId'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='cianJKId'
            ref={field.ref}
          />
        )}
      />
      <Controller
        control={control}
        name='yandexJKId'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='yandexJKId'
            ref={field.ref}
          />
        )}
      />
      <Controller
        control={control}
        name='avitoJKId'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='avitoJKId'
            ref={field.ref}
          />
        )}
      />
      <Controller
        control={control}
        name='trandJKId'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='trandJKId'
            ref={field.ref}
          />
        )}
      />
      <Box jc='flex-start'>
        <ButtonUI variant='outline' size='small' onClick={onClose}>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' type='submit'>
          Сохранить
        </ButtonUI>
      </Box>
    </EditID>
  );
};

export default DialogEditID;
