import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Tasks from './Tasks';
import TaskFilter from './TaskFilter';
import { Outlet, useLocation, useMatch } from 'react-router-dom';
import { device } from 'styles/device';
import { getApplicationList, clearApplication } from 'store/applicationSlice';
import { useDispatch } from 'react-redux';

const ApplicationContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
  @media ${device.tablet}{
    padding: 0;
    gap: 0;
  }
`
const ApplicationContent = () => {
  const locationRef = useRef(null);
  const firstMount = useRef(true);
  const dispatch = useDispatch();
  const match = useMatch('/')
  const location = useLocation();

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      locationRef.current = location;
      return
    }
    if (locationRef.current.pathname === location.pathname) {
      return
    }
    locationRef.current = location;
    if (match) {
      getList();
    }
  }, [location])

  useEffect(() => {
    getList();
    return () => {
      dispatch(clearApplication());
    }
  }, [])
  const getList = () => {
    dispatch(getApplicationList());
  }
  return (
    <ApplicationContentStyle>
      <TaskFilter />
      <Tasks firstMount={firstMount.current} />
      <Outlet />
    </ApplicationContentStyle>
  );
};

export default ApplicationContent;