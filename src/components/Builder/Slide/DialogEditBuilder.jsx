import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { useAsyncValue } from 'react-router-dom';
import { setNewComment, setNewValueDeveloper } from '../../../api/builderAPI';
import { InputUI } from 'ui/InputUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';

const EditBuilder = styled.form`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
  box-sizing: border-box;
`;

const DialogEditBuilder = ({ onClose }) => {
  const builder = useAsyncValue();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: builder?.name || '',
      startDate: builder?.startDate || '',
      devType: builder?.devType || '',
      region: builder?.region || 'Новосибирск',
      comissionSize: builder?.comissionSize || null,
    },
  });
  const onSubmit = (data) => {
    setNewValueDeveloper({
      UID: builder.UID,
      ...data,
    }).then(() => {
      builder.name = data.name;
      builder.startDate = data.startDate;
      builder.devType = data.devType;
      builder.region = data.region;
      builder.comissionSize = data.comissionSize;
      onClose();
    });
  };
  return (
    <EditBuilder
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SliderTitle>Редактировать застройщика</SliderTitle>
      <Controller
        control={control}
        name='name'
        // rules={{ required: { value: true, message: 'Поле обязательно' } }}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Название'
            // error={errors?.secondName}
            ref={field.ref}
          />
        )}
      />
      <Controller
        control={control}
        name='startDate'
        rules={{ required: { value: true, message: 'Поле обязательно' } }}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Дата начала работы'
            type='number'
            // error={errors?.secondName}
            ref={field.ref}
          />
        )}
      />
      <Controller
        name='devType'
        control={control}
        // rules={{
        //   required: { value: true, message: 'Поле обязательно' },
        // }}
        render={({ field }) => (
          <SelectUI
            onChange={field.onChange}
            select={field.value}
            label='Тип застройщика'
            small
            // error={errors?.FlatRoomsCount}
          >
            <SelectItemUI value='МКД'>МКД</SelectItemUI>
            <SelectItemUI value='ИЖС'>ИЖС</SelectItemUI>
          </SelectUI>
        )}
      />
      <Controller
        name='region'
        control={control}
        // rules={{
        //   required: { value: true, message: 'Поле обязательно' },
        // }}
        render={({ field }) => (
          <SelectUI
            onChange={field.onChange}
            select={field.value}
            label='Регион'
            small
            // error={errors?.FlatRoomsCount}
          >
            <SelectItemUI value='Новосибирск'>Новосибирск</SelectItemUI>
            <SelectItemUI value='Москва'>Москва</SelectItemUI>
          </SelectUI>
        )}
      />
      <Controller
        control={control}
        name='comissionSize'
        // rules={{ required: { value: true, message: 'Поле обязательно' } }}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Комиссия'
            type='number'
            // error={errors?.secondName}
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
    </EditBuilder>
  );
};

export default DialogEditBuilder;
