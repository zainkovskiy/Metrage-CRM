import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Main/Loader';
import Dashboard from './Dashboard';
import { clearDashboard, getChartList } from '../../store/dashboardSlice';

const DashboardContent = () => {
  const firstMount = useRef(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.dashboard.loading);

  useEffect(() => {
    getList();
    return () => {
      dispatch(clearDashboard());
    };
  }, []);

  const getList = () => {
    dispatch(getChartList());
  };

  if (loading) {
    return <Loader />;
  }
  return <Dashboard />;
};

export default DashboardContent;
