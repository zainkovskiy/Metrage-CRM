import React from 'react';
import TaskCard from './TaskCard';
import styled from 'styled-components';
import SlideWindow from '../Main/SlideWindow';
import TaskSlide from './TaskSlide';
import { useDispatch, useSelector } from 'react-redux';
import { getTask, clearTask, getTaskStory, getTaskList } from 'store/taskSlice';
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
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.taskList);
  const task = useSelector((state) => state.task.openTask);
  const filterTypeList = useSelector((state) => state.task.filterTypeList);
  const openTask = (uid) => {
    if (Boolean(task)) {
      dispatch(getTaskList());
      dispatch(clearTask());
      return
    }
    dispatch(getTask(uid));
    dispatch(getTaskStory(uid));
  }
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
                  openTask={openTask}
                />
              )
            })
          }

        </AnimatePresence>
      </TasksStyle>
      <SlideWindow width='70%' onClose={openTask} open={Boolean(task)}>
        {
          task &&
          <TaskSlide />
        }
      </SlideWindow>
    </>
  );
};

export default Tasks;