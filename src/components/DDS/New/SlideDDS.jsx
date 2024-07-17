import React, { useState } from 'react';
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
import SlideDDSOperation from './SlideDDSOperation';

const SliderForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SlideDDS = ({ onClose }) => {
  const dds = useAsyncValue();
  const [change, setChange] = useState(false);
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
  const toggleChange = () => {
    setChange(!change);
  };
  return (
    <SliderStyle>
      <SliderContext>
        <SlideDDSMeta />
        <FormProvider {...method}>
          <SliderForm onSubmit={method.handleSubmit(onSubmit)}>
            <SlideDDSMain toggleChange={toggleChange} />
            <SlideDDSInfo />
            {dds?.operation?.needRisovat && <SlideDDSOperation />}
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
