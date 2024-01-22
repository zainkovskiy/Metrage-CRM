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

const areaColor = ['#82ca9d', '#ffa2a2'];

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
  const getAreaLine = () => {
    const areaLines = chart.valuesName.map((area, idx) => (
      <Area
        key={area}
        type='monotone'
        dataKey={area}
        name={area}
        stroke={areaColor[idx]}
        fill={areaColor[idx]}
        dataValue='active'
        // opacity={opacity.active}
      />
    ));
    return areaLines;
  };
  return (
    <ResponsiveContainer width='100%' height={250}>
      <AreaChart
        data={chart.values}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 40,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          dataKey='name'
          type='category'
          style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
          tick={<CustomizedAxisTick />}
        />
        <YAxis
          type='number'
          style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
        />
        <Tooltip content={<CustomToolTip />} />
        <Legend
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          wrapperStyle={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
          verticalAlign='top'
        />
        {getAreaLine()}
        {/* <Area
          type='monotone'
          dataKey='fv'
          stroke='#01ff3e'
          fill='#01ff3e'
          dataValue='active'
          opacity={opacity.active}
        />
        <Area
          type='monotone'
          dataKey='sv'
          stroke='#ffa2a2'
          fill='#ffa2a2'
          dataValue='failure'
          opacity={opacity.failure}
        /> */}
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
const CustomizedAxisTick = ({ x, y, stroke, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor='end'
        fill='#666'
        transform='rotate(-45)'
        fontSize={12}
        fontFamily='CeraCY, sans-serif'
      >
        {payload.value}
      </text>
    </g>
  );
};
export default ChartArea;
