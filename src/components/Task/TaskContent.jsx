import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { device } from 'styles/device';
import Task from './Task';
import TaskFilter from './TaskFilter';
import { clearTasks, getTaskList } from '../../store/taskSlice';

const TaskContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  @media ${device.tablet} {
    padding: 0;
    gap: 0;
  }
`;
const TaskContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getTasks();
    return () => {
      dispatch(clearTasks());
    };
  }, []);
  const getTasks = () => {
    dispatch(getTaskList());
  };
  return (
    <TaskContentStyle>
      <TaskFilter />
      <Task />
      <Outlet />
    </TaskContentStyle>
  );
};

export default TaskContent;
