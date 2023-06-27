import React from 'react';
import TaskCard from './TaskCard';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

const TasksStyle = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: min-content;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  overflow: auto;
`

const Tasks = () => {
  const tasks = useSelector((state) => state.task.taskList);
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
            tasks.filter(getRenderList).map((task) => {
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