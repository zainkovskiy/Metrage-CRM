import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import DefaultChartComponent from './DefaultChartComponent';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const ChartPie = ({ chart }) => {
  if (chart.length === 0) {
    return <DefaultChartComponent />;
  }
  if (!chart) {
    return <DefaultChartComponent />;
  }
  return (
    <ResponsiveContainer width='100%' height={250}>
      <PieChart>
        {/* <Tooltip /> */}
        <Legend
          wrapperStyle={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
        />
        <Pie
          data={chart || []}
          cx='50%'
          cy='50%'
          labelLine={true}
          label
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
          style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
        >
          {chart.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartPie;
