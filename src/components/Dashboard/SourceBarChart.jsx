import React from 'react';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  LabelList,
} from 'recharts';
import { TextSpanStyle } from '../../styles/styles';

const SourceBarChart = ({ barData, chartName }) => {
  return (
    <div>
      <TextSpanStyle size={12}>{chartName}</TextSpanStyle>
      <ResponsiveContainer width='100%' height={60}>
        <ComposedChart
          layout='vertical'
          width={500}
          height={400}
          data={barData}
        >
          <XAxis
            type='number'
            style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
          />
          <YAxis dataKey='name' type='category' scale='band' hide />
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Bar dataKey='Активные' barSize={20} fill='#82ca9d'>
            <LabelList
              dataKey='Активные'
              position='insideRight'
              style={{
                fontFamily: 'CeraCYBold, sans-serif',
                fontSize: 10,
                fill: '#fff',
              }}
            />
          </Bar>
          <Bar dataKey='Срыв' barSize={20} fill='red'>
            <LabelList
              dataKey='Срыв'
              position='insideRight'
              style={{
                fontFamily: 'CeraCYBold, sans-serif',
                fontSize: 10,
                fill: '#fff',
              }}
            />
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SourceBarChart;
