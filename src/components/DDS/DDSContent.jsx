import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { device } from 'styles/device';
import styled from 'styled-components';
import DDSFilter from './DDSFilter';
import { clearDDS, getDDSData } from '../../store/slices/ddsSlice';
import DDS from './DDS';
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

const DealContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getDDS();
    return () => {
      dispatch(clearDDS());
    };
  }, []);

  const getDDS = () => {
    dispatch(getDDSData());
  };
  return (
    <DealContentStyle>
      <DDSFilter />
      <DDS />
      <Outlet />
    </DealContentStyle>
  );
};

export default DealContent;
