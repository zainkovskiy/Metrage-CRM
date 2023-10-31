import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { device } from 'styles/device';
import styled from 'styled-components';
import DealFilter from './DealFilter';
import Deals from './Deals';
import { getDealList, clearDeals } from 'store/dealSlice';
const DealContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
  @media ${device.tablet} {
    padding: 0;
    gap: 0;
  }
`;
const DealContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getDeals();
    return () => {
      dispatch(clearDeals());
    };
  }, []);

  const getDeals = () => {
    dispatch(getDealList());
  };
  return (
    <DealContentStyle>
      <DealFilter />
      <Deals />
      <Outlet />
    </DealContentStyle>
  );
};

export default DealContent;
