import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import { FormProvider, useForm } from 'react-hook-form';

import SlideFixationMeta from './SlideFixationMeta';
import SlideFixationStatus from './SlideFixationStatus';

import * as S from './slideSlide';
import { TextSpanStyle } from 'styles/styles';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import { SliderFormButtonGroup } from '../../../styles/SliderFormButtonGroup';
import { ButtonUI } from 'ui/ButtonUI';
import SlideFixationClient from './SlideFixationClient';
import SlideFixationAgency from './SlideFixationAgency';
import SlideFixationSuburban from './SlideFixationSuburban';
import SlideFixationBuilder from './SlideFixationBuilder';
import SlideFixationAdditionally from './SlideFixationAdditionally';
import SlideFixationStory from './SlideFixationStory';
import { updateFixation } from '../../../store/slices/fixationSlice';
import { useDispatch } from 'react-redux';

const SlideFixation = () => {
  const fixation = useAsyncValue();
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const method = useForm({
    defaultValues: fixation,
  });
  const onSubmit = (data) => {
    dispatch(updateFixation(data));
    method.reset(data);
  };
  return (
    <SliderStyle>
      <SliderContext>
        <SlideFixationMeta />
        <SlideFixationStatus />
        <FormProvider {...method}>
          <S.SliderFixationForm onSubmit={method.handleSubmit(onSubmit)}>
            <SlideFixationClient />
            <SlideFixationAgency />
            {fixation.typeObject === 'suburban' && <SlideFixationSuburban />}
            {fixation.typeObject === 'newbuilding' && <SlideFixationBuilder />}
            <SlideFixationAdditionally />
            {method.formState.isDirty && (
              <SliderFormButtonGroup>
                <TextSpanStyle>Сохранить изменения?</TextSpanStyle>
                <ButtonUI type='submit' size='small'>
                  Сохранить
                </ButtonUI>
              </SliderFormButtonGroup>
            )}
          </S.SliderFixationForm>
        </FormProvider>
      </SliderContext>
      {windowSize > 768 && <SlideFixationStory />}
    </SliderStyle>
  );
};

export default SlideFixation;
