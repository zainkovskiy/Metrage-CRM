import React from 'react';
import { ResponsiveContainer, Sankey, Tooltip, Legend } from 'recharts';
import DefaultChartComponent from './DefaultChartComponent';

const ChartSankey = ({ chart }) => {
  if (Array.isArray(chart)) {
    return <DefaultChartComponent />;
  }
  if (JSON.stringify(chart) === '{}') {
    return <DefaultChartComponent />;
  }
  if (!chart) {
    return <DefaultChartComponent />;
  }
  return (
    <ResponsiveContainer width='100%' height={250}>
      <Sankey data={chart} nodePadding={50} link={{ stroke: '#77c878' }}>
        <Legend />
        <Tooltip />
      </Sankey>
    </ResponsiveContainer>
  );
};
const data = {
  nodes: [
    {
      name: 'Visit',
    },
    {
      name: 'Direct-Favourite',
    },
    {
      name: 'Page-Click',
    },
    {
      name: 'Detail-Favourite',
    },
    {
      name: 'Lost',
    },
  ],
  links: [
    {
      source: 0,
      target: 1,
      value: 57,
    },
    {
      source: 0,
      target: 2,
      value: 1,
    },
    {
      source: 2,
      target: 3,
      value: 62429,
    },
    {
      source: 2,
      target: 4,
      value: 291741,
    },
  ],
};
export default ChartSankey;
