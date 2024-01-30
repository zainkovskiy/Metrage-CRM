import React from 'react';
import { useAsyncValue, Link } from 'react-router-dom';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { InputUI } from 'ui/InputUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';

const Title = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
`;
const TextNavigate = styled(Link)`
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  color: #000;
  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
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
const SlideDealDeveloper = () => {
  const deal = useAsyncValue();
  const { control } = useFormContext();
  return (
    <SlideBlockStyle>
      <Box column fullWidth>
        <Title>Основная информация</Title>
        <Box fullWidth column ai='normal'>
          <Box gap='0.3rem' jc='flex-start' wrap>
            <TextSpanStyle size={12} bold>
              Покупатель:
            </TextSpanStyle>
            <TextNavigate to={`/application/${deal?.bidParams?.UID}`}>
              {deal?.bidParams?.lastName || ''}{' '}
              {deal?.bidParams?.firstName || ''}{' '}
              {deal?.bidParams?.secondName || ''}
            </TextNavigate>
          </Box>
          <Box gap='0.3rem' jc='flex-start' wrap>
            <TextSpanStyle size={12} bold>
              Объект:
            </TextSpanStyle>
            {deal?.objectParams?.type && deal?.objectParams?.type ? (
              <TextNavigate
                to={`/objects/${deal?.objectParams?.type}/${deal?.objectParams?.UID}`}
              >
                {deal?.objectParams?.addrString}
              </TextNavigate>
            ) : (
              <TextSpanStyle size={12}>
                {deal?.objectParams?.addrString}
              </TextSpanStyle>
            )}
          </Box>
        </Box>
        <InputsField>
          <Controller
            name='Appartment'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Номер квартиры'
                value={field.value}
                small
                labelSize={12}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <div />
          <Controller
            name='TotalArea'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Площадь'
                value={field.value}
                small
                labelSize={12}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                type='number'
              />
            )}
          />
          <Controller
            name='FlatRoomsCount'
            control={control}
            render={({ field }) => (
              <SelectUI
                onChange={field.onChange}
                select={field.value}
                label='Комнатность'
                small
                labelSize={12}
              >
                <SelectItemUI value={1}>1-комнатная</SelectItemUI>
                <SelectItemUI value={2}>2-комнатная</SelectItemUI>
                <SelectItemUI value={3}>3-комнатная</SelectItemUI>
                <SelectItemUI value={4}>4-комнатная</SelectItemUI>
                <SelectItemUI value={5}>5-комнатная</SelectItemUI>
                <SelectItemUI value={6}>6+</SelectItemUI>
                <SelectItemUI value={7}>Свободная планировка</SelectItemUI>
                <SelectItemUI value={9}>Студия</SelectItemUI>
              </SelectUI>
            )}
          />
          <InputUI
            fullWidth
            disabled={true}
            label='Застройщик'
            value={deal?.newbParams?.devName}
            small
            labelSize={12}
          />
          <InputUI
            fullWidth
            disabled={true}
            label='ЖК'
            value={deal?.newbParams?.resdName}
            small
            labelSize={12}
          />
        </InputsField>
        <Line />
        <InputsField>
          <Controller
            name='actDeliveredDate'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Дата акта'
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
          <Controller
            name='actAcceptedDate'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Акт принят застройщиком'
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
          <Controller
            name='DDUNumber'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Номер ДДУ'
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
            name='DDUDate'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Дата ДДУ'
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
          <Controller
            name='cashDate'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Дата поступления ДС'
                type='date'
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
      </Box>
    </SlideBlockStyle>
  );
};

export default SlideDealDeveloper;
