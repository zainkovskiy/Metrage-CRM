import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Tasks from './Tasks';
import TaskFilter from './TaskFilter';
import { Outlet } from 'react-router-dom';
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
  const firstMount = useRef(true);
  const dispatch = useDispatch();
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