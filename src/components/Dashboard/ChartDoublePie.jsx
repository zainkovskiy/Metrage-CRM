import React, { useRef, useState } from 'react';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import DefaultChartComponent from './DefaultChartComponent';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const colorPie = {
  Avito: '#000',
  Cian: '#0368ff',
  Domclick: '#53b374',
  Yandex: '#fc3f1e',
};
const ChartDoublePie = ({ chart }) => {
  const navigate = useNavigate();
  if (Array.isArray(chart)) {
    return <DefaultChartComponent />;
  }
  if (JSON.stringify(chart) === '{}') {
    return <DefaultChartComponent />;
  }
  if (!chart) {
    return <DefaultChartComponent />;
  }
  const applyFilter = (piece) => {
    navigate('/objects', { state: piece.filter });
  };
  const handleMouseEnter = (e) => {
    if (e?.target?.style?.opacity) {
      e.target.style.opacity = 0.7;
    }
  };
  const handleMouseLeave = (e) => {
    if (e?.target?.style?.opacity) {
      e.target.style.opacity = 1;
    }
  };
  return (
    <ResponsiveContainer width='100%' height={250}>
      <PieChart>
        {/* <Legend /> */}
        <Tooltip content={<CustomToolTip />} />
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
          label={(props) => `${props.payload.name} ${props.payload.value}`}
          style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
        >
          {chart.outCircle.map((item) => (
            <Cell
              onClick={() => {
                applyFilter(item);
              }}
              key={item.name}
              fill={colorPie[item.name]}
              dataName='outside'
              style={{
                cursor: 'pointer',
                fontFamily: 'CeraCY, sans-serif',
                fontSize: 12,
                opacity: 1,
                transition: 'opacity .3s',
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
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
export default ChartDoublePie;
