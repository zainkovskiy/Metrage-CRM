import React from 'react';
import styled from 'styled-components';
import ChartArea from './ChartArea';
import ChartSankey from './ChartSankey';
import ChartPie from './ChartPie';
import ChartDoublePie from './ChartDoublePie';
import { TextSpanStyle } from '../../styles/styles';
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
const ChartItem = ({ chart }) => {
  if (!chart) {
    return;
  }
  const getChartComponent = () => {
    switch (chart?.graphName) {
      case 'PieChart':
        return ChartPie;
      case 'SankeyChart':
        return ChartSankey;
      case 'AreaChart':
        return ChartArea;
      case 'doublePieChart':
        return ChartDoublePie;
      default:
        return DefaultComponent;
    }
  };
  const ChartComponent = getChartComponent();
  return (
    <ChartItemStyle>
      <TextSpanStyleBorder align='end'>
        {chart?.title || ''}
      </TextSpanStyleBorder>
      <ChartComponent chart={chart?.data || []} />
      {chart?.rangeTitle && (
        <ButtonLink size={12} color='#727272'>
          {chart?.rangeTitle || ''}
        </ButtonLink>
      )}
    </ChartItemStyle>
  );
};
const DefaultComponent = () => {
  return <div style={{ height: 250 }} />;
};
export default ChartItem;
