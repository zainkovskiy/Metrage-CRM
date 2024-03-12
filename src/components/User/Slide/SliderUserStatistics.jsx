import React from 'react';
import { Link, useAsyncValue } from 'react-router-dom';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import SlideUserTable from './SlideUserTable';

const StatisticGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.5rem;
`;

const SliderUserStatistics = () => {
  const user = useAsyncValue();
  return (
    <SliderBlock>
      <Box fullWidth gap='0.5rem' ai='normal' column>
        <SliderTitle>Статистика</SliderTitle>
        <StatisticGridContainer>
          <Box jc='flex-start'>
            <TextSpanStyle size={12} bold>
              Последняя активность:{' '}
            </TextSpanStyle>
            <TextSpanStyle size={12}>
              {user?.statistics?.lastActivity || ''}
            </TextSpanStyle>
          </Box>
          <Box jc='flex-start'>
            <TextSpanStyle size={12} bold>
              Самый новый объект:{' '}
            </TextSpanStyle>
            <TextSpanStyle size={12}>
              {user?.statistics?.lastNewObject || ''}
            </TextSpanStyle>
          </Box>
        </StatisticGridContainer>
        <StatisticGridContainer>
          <Box jc='flex-start'>
            <TextSpanStyle size={12} bold>
              Последняя сделка:{' '}
            </TextSpanStyle>
            <TextSpanStyle size={12}>
              {user?.statistics?.lastDeal || ''}
            </TextSpanStyle>
          </Box>
          <Box jc='flex-start'>
            <TextSpanStyle size={12} bold>
              Следующая сделка:{' '}
            </TextSpanStyle>
            <TextSpanStyle size={12}>
              {user?.statistics?.nextDeal || ''}
            </TextSpanStyle>
          </Box>
        </StatisticGridContainer>
        <StatisticGridContainer>
          <SlideUserTable
            header={user?.statistics?.objectLines || []}
            body={user?.statistics?.objects || []}
            path='/objects'
          />
          <SlideUserTable
            header={user?.statistics?.demandsLines || []}
            body={user?.statistics?.demands || []}
            path='/application'
          />
          <SlideUserTable
            header={user?.statistics?.dealLines || []}
            body={user?.statistics?.deals || []}
            path='/deal'
          />
        </StatisticGridContainer>
      </Box>
    </SliderBlock>
  );
};

export default SliderUserStatistics;
