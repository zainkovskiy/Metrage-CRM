import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

const ChartTwoPie = ({ chart }) => {
  console.log(chart);
  return (
    <ResponsiveContainer width='100%' height={250}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey='value'
          data={chart.inCircle}
          cx='35%'
          cy='60%'
          innerRadius={40}
          outerRadius={80}
          fill='#8884d8'
          label
          style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
        />
        <Pie
          dataKey='value'
          data={chart.outCircle}
          cx={220}
          cy={80}
          innerRadius={40}
          outerRadius={80}
          fill='#82ca9d'
          style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
        />
        <Tooltip content={<CustomToolTip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};
const CustomLegend = (props) => {
  console.log(props);
  return (
    <div
      class='recharts-legend-wrapper'
      style={{ fontFamily: 'CeraCY, sans-serif', fontSize: '12px' }}
    >
      <ul
        class='recharts-default-legend'
        style={{
          padding: '0px',
          margin: '0px',
          listStyle: 'none',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <li
          class='recharts-legend-item legend-item-1'
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            marginRight: '10px',
          }}
        >
          <svg
            class='recharts-surface'
            width='14'
            height='14'
            viewBox='0 0 32 32'
          >
            <title></title>
            <desc></desc>
            <path
              stroke='none'
              fill='#8884d8'
              d='M0,4h32v24h-32z'
              class='recharts-legend-icon'
            ></path>
          </svg>
          <span class='recharts-legend-item-text' style={{ color: '#8884d8' }}>
            Коммерция
          </span>
        </li>
        <li
          class='recharts-legend-item legend-item-0'
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            marginRight: '10px',
          }}
        >
          <svg
            class='recharts-surface'
            width='14'
            height='14'
            viewBox='0 0 32 32'
          >
            <title></title>
            <desc></desc>
            <path
              stroke='none'
              fill='#82ca9d'
              d='M0,4h32v24h-32z'
              class='recharts-legend-icon'
            ></path>
          </svg>
          <span class='recharts-legend-item-text' style={{ color: '#82ca9d' }}>
            Жилая
          </span>
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

<div
  class='recharts-legend-wrapper'
  style='position: absolute; width: 388px; height: auto; left: 5px; bottom: 5px; font-family: CeraCY, sans-serif; font-size: 12px;'
>
  <ul
    class='recharts-default-legend'
    style='padding: 0px; margin: 0px; text-align: center;'
  >
    <li
      class='recharts-legend-item legend-item-0'
      style='display: inline-block; margin-right: 10px;'
    >
      <svg
        class='recharts-surface'
        width='14'
        height='14'
        viewBox='0 0 32 32'
        style='display: inline-block; vertical-align: middle; margin-right: 4px;'
      >
        <title></title>
        <desc></desc>
        <path
          stroke='none'
          fill='#82ca9d'
          d='M0,4h32v24h-32z'
          class='recharts-legend-icon'
        ></path>
      </svg>
      <span
        class='recharts-legend-item-text'
        style='color: rgb(130, 202, 157);'
      >
        Первичный
      </span>
    </li>
    <li
      class='recharts-legend-item legend-item-1'
      style='display: inline-block; margin-right: 10px;'
    >
      <svg
        class='recharts-surface'
        width='14'
        height='14'
        viewBox='0 0 32 32'
        style='display: inline-block; vertical-align: middle; margin-right: 4px;'
      >
        <title></title>
        <desc></desc>
        <path
          stroke='none'
          fill='#8884d8'
          d='M0,4h32v24h-32z'
          class='recharts-legend-icon'
        ></path>
      </svg>
      <span
        class='recharts-legend-item-text'
        style='color: rgb(136, 132, 216);'
      >
        Вторичный
      </span>
    </li>
  </ul>
</div>;
