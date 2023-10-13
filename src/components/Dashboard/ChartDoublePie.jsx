import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import DefaultChartComponent from './DefaultChartComponent';

const ChartDoublePie = ({ chart }) => {
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
      <PieChart>
        <Tooltip />
        {/* <Legend /> */}
        <Pie
          data={chart?.inCircle || []}
          dataKey='value'
          cx='50%'
          cy='50%'
          outerRadius={60}
          fill='#8884d8'
        />
        <Pie
          data={chart?.outCircle || []}
          dataKey='value'
          cx='50%'
          cy='50%'
          innerRadius={70}
          outerRadius={90}
          fill='#82ca9d'
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default ChartDoublePie;
