import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataDashboard } from '../../../store/dashboardSlice2';
import Loader from 'components/Main/Loader';
import * as S from './style';
import DashboardHeader from '../DashboardHeader';
import DashboardIndicators from '../DashboardIndicators';
import DashboardTrand from '../DashboardTrand';
import DashboardCounter from '../DashboardCounter';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.dashboard2);
  useEffect(() => {
    getDashboard();
  }, []);
  const getDashboard = () => {
    dispatch(getDataDashboard());
  };
  if (loading) return <Loader />;
  return (
    <S.Dashboard>
      <DashboardHeader />
      <DashboardIndicators />
      {data.components.length > 0 && (
        <S.DashboardCharts>
          {data.components.map((chart, idx) => {
            if (chart.typeComponent === 'trand') {
              return <DashboardTrand {...chart} key={idx} />;
            }
            if (chart.typeComponent === 'counter') {
              return <DashboardCounter {...chart} key={idx} />;
            }
            return;
          })}
        </S.DashboardCharts>
      )}
    </S.Dashboard>
  );
};

export default Dashboard;
