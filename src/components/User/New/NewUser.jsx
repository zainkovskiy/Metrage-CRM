import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { SliderTitle } from '../../../styles/slider';
import { getLocalOfficeList } from '../../../api/search';
import { createNewUser, getPositionList } from '../../../api/usersApi';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { useDispatch } from 'react-redux';
import { addNewMiniCard } from '../../../store/usersSlice';

const NewUserStyle = styled.form`
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
const NewUser = ({ onClose }) => {
  const dispatch = useDispatch();
  const [officeList, setOfficeList] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getPositions();
  }, []);
  const onSubmit = (data) => {
    createNewUser(data).then((answer) => {
      if (answer.result === 'OK') {
        dispatch(addNewMiniCard(answer.UID));
        onClose();
      }
    });
  };
  const getOfficeList = (value) => {
    if (value.length < 2) {
      setOfficeList([]);
      return;
    }
    getLocalOfficeList(value).then((data) => {
      setOfficeList(data);
    });
  };
  const getPositions = () => {
    getPositionList().then((data) => {
      setPositionList(data);
    });
  };
  return (
    <NewUserStyle onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <SliderTitle>Новый пользователь</SliderTitle>
        <Controller
          control={control}
          name='lastName'
          rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <InputUI
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Фамилия'
              error={errors?.lastName}
              ref={field.ref}
            />
          )}
        />
        <Controller
          control={control}
          name='firstName'
          rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <InputUI
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Имя'
              error={errors?.firstName}
              ref={field.ref}
            />
          )}
        />
        <Controller
          control={control}
          name='secondName'
          rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <InputUI
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Отчество'
              error={errors?.secondName}
              ref={field.ref}
            />
          )}
        />
        <Controller
          control={control}
          name='phone'
          rules={{
            required: { value: true, message: 'Поле обязательно' },
            minLength: { value: 11, message: 'Не меньше 11 символов' },
            maxLength: { value: 11, message: 'Не больше 11 символов' },
            pattern: { value: /^8\d{10}$/, message: 'Пример 8XXXXXXXXXX' },
          }}
          render={({ field }) => (
            <InputUI
              type='number'
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Номер телефона'
              error={errors?.phone}
              ref={field.ref}
            />
          )}
        />
        <Controller
          control={control}
          name='birthDate'
          rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <InputUI
              type='date'
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Дата рождения'
              error={errors?.birthDate}
              ref={field.ref}
            />
          )}
        />
        <Controller
          name='office'
          control={control}
          rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <SelectAutoсompleteUI
              small
              label='Офис'
              options={officeList}
              getOptionsLabel={(options) => options.name}
              onChange={(option) => field.onChange(option)}
              value={field.value}
              inputChange={getOfficeList}
              error={errors?.office}
              inputRef={field.ref}
            />
          )}
        />
        <Controller
          name='position'
          control={control}
          rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <SelectAutoсompleteUI
              small
              label='Должность'
              options={positionList}
              getOptionsLabel={(options) => options.positionName}
              onChange={(option) => field.onChange(option)}
              value={field.value}
              error={errors?.position}
              inputRef={field.ref}
            />
          )}
        />
      </FormContainer>
      <ButtonUI type='submit'>Сохранить</ButtonUI>
    </NewUserStyle>
  );
};

export default NewUser;
