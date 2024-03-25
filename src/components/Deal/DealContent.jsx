import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
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
  width: 100%;
  box-sizing: border-box;
  @media ${device.tablet} {
    padding: 0;
    gap: 0;
  }
`;
const DefaultError = styled.div``;

const DealContent = () => {
  const dispatch = useDispatch();
  const viewCard = useSelector((state) => state.deal.viewCard);
  const location = useLocation();

  useEffect(() => {
    getDeals();
    return () => {
      dispatch(clearDeals());
    };
  }, []);

  const getDeals = () => {
    dispatch(getDealList(location?.state));
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
