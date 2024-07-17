import React from 'react';
import { useSelector } from 'react-redux';
import BillBlock from './BillBlock';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useNumberTriad } from 'hooks/StringHook';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
} from 'recharts';

const BillExpenseChart = () => {
  const { bankCharts } = useSelector((state) => state.dds);
  return (
    <BillBlock title='Структура расходов' footer={bankCharts?.bankName}>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={bankCharts?.expenseData}
            cx='50%'
            cy='50%'
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            fill='#8884d8'
            paddingAngle={5}
            dataKey='value'
          >
            {bankCharts?.expenseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend
            wrapperStyle={{ fontFamily: 'CeraCY, sans-serif', fontSize: 12 }}
          />
          <Tooltip content={<CustomToolTip />} />
        </PieChart>
      </ResponsiveContainer>
    </BillBlock>
  );
};
const CustomToolTipStyle = styled.div`
  background-color: rgb(255 255 255 / 90%);
  padding: 0.5rem;
  border-radius: 5px;
`;
const CustomToolTip = (props) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    return (
      <CustomToolTipStyle>
        {payload.map((item) => (
          <React.Fragment key={`${item.name}+${item.payload.fill}`}>
            <TextSpanStyle color='#727272'>{item.name}</TextSpanStyle>
            <TextSpanStyle color={item.payload.fill} size={12}>
              Сумма: {useNumberTriad(item.payload.value)} руб.
            </TextSpanStyle>
          </React.Fragment>
        ))}
      </CustomToolTipStyle>
    );
  }

  return null;
};

export default BillExpenseChart;
