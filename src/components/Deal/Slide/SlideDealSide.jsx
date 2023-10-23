import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { SlideGridWrapper } from '../DealStyle';
import SlideContacFind from './SlideContacFind';
import { IconButton } from 'ui/IconButton';
import DialogWindow from 'components/Main/DialogWindow';

import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useNumberTriad } from 'hooks/StringHook';
import { CategoryTranslate } from '../keyTranslate';
import { ReactComponent as Plus } from 'images/plus.svg';

const FeatureTitle = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const FeatureSubTitle = styled(FeatureTitle)`
  font-size: 12px;
`;
const FeatureClientList = styled.div`
  border: 1px solid #ccc;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 5px;
  height: 150px;
  overflow: auto;
`;
const SlideDealSide = () => {
  const deal = useAsyncValue();
  const [contactFind, setFindContact] = useState(false);
  const toggleFindContact = () => {
    setFindContact(!contactFind);
  };
  return (
    <>
      <SlideGridWrapper>
        <SlideBlockStyle $column jc='space-between'>
          <Box column fullWidth ai='flex-start'>
            <FeatureTitle>Объект</FeatureTitle>
            <div>
              <TextSpanStyle size={12}>
                {deal?.objectParams?.street} {deal?.objectParams?.house}
              </TextSpanStyle>
              <TextSpanStyle size={10}>
                {deal?.objectParams?.city}
              </TextSpanStyle>
            </div>
            <div>
              <TextSpanStyle size={10}>
                Тип: {CategoryTranslate[deal?.objectParams?.Category]}
              </TextSpanStyle>
              <TextSpanStyle size={12}>
                Цена: {useNumberTriad(deal?.objectParams?.Price || '0')} руб.
              </TextSpanStyle>
            </div>
          </Box>
          <Box column fullWidth>
            <Box fullWidth>
              <FeatureSubTitle>
                Клиенты
                <IconButton onClick={toggleFindContact}>
                  <Plus />
                </IconButton>
              </FeatureSubTitle>
            </Box>
            <FeatureClientList />
          </Box>
        </SlideBlockStyle>
        <SlideBlockStyle $column jc='space-between'>
          <Box column fullWidth>
            <FeatureTitle>Заявка</FeatureTitle>
            <Box fullWidth ai='flex-start' column gap='0'>
              <TextSpanStyle size={12}>
                Заявка: {deal?.bidParams?.firstName || ''}
              </TextSpanStyle>
              <TextSpanStyle size={12}>
                Потребность: {deal?.bidParams?.type || ''}
              </TextSpanStyle>
            </Box>
          </Box>
          <Box column fullWidth>
            <Box fullWidth>
              <FeatureSubTitle>
                Клиенты
                <IconButton onClick={toggleFindContact}>
                  <Plus />
                </IconButton>
              </FeatureSubTitle>
            </Box>
            <FeatureClientList />
          </Box>
        </SlideBlockStyle>
      </SlideGridWrapper>
      <DialogWindow onClose={toggleFindContact} open={contactFind}>
        <SlideContacFind />
      </DialogWindow>
    </>
  );
};

export default SlideDealSide;
