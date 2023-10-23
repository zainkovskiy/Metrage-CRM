import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { RealtyTypeTranslate, DealTypeTranslate } from '../keyTranslate';
import { InputUI } from 'ui/InputUI';
import { useNumberTriad } from 'hooks/StringHook';

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
  return (
    <SlideBlockStyle $column ai='flex-start'>
      <FeatureTitle>Общая информация</FeatureTitle>
      <SlideDealInfoContent>
        <SlideDealInfoSide>
          <InputUI
            fullWidth
            label='Дата сделки (План)'
            value={
              deal?.plannedDate
                ? useDateFormat(deal?.plannedDate, 'YYYY-MM-DD')
                : ''
            }
            type='date'
            small
            labelSize={12}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <InputUI
            fullWidth
            label='Дата сделки (Факт)'
            value={
              deal?.actualDate
                ? useDateFormat(deal?.actualDate, 'YYYY-MM-DD')
                : ''
            }
            disabled
            type='date'
            small
            labelSize={12}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </SlideDealInfoSide>
        <div>
          <TextSpanStyle size={12}>
            Статус: {deal?.dealStatus || ''}
          </TextSpanStyle>
          <TextSpanStyle size={12}>
            Тип сделки: {deal?.dealType ? DealTypeTranslate[deal.dealType] : ''}
          </TextSpanStyle>
          <TextSpanStyle size={12}>
            Тип недвижимости:{' '}
            {deal?.realtyType ? RealtyTypeTranslate[deal.realtyType] : ''}
          </TextSpanStyle>
          <TextSpanStyle size={12}>
            Стоимость объекта: {useNumberTriad(deal?.objectCost || '0')} руб.
          </TextSpanStyle>
          <TextSpanStyle size={12}>
            Комиссия агенства: {useNumberTriad(deal?.agencyComission || '0')}{' '}
            руб.
          </TextSpanStyle>
        </div>
      </SlideDealInfoContent>
    </SlideBlockStyle>
  );
};

export default SlideDealInfo;
