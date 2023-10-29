import React, { useState } from 'react';
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
const colorPie = {
  Avito: '#000',
  Cian: '#0368ff',
  Domclick: '#53b374',
  Yandex: '#fc3f1e',
};
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
        {/* <Legend /> */}
        <Tooltip content={<CustomToolTip />} />
        <Pie
          data={chart?.inCircle || []}
          dataKey='value'
          cx='50%'
          cy='50%'
          outerRadius={60}
          fill='#8884d8'
          // label
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
                console.log(item);
              }}
              key={item.name}
              fill={colorPie[item.name]}
              dataName='outside'
              style={{
                cursor: 'pointer',
                fontFamily: 'CeraCY, sans-serif',
                fontSize: 12,
              }}
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
