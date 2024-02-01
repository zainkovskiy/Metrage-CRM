import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { useAsyncValue } from 'react-router-dom';
import { InputUI } from 'ui/InputUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { findBuilderList } from 'api/search';
import { updateResidential } from '../../../api/residential';

const EditInfo = styled.form`
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

const DialogEditInfo = ({ onClose }) => {
  const residential = useAsyncValue();
  const builderRequest = useRef(false);
  const [builderList, setBuilderList] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: residential?.name || '',
      addrStr: residential?.addrStr || '',
      JKType: residential?.JKType || '',
      devObj: residential?.devObj || null,
      lat: residential?.lat || '',
      lng: residential?.lng || '',
      deadLine: residential?.deadLine || '',
      site: residential?.site || '',
    },
  });
  const onSubmit = (data) => {
    updateResidential({
      ...residential,
      ...data,
    }).then(() => {
      residential.name = data.name;
      residential.addrStr = data.addrStr;
      residential.JKType = data.JKType;
      residential.devObj = data.devObj;
      residential.lat = data.lat;
      residential.lng = data.lng;
      residential.deadLine = data.deadLine;
      residential.site = data.site;
      onClose();
    });
  };
  const getBuilders = (value) => {
    if (value.length < 2) {
      setBuilderList([]);
      return;
    }
    if (builderRequest.current) {
      return;
    }
    builderRequest.current = true;
    findBuilderList(value)
      .then((data) => {
        setBuilderList(data);
      })
      .finally(() => {
        builderRequest.current = false;
      });
  };
  return (
    <EditInfo
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SliderTitle>Редактировать ЖК</SliderTitle>
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
        name='addrStr'
        // rules={{ required: { value: true, message: 'Поле обязательно' } }}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Адрес'
            // error={errors?.secondName}
            ref={field.ref}
          />
        )}
      />
      <Controller
        name='JKType'
        control={control}
        render={({ field }) => (
          <SelectUI
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            select={field.value}
            label='Тип'
            small
          >
            <SelectItemUI value='ЖК'>ЖК</SelectItemUI>
            <SelectItemUI value='БЦ'>БЦ</SelectItemUI>
          </SelectUI>
        )}
      />
      <Controller
        name='devObj'
        control={control}
        render={({ field }) => (
          <SelectAutoсompleteUI
            label='Застройщик'
            options={builderList}
            getOptionsLabel={(options) => options.devName}
            onChange={(option) => field.onChange(option)}
            value={field.value}
            inputChange={getBuilders}
            small
          />
        )}
      />
      <Controller
        control={control}
        name='lat'
        // rules={{ required: { value: true, message: 'Поле обязательно' } }}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Широта'
            // error={errors?.secondName}
            ref={field.ref}
            type='number'
          />
        )}
      />
      <Controller
        control={control}
        name='lng'
        // rules={{ required: { value: true, message: 'Поле обязательно' } }}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Долгота'
            // error={errors?.secondName}
            ref={field.ref}
            type='number'
          />
        )}
      />
      <Controller
        control={control}
        name='deadLine'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Срок сдачи'
            type='month'
          />
        )}
      />
      <Controller
        control={control}
        name='site'
        // rules={{ required: { value: true, message: 'Поле обязательно' } }}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Сайт'
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
    </EditInfo>
  );
};

export default DialogEditInfo;
