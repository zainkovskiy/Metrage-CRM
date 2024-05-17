import React from 'react';
import { TextSpanStyle } from 'styles/styles';
import { CheckboxUI } from 'ui/CheckboxUI';
import InputText from '../../../ui/InputText/InputText';
import { SliderBlock } from '../../../styles/slider';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

const MortageControlStyle = styled(SliderBlock)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(216px, 1fr));
  gap: 0.5rem;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MortageControl = () => {
  const { control } = useFormContext();
  return (
    <MortageControlStyle>
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
      <Field>
        <TextSpanStyle size={12} nowrap>
          Стоимость услуги
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
