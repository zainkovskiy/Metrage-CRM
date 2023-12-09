import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { Box } from 'ui/Box';
import { CheckboxUI } from 'ui/CheckboxUI';
import { Controller, useFormContext } from 'react-hook-form';
import { InputUI } from 'ui/InputUI';

const Title = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
`;
const InputsField = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;
const Line = styled.div`
  height: 1px;
  background-color: #ccc;
  width: 100%;
`;

const SlideDealFix = () => {
  const deal = useAsyncValue();
  const { control } = useFormContext();
  return (
    <SlideBlockStyle>
      <Box column fullWidth>
        <Title>Финансирование по сделке</Title>
        <InputsField>
          <Controller
            name='ownFunds'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Собственные средства, руб'
                value={field.value}
                small
                labelSize={12}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <Controller
            name='mortgageFunds'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Ипотека, руб'
                value={field.value}
                small
                labelSize={12}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <Controller
            name='bank'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Банк кредитор'
                value={field.value}
                small
                labelSize={12}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <Controller
            name='needInsurance'
            control={control}
            render={({ field }) => (
              <CheckboxUI
                label='Нужна консультация Брокера'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                defaultChecked={field.value || false}
                id='needInsurance'
                size='small'
                labelSize={12}
              />
            )}
          />
          <Controller
            name='hasInsurance'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Страховка'
                value={field.value}
                small
                labelSize={12}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <Controller
            name='needMortgage'
            control={control}
            render={({ field }) => (
              <CheckboxUI
                label='Нужна консультация Брокера'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                defaultChecked={field.value || false}
                id='needMortgage'
                size='small'
                labelSize={12}
              />
            )}
          />
        </InputsField>
        <Line />
        <InputsField>
          <Controller
            name='depositAmount'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Задаток, руб'
                value={field.value}
                small
                labelSize={12}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <Controller
            name='depositDate'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Дата задатка'
                value={field.value}
                small
                type='date'
                labelSize={12}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
        </InputsField>
      </Box>
    </SlideBlockStyle>
  );
};

export default SlideDealFix;
