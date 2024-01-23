import React from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

const areaColor = ['#82ca9d', '#8884d8'];

const ChartBar = ({ chart }) => {
  const getBarLine = () => {
    const areaLines = chart.valuesName.map((bar, idx) => (
      <Bar dataKey={bar} fill={areaColor[idx]} key={bar}>
        <LabelList
          dataKey={bar}
          position='insideTop'
          style={{
            fontFamily: 'CeraCYBold, sans-serif',
            fontSize: 10,
            fill: '#fff',
          }}
        />
      </Bar>
    ));
    return areaLines;
  };
  return (
    <ResponsiveContainer width='100%' height={250}>
      <BarChart data={chart.values}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
          style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
        />
        <YAxis style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }} />
        <Tooltip content={<CustomToolTip />} />
        <Legend
          wrapperStyle={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
        />
        {getBarLine()}
      </BarChart>
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

export default ChartBar;
