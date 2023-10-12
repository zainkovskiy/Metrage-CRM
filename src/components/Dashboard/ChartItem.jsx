import React from 'react';
import ChartBar from './ChartBar';
import ChartPie from './ChartPie';
import styled from 'styled-components';
import { TextSpanStyle } from '../../styles/styles';
import { SliderTitle } from '../../styles/slider';
import { ButtonLink } from '../../ui/ButtonLink/ButtonLink';

const ChartItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  // width: 300px;
  background-color: #f5f5f5;
  border-radius: 40px 0 40px 0;
`;
const TextSpanStyleBorder = styled(TextSpanStyle)`
  border-bottom: 1px solid black;
`;
const ChartItem = ({ chart, type }) => {
  if (!chart) {
    return;
  }
  return (
    <ChartItemStyle>
      <TextSpanStyleBorder align='end'>
        {chart?.title || ''}
      </TextSpanStyleBorder>
      {type === 'bar' && <ChartBar />}
      {type === 'pie' && <ChartPie />}
      <ButtonLink size={12} color='#727272'>
        {chart?.rangeTitle || ''}
      </ButtonLink>
    </ChartItemStyle>
  );
};

export default ChartItem;
