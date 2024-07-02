import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { useDispatch, useSelector } from 'react-redux';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { findBuilderList } from 'api/search';

import { addNewResidential } from '../../../store/slices/residentialSlice';
import { createNewResidential } from '../../../api/residential';
import Dadata from 'components/Main/Dadata';
import MapPlacemark from 'components/Main/MapPlacemark';

const NewResidentialForm = styled.form`
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
const NewResidential = ({ onClose }) => {
  const dispatch = useDispatch();
  const builderRequest = useRef(false);
  const [builderList, setBuilderList] = useState([]);
  const { handleSubmit, control, watch, getValues, setValue } = useForm({
    defaultValues: {
      JKType: 'БЦ',
    },
  });
  const onSubmit = (data) => {
    createNewResidential(data).then((res) => {
      dispatch(addNewResidential(res));
      onClose(res);
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
  const setCords = (e) => {
    const addressValue = e?.data;
    if (addressValue?.geo_lat && addressValue?.geo_lon) {
      setValue('cords', [addressValue.geo_lat, addressValue.geo_lon]);
      return;
    }
  };
  watch('JKType');
  return (
    <NewResidentialForm onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <SliderTitle>Новый ЖК</SliderTitle>
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
              <SelectItemUI value='КП'>КП</SelectItemUI>
            </SelectUI>
          )}
        />
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
          name='addressId'
          control={control}
          render={({ field }) => (
            <Dadata
              label='Адрес'
              small
              onChange={(e) => {
                field.onChange(e), setCords(e);
              }}
              inputRef={field.ref}
            />
          )}
        />
        <Controller
          name='cords'
          control={control}
          render={({ field }) => (
            <MapPlacemark onChange={field.onChange} cords={field.value} />
          )}
        />
        {getValues('JKType') !== 'КП' && (
          <Controller
            name='devId'
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
        )}
        {getValues('JKType') !== 'КП' && (
          <>
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
              name='isBuild'
              control={control}
              render={({ field }) => (
                <CheckboxUI
                  label='ЖК Построен'
                  id='isBuild'
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </>
        )}
      </FormContainer>
      <ButtonUI type='submit'>Сохранить</ButtonUI>
    </NewResidentialForm>
  );
};

export default NewResidential;
