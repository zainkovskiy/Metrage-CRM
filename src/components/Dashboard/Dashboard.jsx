import React from 'react';
import { useSelector } from 'react-redux';
import MainInfo from './MainInfo';
import styled from 'styled-components';
import Charts from './Charts';

const DashboardStyle = styled.div`
  width: 100%;
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const Dashboard = () => {
  const dashboard = useSelector((state) => state.dashboard.data);
  // console.log(dashboard);
  return (
    <DashboardStyle>
      <MainInfo />
      <Charts />
    </DashboardStyle>
  );
};

export default Dashboard;
