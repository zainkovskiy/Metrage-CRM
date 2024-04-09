import React from 'react';
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from 'recharts';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, name, value } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      // fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
      fontSize='12px'
      fontFamily='CeraCY, sans-serif'
    >
      {`${name} ${value}`}
    </text>
  );
};
const ChartTwoPie = ({ chart }) => {
  return (
    <ResponsiveContainer width='100%' height={250}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey='value'
          data={chart.inCircle}
          cx='25%'
          cy='60%'
          innerRadius={40}
          outerRadius={80}
          fill='#8884d8'
          label={renderCustomizedLabel}
          labelLine={false}
          style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
        />
        <Pie
          dataKey='value'
          data={chart.outCircle}
          cx={'75%'}
          cy={80}
          innerRadius={40}
          outerRadius={80}
          fill='#82ca9d'
          style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
          label={renderCustomizedLabel}
          labelLine={false}
        />
        <Tooltip content={<CustomToolTip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};
const CustomLegend = (props) => {
  return (
    <div style={{ fontFamily: 'CeraCY, sans-serif', fontSize: '12px' }}>
      <ul
        style={{
          padding: '0px',
          margin: '0px',
          listStyle: 'none',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            marginRight: '10px',
          }}
        >
          <svg width='14' height='14' viewBox='0 0 32 32'>
            <title></title>
            <desc></desc>
            <path stroke='none' fill='#8884d8' d='M0,4h32v24h-32z'></path>
          </svg>
          <span style={{ color: '#8884d8' }}>Коммерция</span>
        </li>
        <li
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            marginRight: '10px',
          }}
        >
          <svg width='14' height='14' viewBox='0 0 32 32'>
            <title></title>
            <desc></desc>
            <path stroke='none' fill='#82ca9d' d='M0,4h32v24h-32z'></path>
          </svg>
          <span style={{ color: '#82ca9d' }}>Жилая</span>
        </li>
      </ul>
    </div>
  );
};
const CustomToolTipStyle = styled.div`
  background-color: rgb(255 255 255 / 90%);
  padding: 0.5rem;
  border-radius: 5px;
`;
const CustomToolTip = ({ active, payload }) => {
  if (payload[0]?.payload?.dataName === 'outside') {
    return;
  }
  if (active && payload && payload.length) {
    return (
      <CustomToolTipStyle>
        {payload.map((item, idx) => (
          <TextSpanStyle key={item.name + idx} size={12}>
            {item.name}: {item.value}
          </TextSpanStyle>
        ))}
      </CustomToolTipStyle>
    );
  }

  return null;
};
export default ChartTwoPie;
