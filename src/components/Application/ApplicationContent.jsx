import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
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
  @media ${device.tablet} {
    padding: 0;
    gap: 0;
  }
`;
const DefaultError = styled.div``;

const ApplicationContent = () => {
  const viewCard = useSelector((state) => state.application.viewCard);
  const dispatch = useDispatch();
  useEffect(() => {
    getList();
    return () => {
      dispatch(clearApplication());
    };
  }, []);
  const getList = () => {
    dispatch(getApplicationFilterList());
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
      {/* <Applications /> */}
      <Outlet />
    </ApplicationContentStyle>
  );
};

export default ApplicationContent;
