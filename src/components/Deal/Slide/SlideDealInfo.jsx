import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { RealtyTypeTranslate, DealTypeTranslate } from '../keyTranslate';
import { InputUI } from 'ui/InputUI';
import { useNumberTriad } from 'hooks/StringHook';
import { Controller, useFormContext } from 'react-hook-form';
import { statusVarinants } from '../DealStatus';

const FeatureTitle = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const SlideDealInfoContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
`;
const SlideDealInfoSide = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SlideDealInfo = () => {
  const deal = useAsyncValue();
  const { control } = useFormContext();
  return (
    <SlideBlockStyle $column ai='flex-start'>
      <FeatureTitle>Общая информация</FeatureTitle>
      <SlideDealInfoContent>
        <SlideDealInfoSide>
          <Controller
            name='plannedDate'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Дата сделки (План)'
                value={field.value}
                type='date'
                small
                labelSize={12}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <Controller
            name='actualDate'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Дата сделки (Факт)'
                value={field.value}
                type='date'
                small
                labelSize={12}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
        </SlideDealInfoSide>
        <SlideDealInfoSide>
          <Controller
            name='objectCost'
            control={control}
            render={({ field }) => (
              <InputUI
                small
                label='Стоимость объекта, руб'
                labelSize={12}
                value={field.value || ''}
                type='number'
                onChange={(e) => field.onChange(e.target.value)}
                fullWidth
              />
            )}
          />
          <Controller
            name='agencyComission'
            control={control}
            render={({ field }) => (
              <InputUI
                small
                label='Комиссия агенства, руб'
                labelSize={12}
                value={field.value || ''}
                type='number'
                onChange={(e) => field.onChange(e.target.value)}
                fullWidth
              />
            )}
          />
        </SlideDealInfoSide>
        <div>
          <TextSpanStyle size={12}>
            Тип сделки: {deal?.dealType ? DealTypeTranslate[deal.dealType] : ''}
          </TextSpanStyle>
          <TextSpanStyle size={12}>
            Тип недвижимости:{' '}
            {deal?.realtyType ? RealtyTypeTranslate[deal.realtyType] : ''}
          </TextSpanStyle>
          {/* <TextSpanStyle size={12}>
            Стоимость объекта: {useNumberTriad(deal?.objectCost || '0')} руб.
          </TextSpanStyle>
          <TextSpanStyle size={12}>
            Комиссия агенства: {useNumberTriad(deal?.agencyComission || '0')}{' '}
            руб.
          </TextSpanStyle> */}
        </div>
      </SlideDealInfoContent>
    </SlideBlockStyle>
  );
};

export default SlideDealInfo;
