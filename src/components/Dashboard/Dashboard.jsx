import React from 'react';
import MainInfo from './MainInfo';
import styled from 'styled-components';
import Charts from './Charts';
import SourceChart from './SourceChart';
import { device } from '../../styles/device';
import { useWindowSize } from 'hooks/windowSize';

const DashboardStyle = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem;
  gap: 0.5rem;
  box-sizing: border-box;
  @media (${device.tablet}) {
    flex-wrap: wrap;
    overflow: auto;
  }
`;

const Dashboard = () => {
  const windowSize = useWindowSize();
  return (
    <DashboardStyle>
      <MainInfo />
      <Charts />
      {windowSize > 768 && <SourceChart />}
    </DashboardStyle>
  );
};

export default Dashboard;
