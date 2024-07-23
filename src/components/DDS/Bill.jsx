import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import {
  clearDDS,
  getBillData,
  setReportFilter,
} from '../../store/slices/ddsSlice';
import BillRemaining from './BillRemaining';
import BillRemainsChart from './BillRemainsChart';
import BillExpenseChart from './BillExpenseChart';
import { InputUI } from 'ui/InputUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';

const BillContainer = styled.div`
  overflow: auto;
  flex-grow: 1;
  padding: 0.5rem;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const ReportFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #f9f5f5;
  border-radius: 5px;
  box-sizing: border-box;
  flex-wrap: wrap;
`;
const Bill = () => {
  const dispatch = useDispatch();
  const { loadingList, bankCharts, reportFilter } = useSelector(
    (state) => state.dds
  );
  useEffect(() => {
    getBill();
    return () => {
      dispatch(clearDDS());
    };
  }, []);
  const getBill = () => {
    dispatch(getBillData());
  };
  if (loadingList) {
    return <Loader />;
  }
  const handleChange = (value, key) => {
    dispatch(
      setReportFilter({
        value: value,
        key: key,
      })
    );
  };
  return (
    <>
      <ReportFilter>
        <SelectUI
          onChange={(newValue) => {
            handleChange(newValue, 'period');
          }}
          select={reportFilter.period}
          label='Период:'
          small
          width='150px'
        >
          <SelectItemUI value='thisMonth'>Текущий месяц</SelectItemUI>
          <SelectItemUI value='oldMonth'>Прошлый месяц</SelectItemUI>
          <SelectItemUI value='range'>Диапазон</SelectItemUI>
        </SelectUI>
        <InputUI
          label='От:'
          small
          value={reportFilter.from}
          onChange={(e) => {
            handleChange(e.target.value, 'from');
          }}
          type='date'
          disabled={reportFilter.period !== 'range'}
        />
        <InputUI
          label='До:'
          small
          value={reportFilter.to}
          onChange={(e) => {
            handleChange(e.target.value, 'to');
          }}
          type='date'
          disabled={reportFilter.period !== 'range'}
        />
      </ReportFilter>
      <BillContainer>
        <BillRemaining />
        {bankCharts?.remainsData?.length > 0 && <BillRemainsChart />}
        {bankCharts?.expenseData?.length > 0 && <BillExpenseChart />}
      </BillContainer>
    </>
  );
};

export default Bill;
