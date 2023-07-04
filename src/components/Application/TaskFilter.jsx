import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonToggleGroup } from 'ui/ButtonToggle';
import { ButtonToggleItem } from 'ui/ButtonToggle';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { SelectUI, SelectItemUI } from 'ui/SelectUI';
import { setTasksView, setFilterTypeTaskList } from 'store/taskSlice';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';

const TaskFilterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem 0 0.5rem;
`
const TaskFilter = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.task.view);
  const filterTypeList = useSelector((state) => state.task.filterTypeList);
  const windowSize = useWindowSize();
  const installView = (e) => {
    dispatch(setTasksView(e.target.id));
  }
  const setTypeList = (type) => {
    dispatch(setFilterTypeTaskList(type));
  }
  return (
    <TaskFilterStyle>
      <Box>
        {
          windowSize > 768 &&
          <ButtonToggleGroup>
            <ButtonToggleItem variant='light' id='tile' active={view} onClick={installView}>Плиткой</ButtonToggleItem>
            <ButtonToggleItem variant='light' id='list' active={view} onClick={installView}>Списком</ButtonToggleItem>
          </ButtonToggleGroup>
        }
        <SelectUI small select={filterTypeList} onChange={setTypeList}>
          <SelectItemUI value='buy'>Купить</SelectItemUI>
          <SelectItemUI value='sell'>Продать</SelectItemUI>
          <SelectItemUI value='all'>Всё</SelectItemUI>
        </SelectUI>
      </Box>
      <Link to='new-app'>
        <ButtonUI size='small' variant='outline'>Создать</ButtonUI>
      </Link>
    </TaskFilterStyle>
  );
};

export default TaskFilter;