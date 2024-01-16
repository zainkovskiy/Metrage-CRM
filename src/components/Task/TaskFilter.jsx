import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { ButtonLink } from 'ui/ButtonLink';
import { TextSpanStyle } from 'styles/styles';
import SlideWindow from 'components/Main/SlideWindow';
import { useWindowSize } from 'hooks/windowSize';
import { useDispatch, useSelector } from 'react-redux';
import { setReadAll, setViewCard } from '../../store/taskSlice';
import { device } from 'styles/device';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import TaskFilterForm from './TaskFilterForm';

const TaskFilterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-wrap: wrap;
`;

const BoxInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.2rem 0.5rem;
  background-color: #85009e;
  border-radius: 5px;
  @media ${device.tablet} {
    display: none;
  }
`;
const LineSeporator = styled.span`
  width: 1px;
  background-color: #fff;
`;

const TaskFilter = () => {
  const dispatch = useDispatch();
  const taskData = useSelector((state) => state.task.taskData);
  const viewCard = useSelector((state) => state.task.viewCard);
  const [open, setOpen] = useState(false);
  const windowSize = useWindowSize();
  const toggleFilter = () => {
    setOpen(!open);
  };
  const getWidth = () => {
    if (windowSize <= 768) {
      return '100%';
    }
    return '30%';
  };
  const readAll = () => {
    dispatch(setReadAll());
  };
  const changeViewCard = (newValue) => {
    dispatch(setViewCard(newValue));
  };
  return (
    <>
      <TaskFilterStyle>
        <Box gap='1rem'>
          <ButtonUI size='small' onClick={toggleFilter}>
            Фильтр
          </ButtonUI>
          {windowSize > 1024 && (
            <SelectUI small onChange={changeViewCard} select={viewCard}>
              <SelectItemUI value='table'>Таблица</SelectItemUI>
              <SelectItemUI value='kanban'>Канбан</SelectItemUI>
            </SelectUI>
          )}
        </Box>
        <Link to='new'>
          <ButtonUI size='small' variant='outline'>
            Создать
          </ButtonUI>
        </Link>
      </TaskFilterStyle>
      {windowSize > 768 && (
        <TaskFilterStyle>
          <BoxInfo>
            <TextSpanStyle color='#fff'>
              Просрочены: {taskData?.overdue || 0}
            </TextSpanStyle>
            <TextSpanStyle color='#fff'>
              Комментарии: {taskData?.withNotify || 0}
            </TextSpanStyle>
            <LineSeporator />
            <ButtonLink color='#fff' onClick={readAll}>
              Прочитать все
            </ButtonLink>
          </BoxInfo>
        </TaskFilterStyle>
      )}
      <SlideWindow open={open} onClose={toggleFilter} width={getWidth()}>
        <TaskFilterForm onClose={toggleFilter} />
      </SlideWindow>
    </>
  );
};

export default TaskFilter;
