import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ChartItem from './ChartItem';

const ChartBarStyle = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-auto-rows: min-content;
  gap: 0.5rem;
  overflow: auto;
`;
const Charts = () => {
  const dashboard = useSelector((state) => state.dashboard.data);
  return (
    <ChartBarStyle>
      <ChartItem chart={dashboard?.clients || null} />
      <ChartItem chart={dashboard?.demands || null} />
      <ChartItem chart={dashboard?.sources || null} />
      <ChartItem chart={dashboard?.objects || null} />
      <ChartItem chart={dashboard?.dealsProfit || null} />
    </ChartBarStyle>
  );
};

export default Charts;
