import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Applications from './Applications';
import ApplicationsTable from './ApplicationsTable';
import ApplicationFilter from './ApplicationFilter';
import { device } from 'styles/device';
import {
  getApplicationFilterList,
  clearApplication,
} from 'store/applicationSlice';

const ApplicationContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  @media ${device.tablet} {
    padding: 0;
    gap: 0;
  }
`;
const DefaultError = styled.div``;

const ApplicationContent = () => {
  const viewCard = useSelector((state) => state.application.viewCard);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    getList();
    return () => {
      dispatch(clearApplication());
    };
  }, []);
  const getList = () => {
    dispatch(getApplicationFilterList(location?.state));
  };
  const getApplicationComponent = () => {
    switch (viewCard) {
      case 'cell':
        return Applications;
      case 'table':
        return ApplicationsTable;
      default:
        return DefaultError;
    }
  };
  const ApplicationComponent = getApplicationComponent();
  return (
    <ApplicationContentStyle>
      <ApplicationFilter />
      <ApplicationComponent />
      <Outlet />
    </ApplicationContentStyle>
  );
};

export default ApplicationContent;
