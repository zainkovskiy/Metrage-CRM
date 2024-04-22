import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { device } from 'styles/device';
import Task from './Task';
import TaskFilter from './TaskFilter';
import { clearTasks, getTaskList, setViewCard } from '../../store/taskSlice';
import { useWindowSize } from 'hooks/windowSize';

const TaskContentStyle = styled.div`
  width: 100%;
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
  const windowSize = useWindowSize();

  useEffect(() => {
    getTasks();
    return () => {
      dispatch(clearTasks());
    };
  }, []);

  const getTasks = () => {
    windowSize > 1024 && dispatch(setViewCard('kanban'));
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
