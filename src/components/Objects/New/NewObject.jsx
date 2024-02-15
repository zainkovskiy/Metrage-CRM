import React from 'react';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import TypeRealEstate from './TypeRealEstate';
import TypeDeal from './TypeDeal';
import TypeObject from './TypeObject';
import FormCords from './FormTemplate/FormCords';
import { useSelectCategoryField } from '../objectHook';
import { useAsyncValue } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createObject } from 'store/objectSlice';
import TitleAdv from './TitleAdv';
import { ObjectSliderBox } from '../ObjectsStyle';
import { ButtonUI } from 'ui/ButtonUI';
import FormRent from './FormRent';

const NewObjectStyle = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  overflow: auto;
`;
const NewObject = ({ onClose }) => {
  const dispatch = useDispatch();
  const object = useAsyncValue();
  const methods = useForm({
    defaultValues: {
      ...object,
    },
  });

  const onSubmit = (data) => {
    return dispatch(createObject(data))
      .unwrap()
      .then((answer) => {
        if (answer?.status === 'OK') {
          onClose('', answer?.url);
        }
      });
  };

  methods.watch('typeEstate');
  methods.watch('typeDeal');
  methods.watch('Category');
  const FieldsCategory = useSelectCategoryField(
    methods.getValues('Category'),
    methods.getValues('typeEstate')
  );
  return (
    <FormProvider {...methods}>
      <NewObjectStyle onSubmit={methods.handleSubmit(onSubmit)}>
        <TypeRealEstate />
        {methods.getValues('typeEstate') && <TypeDeal />}
        {methods.getValues('typeDeal') && <TypeObject />}
        {methods.getValues('Category') && (
          <>
            {object && <TitleAdv />}
            <FormCords />
            <FieldsCategory typeDeal={object?.typeDeal} />
          </>
        )}
        {methods.getValues('typeDeal') === 'sell' && object && <FormRent />}
        {methods.getValues('Category') && (
          <ObjectSliderBox
            $column
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ButtonUI type='submit' disabled={methods.formState.isSubmitting}>
              Сохранить
            </ButtonUI>
          </ObjectSliderBox>
        )}
      </NewObjectStyle>
    </FormProvider>
  );
};

export default NewObject;
