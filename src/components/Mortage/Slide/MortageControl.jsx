import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TextSpanStyle } from 'styles/styles';
import { CheckboxUI } from 'ui/CheckboxUI';
import InputText from '../../../ui/InputText/InputText';
import { LabelStyle } from 'ui/InputUI/InputUIStyled';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Controller, useFormContext } from 'react-hook-form';
import { ButtonLink } from 'ui/ButtonLink';
import styled from 'styled-components';

const MortageControlStyle = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Line = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.5rem;
`;
const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 250px;
  max-width: 50%;
`;

const MortageControl = () => {
  const { control } = useFormContext();
  return (
    <MortageControlStyle>
      <Line>
        <Controller
          name='credit.isFullDoc'
          control={control}
          render={({ field }) => {
            return (
              <CheckboxUI
                size='small'
                labelSize={12}
                checked={field.value}
                onChange={field.onChange}
                label='Комплект док-ов полный:'
              />
            );
          }}
        />
        <Controller
          name='credit.accreditationPaid'
          control={control}
          render={({ field }) => {
            return (
              <CheckboxUI
                size='small'
                labelSize={12}
                checked={field.value}
                onChange={field.onChange}
                label='Аккредитация оплачена:'
              />
            );
          }}
        />
      </Line>
      <Field>
        <TextSpanStyle size={12} nowrap>
          Выручка за услугу (Аккредитация)
        </TextSpanStyle>
        <Controller
          name='credit.accreditationSum'
          control={control}
          render={({ field }) => {
            return (
              <InputText
                size={12}
                value={field.value}
                onChange={field.onChange}
              />
            );
          }}
        />
      </Field>
    </MortageControlStyle>
  );
};

export default MortageControl;
