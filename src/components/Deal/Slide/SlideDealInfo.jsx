import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';

const FeatureTitle = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const SlideDealInfo = () => {
  const deal = useAsyncValue();
  return (
    <SlideBlockStyle $column ai='flex-start'>
      <FeatureTitle>Информация</FeatureTitle>
      <TextSpanStyle size={12}>Дата сделки (План): {useDateFormat(deal?.plannedDate)}</TextSpanStyle>
    </SlideBlockStyle>
  );
};

export default SlideDealInfo;