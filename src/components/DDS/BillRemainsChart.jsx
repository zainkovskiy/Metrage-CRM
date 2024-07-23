import React from 'react';
import { useSelector } from 'react-redux';
import BillBlock from './BillBlock';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useNumberTriad } from 'hooks/StringHook';
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from 'recharts';

const gradientOffset = (data) => {
  const dataMax = Math.max(...data.map((i) => i.value));
  const dataMin = Math.min(...data.map((i) => i.value));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = (data) => {
  return gradientOffset(data);
};

const BillRemainsChart = () => {
  const { bankCharts } = useSelector((state) => state.dds);
  return (
    <BillBlock title='Деньги на счетах' footer={bankCharts?.bankName}>
      <ResponsiveContainer width='100%' height='100%'>
        <ComposedChart
          data={bankCharts?.remainsData}
          margin={{
            top: 0,
            right: 0,
            left: 10,
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
          <defs>
            <linearGradient id='splitColor' x1='0' y1='0' x2='0' y2='1'>
              <stop
                offset={off(bankCharts?.remainsData)}
                stopColor='green'
                stopOpacity={1}
              />
              <stop
                offset={off(bankCharts?.remainsData)}
                stopColor='red'
                stopOpacity={1}
              />
            </linearGradient>
          </defs>
          <Area
            type='monotone'
            dataKey='value'
            stroke=''
            fill='url(#splitColor)'
          />
          <Line
            type='monotone'
            strokeDasharray='5 5'
            dataKey='future'
            stroke='#8884d8'
            dot={false}
            activeDot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </BillBlock>
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
          <TextSpanStyle
            key={`${item.name}+${item.color}`}
            color={item.color}
            size={12}
          >
            Сумма: {useNumberTriad(item.payload[item.name])} руб.
          </TextSpanStyle>
        ))}
      </CustomToolTipStyle>
    );
  }

  return null;
};

export default BillRemainsChart;
