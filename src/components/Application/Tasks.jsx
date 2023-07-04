import React from 'react';
import TaskCard from './TaskCard';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useAsyncValue } from 'react-router-dom';
import { device } from 'styles/device';

const TasksStyle = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: min-content;
  width: 100%;
  gap: 1rem;
  box-sizing: border-box;
  overflow: auto;
  padding: 0.5rem;
  @media ${device.tablet}{
    gap: 0.5rem;
  }
`

const Tasks = () => {
  const applications = useAsyncValue();
  const filterTypeList = useSelector((state) => state.task.filterTypeList);
  const getRenderList = (task) => {
    if (filterTypeList === 'all') {
      return task;
    }
    return task?.demand?.type === filterTypeList;
  }
  return (
    <>
      <TasksStyle>
        <AnimatePresence>
          {
            applications.filter(getRenderList).map((task) => {
              return (
                <TaskCard
                  key={task?.UID}
                  task={task}
                />
              )
            })
          }

        </AnimatePresence>
      </TasksStyle>
    </>
  );
};

export default Tasks;