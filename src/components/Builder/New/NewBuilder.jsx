import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { createNewBuilder } from '../../../api/builderAPI';
import { useDispatch } from 'react-redux';
import { addNewBuilder } from '../../../store/slices/builderSlice';

const NewBuilderForm = styled.form`
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  overflow: auto;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;
const NewBuilder = ({ onClose }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      devType: 'МКД',
    },
  });
  const onSubmit = (data) => {
    createNewBuilder(data).then((res) => {
      dispatch(addNewBuilder(res));
      onClose(res);
    });
  };
  return (
    <NewBuilderForm onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <SliderTitle>Новый застройщик</SliderTitle>
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
          // rules={{ required: { value: true, message: 'Поле обязательно' } }}
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
      </FormContainer>
      <ButtonUI type='submit'>Сохранить</ButtonUI>
    </NewBuilderForm>
  );
};

export default NewBuilder;
