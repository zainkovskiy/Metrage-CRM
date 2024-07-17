import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import { clearDDS, getBillData } from '../../store/slices/ddsSlice';
import BillRemaining from './BillRemaining';
import BillRemainsChart from './BillRemainsChart';
import BillExpenseChart from './BillExpenseChart';

const BillContainer = styled.div`
  overflow: auto;
  max-height: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const Bill = () => {
  const dispatch = useDispatch();
  const { loadingList, bankCharts } = useSelector((state) => state.dds);
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
  return (
    <BillContainer>
      <BillRemaining />
      {bankCharts?.remainsData?.length > 0 && <BillRemainsChart />}
      {bankCharts?.expenseData?.length > 0 && <BillExpenseChart />}
    </BillContainer>
  );
};

export default Bill;
