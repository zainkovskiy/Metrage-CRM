import React from 'react';
import { Controller } from 'react-hook-form';
import { ObjectSliderBox } from '../ObjectsStyle';
import Dadata from 'components/Main/Dadata';
import MapPlacemark from 'components/Main/MapPlacemark';
import { TextSpanStyle } from 'styles/styles';
const FormCords = ({control, setCords, errors, clearErrors}) => {
  return (
    <ObjectSliderBox $column>
    <Controller
      name='addressId'
      control={control}
      rules={{required: 'Поле обязательное'}}
      render={({ field }) => (
        <Dadata label='Адрес' fullWidth onChange={(e) => { field.onChange(e), setCords(e)}} error={errors?.addressId || ''} inputRef={field.ref}/>
      )}
    />
    <TextSpanStyle color='grey'>В соответствии с требованиями ЦИАН, необходимо указать координаты с точность до дома. Внимание! В случае ввода не верных координат объект не выгрузится в рекламу</TextSpanStyle>
    <Controller
      name='cords'
      control={control}
      render={({ field }) => (
        <MapPlacemark onChange={field.onChange} cords={field.value} error={errors?.cords || ''} clearErrors={clearErrors}/>
      )}
    />
  </ObjectSliderBox>
  );
};

export default FormCords;