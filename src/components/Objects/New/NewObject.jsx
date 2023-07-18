import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import TypeRealEstate from './TypeRealEstate';
import TypeDeal from './TypeDeal';
import TypeObject from './TypeObject';
import FormCords from './FormCords';

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
          <FieldsCategory control={control} />
        </>
      }
    </NewObjectStyle>
  );
};

const FormFlat = React.lazy(() => import('./FormFlat'));
const FormRoom = React.lazy(() => import('./FormRoom'));

const DefaultComponent = styled.div`
`
const getFieldComponent = (category) => {
  switch (category) {
    case 'flatSale':
      return FormFlat;
    case 'roomSale':
      return FormRoom;
    default:
      return DefaultComponent;
  }
}
export default NewObject;