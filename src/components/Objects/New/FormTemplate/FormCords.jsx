import React from 'react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { ObjectSliderBox } from '../../ObjectsStyle';
import Dadata from 'components/Main/Dadata';
import MapPlacemark from 'components/Main/MapPlacemark';
import { TextSpanStyle } from 'styles/styles';
import { useAsyncValue } from 'react-router-dom';

const FormCords = () => {
  const object = useAsyncValue();
  const { control, clearErrors, setValue, setError } = useFormContext();
  const { errors } = useFormState();

  const setCords = (e) => {
    const addressValue = e?.data;
    if (addressValue?.geo_lat && addressValue?.geo_lon) {
      setValue('cords', [addressValue.geo_lat, addressValue.geo_lon]);
      clearErrors('cords');
      return;
    }
    setError('cords', { type: 'custom', message: 'Отсутствуют координаты' });
  };
  return (
    <ObjectSliderBox $column>
      <TextSpanStyle color='grey'>
        При вводе адреса ОБЯЗАТЕЛЬНО выберете нужный из списка.
      </TextSpanStyle>
      <Controller
        name='addressId'
        control={control}
        rules={{ required: 'Поле обязательное' }}
        render={({ field }) => (
          <Dadata
            label='Адрес'
            fullWidth
            onChange={(e) => {
              field.onChange(e), setCords(e);
            }}
            error={errors?.addressId || ''}
            defaultQuery={object?.addressId?.value || ''}
            inputRef={field.ref}
          />
        )}
      />
      <TextSpanStyle color='grey'>
        В соответствии с требованиями ЦИАН, необходимо указать координаты с
        точность до дома. Внимание! В случае ввода не верных координат объект не
        выгрузится в рекламу.{' '}
      </TextSpanStyle>
      {object && (
        <TextSpanStyle bold color='grey'>
          Для указания точки щелкните на карте в нужном месте.
        </TextSpanStyle>
      )}
      <Controller
        name='cords'
        control={control}
        render={({ field }) => (
          <MapPlacemark
            onChange={field.onChange}
            cords={field.value}
            error={errors?.cords || ''}
            clearErrors={clearErrors}
          />
        )}
      />
    </ObjectSliderBox>
  );
};

export default FormCords;
