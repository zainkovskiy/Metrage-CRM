import React from 'react';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import SlideDDSMeta from './SlideDDSMeta';
import { FormProvider, useForm } from 'react-hook-form';
import { useAsyncValue } from 'react-router-dom';
import SlideDDSMain from './SlideDDSMain';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { SliderFormButtonGroup } from '../../../styles/SliderFormButtonGroup';
import styled from 'styled-components';
import SlideDDSInfo from './SlideDDSInfo';
import { useDispatch } from 'react-redux';
import { actionDds } from '../../../store/slices/ddsSlice';

const SliderForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SlideDDS = ({ onClose }) => {
  const dds = useAsyncValue();
  const dispatch = useDispatch();
  const method = useForm({
    defaultValues: dds,
  });
  const onSubmit = (data) => {
    dispatch(actionDds(data))
      .unwrap()
      .finally(() => {
        onClose();
      });
  };
  return (
    <SliderStyle>
      <SliderContext>
        <SlideDDSMeta />
        <FormProvider {...method}>
          <SliderForm onSubmit={method.handleSubmit(onSubmit)}>
            <SlideDDSMain />
            <SlideDDSInfo />
            {method.formState.isDirty && (
              <SliderFormButtonGroup>
                <TextSpanStyle>Сохранить изменения?</TextSpanStyle>
                <ButtonUI type='submit' size='small'>
                  Сохранить
                </ButtonUI>
              </SliderFormButtonGroup>
            )}
          </SliderForm>
        </FormProvider>
      </SliderContext>
    </SliderStyle>
  );
};

export default SlideDDS;
