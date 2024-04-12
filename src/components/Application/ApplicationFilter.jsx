import React, { useState } from 'react';
import styled from 'styled-components';
import SlideWindow from 'components/Main/SlideWindow';
import { ButtonUI } from 'ui/ButtonUI';
import { useDispatch, useSelector } from 'react-redux';
import { setViewCard } from 'store/applicationSlice';
import { Box } from 'ui/Box';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import ApplicationFilterForm from './ApplicationFilterForm';
import ApplicationHopper from './ApplicationHopper';

const ApplicationFilterStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 0.5rem;
`;
const MainFilter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const ApplicationFilter = () => {
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const { viewCard } = useSelector((state) => state.application);
  const [open, setOpen] = useState(false);
  const toggleFilter = () => {
    setOpen(!open);
  };
  const changeViewCard = (newValue) => {
    dispatch(setViewCard(newValue));
  };
  const getWidth = () => {
    if (windowSize <= 768) {
      return '100%';
    }
    return '30%';
  };
  return (
    <ApplicationFilterStyle>
      <MainFilter>
        <Box>
          <ButtonUI size='small' onClick={toggleFilter}>
            Фильтр
          </ButtonUI>
          {windowSize > 768 && (
            <SelectUI small onChange={changeViewCard} select={viewCard}>
              <SelectItemUI value='cell'>Плитка</SelectItemUI>
              <SelectItemUI value='table'>Таблица</SelectItemUI>
            </SelectUI>
          )}
        </Box>
        <Link to='new'>
          <ButtonUI size='small' variant='outline'>
            Создать
          </ButtonUI>
        </Link>
      </MainFilter>
      {windowSize > 768 && <ApplicationHopper />}
      <SlideWindow open={open} onClose={toggleFilter} width={getWidth()}>
        <ApplicationFilterForm onClose={toggleFilter} />
      </SlideWindow>
    </ApplicationFilterStyle>
  );
};

export default ApplicationFilter;
