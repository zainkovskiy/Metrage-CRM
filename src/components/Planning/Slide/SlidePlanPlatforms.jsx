import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import SlidePlanPlatform from './SlidePlanPlatform';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { SliderFormButtonGroup } from '../../../styles/SliderFormButtonGroup';
import { setChangePlan } from '../../../api/planApi';

const SlidePlanPlatformsForm = styled.form`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
`;

const SlidePlanPlatforms = ({ setChange }) => {
  const plan = useAsyncValue();
  const method = useForm({
    defaultValues: plan,
  });
  const setAdvertising = (advertising) => {
    plan.advertising = advertising;
    setChange();
    method.reset(plan);
  };
  const onSubmit = (data) => {
    setChangePlan(data).then((answer) => {
      if (answer === 'OK') {
        method.reset(data);
      }
    });
  };
  return (
    <FormProvider {...method}>
      <SlidePlanPlatformsForm onSubmit={method.handleSubmit(onSubmit)}>
        {plan?.advertising?.length > 0 &&
          plan.advertising.map((platform, idx) => (
            <SlidePlanPlatform
              platform={platform}
              key={platform.platformName}
              setAdvertising={setAdvertising}
              platformIdx={idx}
            />
          ))}
        {method.formState.isDirty && (
          <SliderFormButtonGroup>
            <TextSpanStyle>Сохранить изменения?</TextSpanStyle>
            <ButtonUI type='submit' size='small'>
              Сохранить
            </ButtonUI>
          </SliderFormButtonGroup>
        )}
      </SlidePlanPlatformsForm>
    </FormProvider>
  );
};

export default SlidePlanPlatforms;

// console.log(plan);
// const { handleSubmit, control } = useForm({
//   defaultValues: {
//     avito: plan.advertising[0],
//   },
// });
// const onSubmit = (data) => {
//   console.log(data);
// };

{
  /* //штука снизу работает */
}
{
  /* <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='avito.data[0].data[0].fact'
          control={control}
          render={({ field }) => (
            <input type='text' value={field.value} onChange={field.onChange} />
          )}
        />
        <button type='submit'>submit</button>
      </form> */
}
