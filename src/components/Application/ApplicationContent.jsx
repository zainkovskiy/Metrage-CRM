import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskList, toggleNewTask } from 'store/taskSlice';
import Loader from "components/Main/Loader";
import SlideWindow from 'components/Main/SlideWindow';
import Tasks from './Tasks';
import NewTask from './NewTask';
import TaskFilter from './TaskFilter';
import { useLocation, useParams } from 'react-router-dom';

const ApplicationContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`
const ApplicationContent = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.task.loading);
  const isShowNewTask = useSelector((state) => state.task.isShowNewTask);
  const firstUpdate = useRef(true);
  const location = useLocation();
  useEffect(() => {
    if (firstUpdate.current) {
      dispatch(getTaskList(firstUpdate.current));
      firstUpdate.current = false;
    }
  }, [])
  useEffect(() => {
    console.log(location.state);
    if(location?.state){
      location.state = null;
    }
    console.log(location.state);
  }, [location])
  const handleOpenNewTask = () => {
    dispatch(toggleNewTask())
  }
  return (
    <ApplicationContentStyle>
      {
        loading ?
          <Loader /> :
          <>
            <TaskFilter handleOpenNewTask={handleOpenNewTask} />
            <Tasks />
            <SlideWindow open={isShowNewTask} onClose={handleOpenNewTask} width='30%'>
              <NewTask />
            </SlideWindow>
          </>
      }
    </ApplicationContentStyle>
  );
};

export default ApplicationContent;