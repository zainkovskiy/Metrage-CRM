import React, { useState } from 'react';
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
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';

const ChartArea = ({ chart }) => {
  const [opacity, setOpacity] = useState({ active: 1, failure: 1 });
  if (chart.length === 0) {
    return <DefaultChartComponent />;
  }
  if (!chart) {
    return <DefaultChartComponent />;
  }
  const handleMouseEnter = (e) => {
    setOpacity((prevState) => ({
      ...prevState,
      [e.payload.dataValue]: 0.5,
    }));
  };
  const handleMouseLeave = (e) => {
    setOpacity((prevState) => ({
      ...prevState,
      [e.payload.dataValue]: 1,
    }));
  };
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
        <XAxis
          dataKey='name'
          style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
        />
        <YAxis style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }} />
        <Tooltip content={<CustomToolTip />} />
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          wrapperStyle={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
        />
        <Area
          type='monotone'
          dataKey='Активные'
          stroke='#8884d8'
          fill='#8884d8'
          dataValue='active'
          opacity={opacity.active}
        />
        <Area
          type='monotone'
          dataKey='Срыв'
          stroke='#82ca9d'
          fill='#82ca9d'
          dataValue='failure'
          opacity={opacity.failure}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
const CustomToolTipStyle = styled.div`
  background-color: rgb(255 255 255 / 90%);
  padding: 0.5rem;
  border-radius: 5px;
`;
const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <CustomToolTipStyle>
        <TextSpanStyle color='#727272'>{label}</TextSpanStyle>
        {payload.map((item) => (
          <TextSpanStyle key={item.color} color={item.color} size={12}>
            {item.name}: {item.payload[item.name]}
          </TextSpanStyle>
        ))}
      </CustomToolTipStyle>
    );
  }

  return null;
};

export default ChartArea;
