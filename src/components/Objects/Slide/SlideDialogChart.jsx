import React, { useEffect, useState } from 'react';
import { getChartView } from '../../../api/objectAPI';
import { useAsyncValue } from 'react-router-dom';
import Loader from 'components/Main/Loader';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import styled from 'styled-components';
import { useDateFormat } from '../../../hooks/DateFormat';

const Container = styled.div`
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const SlideDialogChartStyle = styled.div`
  width: 100%;
`;

const transletePayload = {
  views: 'Просмотры',
  communications: 'Коммуникация',
};

const SlideDialogChart = () => {
  const object = useAsyncValue();
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [interval, setInterval] = useState([0, 7]);

  useEffect(() => {
    getDataChart();
  }, []);

  const getDataChart = () => {
    getChartView({
      UID: object.UID,
      type: object.typeEstate,
      platform: '',
    })
      .then((data) => {
        setChartData(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const prevData = () => {
    setInterval([interval[0] - 7, interval[1] - 7]);
  };
  const nextData = () => {
    setInterval([interval[0] + 7, interval[1] + 7]);
  };
  const legendFormat = (value) => {
    return <span>{transletePayload[value]}</span>;
  };
  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }
  if (!chartData?.graphData || chartData?.graphData?.length === 0) {
    return (
      <Container>
        <TextSpanStyle>no data</TextSpanStyle>
      </Container>
    );
  }
  return (
    <SlideDialogChartStyle>
      <ResponsiveContainer width='100%' height={250}>
        <BarChart
          data={chartData?.graphData.slice(interval[0], interval[1])}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
            dataKey={(key) => {
              return useDateFormat(key.date, 'DD.MM.YYYY');
            }}
          />
          <YAxis style={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }} />
          <Tooltip content={<CustomToolTip />} />
          <Legend
            formatter={legendFormat}
            wrapperStyle={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
          />
          <Bar dataKey='communications' fill='#8884d8' />
          <Bar dataKey='views' fill='#82ca9d' />
          {chartData?.maxViews && (
            <ReferenceLine
              y={chartData?.maxViews}
              label='Max'
              stroke='red'
              strokeDasharray='3 3'
            />
          )}
        </BarChart>
      </ResponsiveContainer>
      <Box fullWidth jc='flex-end'>
        <ButtonUI disabled={interval[0] <= 0} onClick={prevData} size='small'>
          Назад
        </ButtonUI>
        <ButtonUI
          size='small'
          disabled={interval[1] >= chartData.graphData.length}
          onClick={nextData}
        >
          Дальше
        </ButtonUI>
      </Box>
    </SlideDialogChartStyle>
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
            {transletePayload[item.name]}: {item.value}
          </TextSpanStyle>
        ))}
      </CustomToolTipStyle>
    );
  }
};

export default SlideDialogChart;
// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//   },
// ];
