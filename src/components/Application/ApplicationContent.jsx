import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskList, toggleNewTask } from 'store/taskSlice';
import Loader from "components/Main/Loader";
import Tasks from './Tasks';
import TaskFilter from './TaskFilter';
import { Outlet } from 'react-router-dom';

const ApplicationContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`
const ApplicationContent = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.task.loading);
  // const isShowNewTask = useSelector((state) => state.task.isShowNewTask);
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      dispatch(getTaskList(firstUpdate.current));
      firstUpdate.current = false;
    }
  }, [])
  // const handleOpenNewTask = () => {
  //   dispatch(toggleNewTask())
  // }
  return (
    <ApplicationContentStyle>
      {
        loading ?
          <Loader /> :
          <>
            <TaskFilter />
            <Tasks />
            <Outlet/>
          </>
      }
    </ApplicationContentStyle>
  );
};

export default ApplicationContent;