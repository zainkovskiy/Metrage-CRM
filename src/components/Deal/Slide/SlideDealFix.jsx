import React from 'react';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { Box } from 'ui/Box';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { InputUI } from 'ui/InputUI';
import RadioButtonGroup from '../../../ui/RadioButtonGroup/RadioButtonGroup';
import RadioButton from '../../../ui/RadioButton/RadioButton';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { useAsyncValue } from 'react-router-dom';

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
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
  const { errors } = useFormState();

  return (
    <SlideBlockStyle>
      <Box column fullWidth>
        <Title>Финансирование по сделке</Title>
        <InputsField>
          {deal?.dealStatusId >= 3 && (
            <Controller
              name='hasMorgage'
              control={control}
              rules={{ required: 'Поле обязательнок' }}
              render={({ field }) => (
                <SelectUI
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  select={field.value}
                  label='Привлечение ипотечных средств *'
                  small
                  labelSize={12}
                  error={errors?.hasMorgage && errors.hasMorgage}
                >
                  <SelectItemUI value='yes'>Да</SelectItemUI>
                  <SelectItemUI value='no'>Нет</SelectItemUI>
                </SelectUI>
              )}
            />
          )}
          <div></div>
        </InputsField>
        <InputsField>
          <Controller
            name='ownFunds'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Собственные средства, руб'
                value={field.value}
                type='number'
                small
                labelSize={12}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
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
                type='number'
                small
                labelSize={12}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            )}
          />
        </InputsField>
        <InputsField>
          <Controller
            name='hasInsurance'
            control={control}
            render={({ field }) => (
              <SelectUI
                onChange={(newValue) => {
                  field.onChange(newValue === 'Y' ? true : false);
                }}
                select={field.value ? 'Y' : 'N'}
                label='Страховка в наличии'
                small
                labelSize={12}
              >
                <SelectItemUI value='Y'>Да</SelectItemUI>
                <SelectItemUI value='N'>Нет</SelectItemUI>
              </SelectUI>
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
                type='number'
                small
                labelSize={12}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
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
        <Controller
          name='depositStatus'
          control={control}
          render={({ field }) => (
            <RadioButtonGroup
              name='depositStatus'
              value={field.value}
              onChange={field.onChange}
              gap='0.5rem'
              wrap
            >
              <RadioButton label='Принят' id='depositAccepted' />
              <RadioButton label='Принят в другом АН' id='depositDelivered' />
              <RadioButton label='Выдан на руки' id='depositReturned' />
            </RadioButtonGroup>
          )}
        />
      </Box>
    </SlideBlockStyle>
  );
};

export default SlideDealFix;
