import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { device } from 'styles/device';
import styled from 'styled-components';
import DDSFilter from './DDSFilter';
import DDS from './DDS';
import Bill from './Bill';
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
  const { mode } = useSelector((state) => state.dds);
  return (
    <DealContentStyle>
      <DDSFilter />
      {mode === 'dds' && <DDS />}
      {mode === 'bill' && <Bill />}
      <Outlet />
    </DealContentStyle>
  );
};

export default DealContent;
