import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { RealtyTypeTranslate, DealTypeTranslate } from '../keyTranslate';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import InputText from '../../../ui/InputText/InputText';
import { Controller, useFormContext } from 'react-hook-form';
import { useNumberTriad } from 'hooks/StringHook';
import { CheckboxUI } from 'ui/CheckboxUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';

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

const SlideDealInfo = ({ isDisgraced }) => {
  const deal = useAsyncValue();
  const { control, getValues, watch } = useFormContext();
  const lawyerCalculatedWatch = watch('lawyerCalculated');
  return (
    <SlideBlockStyle $column ai='flex-start'>
      <FeatureTitle>Общая информация</FeatureTitle>
      <div style={{ width: '100%' }}>
        <Box jc='flex-start' gap='0'>
          <TextSpanStyle>Название:</TextSpanStyle>
          <Controller
            name='dealTitle'
            control={control}
            render={({ field }) => (
              <InputText
                align='start'
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
        </Box>
        <Box wrap jc='flex-start'>
          <Box ai='flex-start'>
            <TextSpanStyle bold>Тип сделки:</TextSpanStyle>
            <TextSpanStyle>
              {deal?.dealType ? DealTypeTranslate[deal.dealType] : ''}
            </TextSpanStyle>
          </Box>
          <Box ai='flex-start'>
            <TextSpanStyle bold>Тип недвижимости:</TextSpanStyle>
            <TextSpanStyle>
              {deal?.realtyType ? RealtyTypeTranslate[deal.realtyType] : ''}
            </TextSpanStyle>
          </Box>
        </Box>
        {/* <TextSpanStyle size={12}>
            Стоимость объекта: {useNumberTriad(deal?.objectCost || '0')} руб.
          </TextSpanStyle>
          <TextSpanStyle size={12}>
            Комиссия агенства: {useNumberTriad(deal?.agencyComission || '0')}{' '}
            руб.
          </TextSpanStyle> */}
      </div>
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
                value={field.value ? useNumberTriad(field.value || 0) : ''}
                onChange={(e) =>
                  field.onChange(parseInt(e.target.value.split(' ').join('')))
                }
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
                value={field.value ? useNumberTriad(field.value || 0) : ''}
                onChange={(e) =>
                  field.onChange(parseInt(e.target.value.split(' ').join('')))
                }
                fullWidth
              />
            )}
          />
        </SlideDealInfoSide>
        <Controller
          name='agentsCalculated'
          control={control}
          render={({ field }) => (
            <CheckboxUI
              disabled={!deal?.isСashier || !isDisgraced || false}
              label='Агенты рассчитаны полностью'
              onChange={(e) => {
                field.onChange(e.target.checked);
              }}
              defaultChecked={field.value || false}
              id='agentsCalculated'
              size='small'
              labelSize={12}
              fullWidth
            />
          )}
        />
        <Box fullWidth column ai='flex-start'>
          <Controller
            name='lawyerCalculated'
            control={control}
            render={({ field }) => (
              <CheckboxUI
                disabled={!deal?.isСashier || !isDisgraced || false}
                label='Юристы рассчитаны'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                defaultChecked={field.value || false}
                id='lawyerCalculated'
                size='small'
                labelSize={12}
              />
            )}
          />
          <Controller
            name='lawyerCalculatedType'
            control={control}
            render={({ field }) => (
              <SelectUI
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                disabled={!lawyerCalculatedWatch}
                select={field.value || 'all'}
                small
              >
                <SelectItemUI value='cash'>Наличные</SelectItemUI>
                <SelectItemUI value='non-cash'>Безнал</SelectItemUI>
              </SelectUI>
            )}
          />
        </Box>
      </SlideDealInfoContent>
    </SlideBlockStyle>
  );
};

export default SlideDealInfo;
