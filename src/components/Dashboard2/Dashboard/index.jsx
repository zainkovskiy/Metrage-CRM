import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataDashboard } from '../../../store/dashboardSlice2';
import Loader from 'components/Main/Loader';
import * as S from './style';
import DashboardHeader from '../DashboardHeader';
import DashboardIndicators from '../DashboardIndicators';
import DashboardWiget from '../DashboardWiget';

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
          {data.components.map((chart, idx) => (
            <DashboardWiget {...chart} key={idx} />
          ))}
        </S.DashboardCharts>
      )}
    </S.Dashboard>
  );
};

export default Dashboard;
