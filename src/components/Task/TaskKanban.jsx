import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import { Box } from 'ui/Box';
import { Link } from 'react-router-dom';
import { setTaskNewStage } from '../../store/taskSlice';
import { ReactComponent as Arrow } from 'images/arrow-down.svg';

const TaskKanbanStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $colums }) => $colums}, 1fr);
  flex-grow: 1;
`;
const TaslStageColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.5rem;
`;
const TitleStage = styled.div`
  font-family: ${({ theme }) => theme.font.family};
  font-size: 14px;
  display: block;
  background: #ccc;
  padding: 0.5rem;
  position: relative;
  border-radius: 3px;
  &:after {
    /* content: '';
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 75px 50px 75px 0;
    border-color: transparent #ff4532 transparent transparent;
    transform: rotate(0deg); */
    content: '';
    position: absolute;
    display: block;
    left: calc(-0.5rem + 1.5px);
    top: 0px;
    bottom: 0px;
    width: 0.5rem;
    height: 100%;
    background: #ccc;
    clip-path: polygon(100% 0px, 100% 100%, 0px 50%);
    border-radius: 0.25rem;
  }
`;
const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
  border-right: 1px dashed #ccc;
  padding: 0.5rem 0 0 0;
  transition: opacity 0.3s, background-color 0.3s;
`;
const TaskKanban = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.taskData?.tasks || []);
  const stages = useSelector((state) => state.task.taskData?.stages || []);
  const [cardTarget, setCardTarget] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const setNewStage = (newStage) => {
    if (currentTask.stageId === newStage) {
      return;
    }
    dispatch(
      setTaskNewStage({
        ...currentTask,
        stageId: parseInt(newStage),
      })
    );
    setCurrentTask(null);
  };
  const dragStartHandler = (event, task) => {
    //событие взятие карточки
    event.target.style.filter = 'grayscale(1)';
    setCardTarget(event.target);
    setCurrentTask(task);
  };
  const dragEndHandler = (event) => {
    //отпустили перемещение
    if (event?.target?.id) {
      event.target.style.opacity = 1;
      event.target.style.background = '';
    }
    if (event?.target?.parentElement?.id) {
      event.target.parentElement.style.opacity = 1;
      event.target.parentElement.style.background = '';
    }
  };
  const dragOverHandler = (event) => {
    //местоположение над другой карточки
    event.preventDefault();
    if (event?.target?.id) {
      event.target.style.opacity = 0.5;
      event.target.style.background = '#fadfff';
    }
    if (event?.target?.parentElement?.id) {
      event.target.parentElement.style.opacity = 0.5;
      event.target.parentElement.style.background = '#fadfff';
    }
  };
  const dropHandler = (event) => {
    //отпустили карточку
    setNewStage(event.target.id || event.target.parentElement.id);
    if (event?.target?.id) {
      event.target.style.opacity = 1;
      event.target.style.background = '';
    }
    if (event?.target?.parentElement?.id) {
      event.target.parentElement.style.opacity = 1;
      event.target.parentElement.style.background = '';
    }
    if (cardTarget) {
      cardTarget.style.filter = '';
      setCardTarget(null);
    }
  };
  return (
    <TaskKanbanStyle $colums={stages.length}>
      {stages.map((stage) => (
        <TaslStageColumn key={`stage${stage.id}`}>
          <TitleStage>
            {stage.name}
            {/* <Triangle /> */}
          </TitleStage>
          <Tasks
            id={stage.id}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
            onDragLeave={dragEndHandler}
            onDragEnd={dragEndHandler}
          >
            {tasks.map((task, idx) => {
              if (task.stageId === stage.id) {
                return (
                  <TaskCard
                    key={`task${task.UID}`}
                    task={task}
                    onDragStart={dragStartHandler}
                    onDrop={dropHandler}
                  />
                );
              }
            })}
          </Tasks>
        </TaslStageColumn>
      ))}
    </TaskKanbanStyle>
  );
};

const TaskCardStyle = styled(Link)`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.primary};
  margin-right: 0.5rem;
  text-decoration: none;
  transition: filter 0.3s;
`;
const TaskCardContainer = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  gap: 0.5rem;
  pointer-events: none;
`;
const DateContainer = styled.div`
  padding: 0 0.5rem;
  box-sizing: border-box;
  background-color: #ccc;
  border-radius: 5px;
  align-self: flex-start;
`;
const IconAvatar = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 40px;
`;
const ArrowIcon = styled(Arrow)`
  transform: rotate(270deg);
  fill: #ccc;
  width: 12px;
  height: 12px;
`;
const TaskCard = ({ task, onDragStart, onDrop }) => {
  return (
    <TaskCardStyle
      to={`${task.UID}`}
      draggable={true}
      onDragStart={(e) => {
        onDragStart(e, task);
      }}
      onDrop={onDrop}
    >
      <TaskCardContainer>
        <TextSpanStyle color='#fff' size={12}>
          {task.title || ''}
        </TextSpanStyle>
        <DateContainer>
          <TextSpanStyle size={12}>
            {task?.duedate
              ? useDateFormat(task?.duedate, 'DD.MM.YY')
              : 'нет срока'}
          </TextSpanStyle>
        </DateContainer>
        <Box jc='flex-start'>
          <IconAvatar src={task?.creator?.avatar} />
          <ArrowIcon />
          <IconAvatar src={task?.responsible?.avatar} />
        </Box>
      </TaskCardContainer>
    </TaskCardStyle>
  );
};

export default TaskKanban;
