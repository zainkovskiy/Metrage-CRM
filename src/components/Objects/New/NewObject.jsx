import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import TypeRealEstate from './TypeRealEstate';
import TypeDeal from './TypeDeal';
import TypeObject from './TypeObject';
import FormCords from './FormTemplate/FormCords';

const NewObjectStyle = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  overflow: auto;
`
const NewObject = () => {
  const { handleSubmit, control, getValues, watch, setValue, setError, clearErrors, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  }
  const setCords = (e) => {
    const addressValue = e?.data;
    if (addressValue?.geo_lat && addressValue?.geo_lon) {
      setValue('cords', [addressValue.geo_lat, addressValue.geo_lon]);
      clearErrors('cords')
      return
    }
    setError('cords', { type: 'custom', message: 'Отсутствуют координаты' })
  }
  watch('typeEstate');
  watch('typeDeal');
  watch('Category');
  const FieldsCategory = getFieldComponent(getValues('Category'));
  return (
    <NewObjectStyle onSubmit={handleSubmit(onSubmit)}>
      <TypeRealEstate control={control} />
      {
        getValues('typeEstate') &&
        <TypeDeal control={control} />
      }
      {
        getValues('typeDeal') &&
        <TypeObject control={control} />
      }
      {
        getValues('Category') &&
        <>
          <FormCords control={control} setCords={setCords} errors={errors} clearErrors={clearErrors} />
          <FieldsCategory control={control} errors={errors}/>
        </>
      }
    </NewObjectStyle>
  );
};

import FormFlat from './FormTemplate/FormFlat';
import FormRoom from './FormTemplate/FormRoom';
import FormNewBuilding from './FormTemplate/FormNewBuilding';
import FormFlatShare from './FormTemplate/FormFlatShare';
import FormGarage from './FormTemplate/FormGarage';
import FormHouse from './FormTemplate/FormHouse';
import FormHouseShare from './FormTemplate/FormHouseShare';
import FormoCottage from './FormTemplate/FormoCottage';
import FormTownhouse from './FormTemplate/FormTownhouse';
import FormLand from './FormTemplate/FormLand';

const DefaultComponent = styled.div`
`
const getFieldComponent = (category) => {
  switch (category) {
    case 'flatSale':
      return FormFlat;
    case 'newBuildingFlatSale':
      return FormNewBuilding;
    case 'flatShareSale':
      return FormFlatShare;
    case 'roomSale':
      return FormRoom;
    case 'garageSale':
      return FormGarage;
    case 'houseSale':
      return FormHouse;
    case 'houseShareSale':
      return FormHouseShare;
    case 'cottageSale':
      return FormoCottage;
    case 'townhouseSale':
      return FormTownhouse;
    case 'landSale':
      return FormLand;
    default:
      return DefaultComponent;
  }
}
export default NewObject;