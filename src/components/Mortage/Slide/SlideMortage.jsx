import React from 'react';
import { useWindowSize } from 'hooks/windowSize';
import { SliderStyle, SliderContext } from '../../../styles/slider';
import SlideMortageStory from './SlideMortageStory';
import SlideMortageMeta from './SlideMortageMeta';
import SlideMortageStatus from './SlideMortageStatus';
import SlideMortageMain from './SlideMortageMain';
import { FormProvider, useForm } from 'react-hook-form';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import SlideMortageCredit from './SlideMortageCredit';
import SlideMortageLoaners from './SlideMortageLoaners';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { SliderFormButtonGroup } from '../../../styles/SliderFormButtonGroup';

const SliderMortageForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SlideMortage = () => {
  const windowSize = useWindowSize();
  const mortage = useAsyncValue();
  const method = useForm({
    defaultValues: mortage,
  });
  const onSubmit = (data) => {
    //TODO need save slide plus checkOneMortage()
    console.log(data);
  };
  return (
    <SliderStyle>
      <SliderContext>
        <SlideMortageMeta />
        <SlideMortageStatus />
        <SlideMortageMain />
        <FormProvider {...method}>
          <SliderMortageForm onSubmit={method.handleSubmit(onSubmit)}>
            <SlideMortageLoaners />
            <SlideMortageCredit />
            {method.formState.isDirty && (
              <SliderFormButtonGroup>
                <TextSpanStyle>Сохранить изменения?</TextSpanStyle>
                <ButtonUI type='submit' size='small'>
                  Сохранить
                </ButtonUI>
              </SliderFormButtonGroup>
            )}
          </SliderMortageForm>
        </FormProvider>
        {windowSize < 768 && <SlideMortageStory fullWidth height={500} />}
      </SliderContext>
      {windowSize > 768 && <SlideMortageStory />}
    </SliderStyle>
  );
};

export default SlideMortage;
