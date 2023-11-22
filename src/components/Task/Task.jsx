import React from 'react';
import styled from 'styled-components';
import TaskTable from './TaskTable';
const TaskContainer = styled.div`
  flex-grow: 1;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Task = () => {
  return (
    <TaskContainer>
      <TaskTable />
    </TaskContainer>
  );
};

export default Task;
