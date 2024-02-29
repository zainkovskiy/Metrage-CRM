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
import { useNavigate } from 'react-router-dom';

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
        key={area.name}
        type='monotone'
        dataKey={area.name}
        name={area.name}
        stroke={area.color}
        fill={area.color}
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
          tick={<CustomizedAxisTick chart={chart?.values || []} />}
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

const AxisTick = styled.g`
  ${({ $isButton }) => $isButton && 'cursor: pointer;'};
  transition: opacity 0.3s;
  @media (hover: hover) {
    &:hover {
      ${({ $isButton }) => $isButton && 'opacity: 0.5;'};
    }
    &:active {
      ${({ $isButton }) => $isButton && 'opacity: 1;'};
    }
  }
`;
const CustomizedAxisTick = ({ x, y, chart, payload }) => {
  const navigate = useNavigate();

  const getIsFilter = () => {
    const find = isFind();
    if (find && find?.filter) {
      return true;
    }
    return false;
  };
  const isFind = () => {
    return chart.find((item) => item.name === payload.value);
  };
  const handleClick = () => {
    const find = isFind();
    if (find && find?.filter) {
      navigate('/objects', { state: { ...find.filter } });
    }
  };
  return (
    <AxisTick
      transform={`translate(${x},${y})`}
      $isButton={getIsFilter()}
      onClick={handleClick}
    >
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
    </AxisTick>
  );
};
export default ChartArea;
