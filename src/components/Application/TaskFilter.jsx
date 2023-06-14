import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonToggleGroup } from 'ui/ButtonToggle';
import { ButtonToggleItem } from 'ui/ButtonToggle'; 
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { SelectUI, SelectItemUI } from 'ui/SelectUI';
import { setTasksView, setFilterTypeTaskList } from 'store/taskSlice';

const TaskFilterStyle = styled.div`
  padding: 1rem 1rem 0 1rem;;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const TaskFilter = ({handleOpenNewTask}) => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.task.view);
  const filterTypeList = useSelector((state) => state.task.filterTypeList);
  const installView = (e) => {
    dispatch(setTasksView(e.target.id));
  }
  const setTypeList = (type) => {
    dispatch(setFilterTypeTaskList(type));
  }
  return (
    <TaskFilterStyle>
      <Box>
        <ButtonToggleGroup>
          <ButtonToggleItem variant='light' id='tile' active={view} onClick={installView}>Плиткой</ButtonToggleItem>
          <ButtonToggleItem variant='light' id='list' active={view} onClick={installView}>Списком</ButtonToggleItem>
        </ButtonToggleGroup>
        <SelectUI small select={filterTypeList} onChange={setTypeList}>
          <SelectItemUI value='buy'>Купить</SelectItemUI>
          <SelectItemUI value='sell'>Продать</SelectItemUI>
          <SelectItemUI value='all'>Всё</SelectItemUI>
        </SelectUI>
      </Box>
      <ButtonUI onClick={handleOpenNewTask} size='small' variant='outline'>Создать</ButtonUI>
    </TaskFilterStyle>
  );
};

export default TaskFilter;