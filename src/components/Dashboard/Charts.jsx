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
`;
const Charts = () => {
  const dashboard = useSelector((state) => state.dashboard.data);
  console.log(dashboard);
  return (
    <ChartBarStyle>
      <ChartItem chart={dashboard?.clients || null} type='bar' />
      <ChartItem chart={dashboard?.demands || null} type='bar' />
      <ChartItem chart={dashboard?.sources || null} type='pie' />
    </ChartBarStyle>
  );
};

export default Charts;
