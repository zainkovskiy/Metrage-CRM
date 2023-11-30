import React from 'react';
import styled from 'styled-components';
import TaskTable from './TaskTable';
import { useSelector } from 'react-redux';
import TaskKanban from './TaskKanban';

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
const ErrorComponent = styled.div``;
const Task = () => {
  const viewCard = useSelector((state) => state.task.viewCard);
  const getTaskComponent = () => {
    switch (viewCard) {
      case 'table':
        return TaskTable;
      case 'kanban':
        return TaskKanban;
      default:
        return ErrorComponent;
    }
  };
  const TaskComponent = getTaskComponent();

  return (
    <TaskContainer>
      <TaskComponent />
    </TaskContainer>
  );
};

export default Task;
