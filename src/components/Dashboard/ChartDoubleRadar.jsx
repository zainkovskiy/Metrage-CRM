import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const ChartDoubleRadar = ({ chart }) => {
  return (
    <ResponsiveContainer width='100%' height={250}>
      <RadarChart cx='50%' cy='50%' outerRadius='80%' data={chart}>
        <PolarGrid />
        <PolarAngleAxis dataKey='name' />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name='Активные'
          dataKey='Активные'
          stroke='#8884d8'
          fill='#8884d8'
          fillOpacity={0.6}
        />
        <Radar
          name='Срыв'
          dataKey='Срыв'
          stroke='#82ca9d'
          fill='#82ca9d'
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default ChartDoubleRadar;
