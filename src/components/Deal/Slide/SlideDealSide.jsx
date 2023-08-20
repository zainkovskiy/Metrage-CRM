import React from 'react';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { SlideGridWrapper } from '../DealStyle';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useAsyncValue } from 'react-router-dom';
import { useNumberTriad } from 'hooks/StringHook';
import { CategoryTranslate } from '../keyTranslate';

const FeatureTitle = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const SlideParticipants = styled.div`
  border: 1px solid #ccc;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 5px;
  height: 150px;
  overflow: auto;
`
const SlideParticipantsText = styled(TextSpanStyle)`
  text-overflow: ellipsis;
  overflow: hidden;
`
const SlideDealSide = () => {
  const deal = useAsyncValue();
  return (
    <SlideGridWrapper>
      <SlideBlockStyle $column jc='flex-start'>
        <FeatureTitle>Объект</FeatureTitle>
        <Box fullWidth ai='flex-start' column>
          <div>
            <TextSpanStyle size={12}>{deal?.objectParams?.street} {deal?.objectParams?.house}</TextSpanStyle>
            <TextSpanStyle size={10}>{deal?.objectParams?.city}</TextSpanStyle>
          </div>
          <div>
            <TextSpanStyle size={10}>Тип: {CategoryTranslate[deal?.objectParams?.Category]}</TextSpanStyle>
            <TextSpanStyle size={12}>Цена: {useNumberTriad(deal?.objectParams?.Price)} руб.</TextSpanStyle>
          </div>
        </Box>
      </SlideBlockStyle>
      <SlideBlockStyle $column jc='flex-start'>
        <FeatureTitle>Сделка</FeatureTitle>
        <Box fullWidth jc='flex-start'>
          <TextSpanStyle size={12}>{deal?.bidParams?.firstName}</TextSpanStyle>
        </Box>
      </SlideBlockStyle>
    </SlideGridWrapper>
  );
};

export default SlideDealSide;