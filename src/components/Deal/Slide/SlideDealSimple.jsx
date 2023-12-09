import React from 'react';
import { useAsyncValue, Link } from 'react-router-dom';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { Box } from 'ui/Box';
import imgErrorUrl from 'images/img-error.svg';
import { TextSpanStyle } from 'styles/styles';
import { Controller, useFormContext } from 'react-hook-form';
import { InputUI } from 'ui/InputUI';
import { RealtyTypeTranslate } from '../keyTranslate';

const Title = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
`;
const PhotoObject = styled.img`
  width: 100px;
  height: 100%;
  border-radius: 5px;
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
const SlideDealSimple = () => {
  const deal = useAsyncValue();
  const { control } = useFormContext();

  return (
    <SlideBlockStyle>
      <Box column fullWidth>
        <Title>Основная информация</Title>
        <Box fullWidth jc='flex-start' ai='normal'>
          <PhotoObject src={deal?.objectParams?.photo || imgErrorUrl} />
          <Box column jc='space-between' ai='flex-start'>
            <TextSpanStyle>{deal?.objectParams?.addrString}</TextSpanStyle>
            <Box column gap='0' ai='flex-start'>
              <TextSpanStyle size={12}>Покупатель</TextSpanStyle>
              <TextNavigate to={`/application/${deal?.bidParams?.UID}`}>
                {deal?.bidParams?.lastName || ''}{' '}
                {deal?.bidParams?.firstName || ''}{' '}
                {deal?.bidParams?.secondName || ''}
              </TextNavigate>
            </Box>
          </Box>
        </Box>
        <InputsField>
          <Box column ai='flex-start' gap='0'>
            <TextSpanStyle size={12}>Тип объекта:</TextSpanStyle>
            <TextSpanStyle size={12}>
              {deal?.realtyType ? RealtyTypeTranslate[deal.realtyType] : ''}
            </TextSpanStyle>
          </Box>
          <Box column ai='flex-start' gap='0'>
            <TextSpanStyle size={12}>Площадь:</TextSpanStyle>
            <TextSpanStyle size={12}>
              {deal?.objectParams?.area || ''}
            </TextSpanStyle>
          </Box>
        </InputsField>
        <Line />
        <InputsField>
          <Controller
            name='preAgreementDateEnd'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Дата окончания ПДКП'
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

export default SlideDealSimple;
