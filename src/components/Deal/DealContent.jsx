import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { device } from 'styles/device';
import styled from 'styled-components';
import DealFilter from './DealFilter';
import Deals from './Deals';
import DealTable from './DealTable';
import { getDealList, clearDeals } from 'store/dealSlice';
const DealContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  @media ${device.tablet} {
    padding: 0;
    gap: 0;
  }
`;
const DefaultError = styled.div``;

const DealContent = () => {
  const dispatch = useDispatch();
  const viewCard = useSelector((state) => state.deal.viewCard);

  useEffect(() => {
    getDeals();
    return () => {
      dispatch(clearDeals());
    };
  }, []);

  const getDeals = () => {
    dispatch(getDealList());
  };
  const getDealComponent = () => {
    switch (viewCard) {
      case 'cell':
        return Deals;
      case 'table':
        return DealTable;
      default:
        return DefaultError;
    }
  };
  const DealComponent = getDealComponent();
  return (
    <DealContentStyle>
      <DealFilter />
      <DealComponent />
      <Outlet />
    </DealContentStyle>
  );
};

export default DealContent;
