import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import DefaultChartComponent from './DefaultChartComponent';

const ChartArea = ({ chart }) => {
  if (chart.length === 0) {
    return <DefaultChartComponent />;
  }
  if (!chart) {
    return <DefaultChartComponent />;
  }
  return (
    <ResponsiveContainer width='100%' height={250}>
      <AreaChart
        data={chart}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type='monotone'
          dataKey='Активные'
          stroke='#8884d8'
          fill='#8884d8'
        />
        <Area type='monotone' dataKey='Срыв' stroke='#82ca9d' fill='#82ca9d' />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ChartArea;
