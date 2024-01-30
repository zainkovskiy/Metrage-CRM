import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import SlideWindow from 'components/Main/SlideWindow';
import { useWindowSize } from 'hooks/windowSize';
import { useSelector, useDispatch } from 'react-redux';
import { setViewCard } from '../../store/slices/residentialSlice';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import ResidentialFilterForm from './ResidentialFilterForm';

const ResidentialFilterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-wrap: wrap;
`;
const ResidentialFilter = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const viewCard = useSelector((state) => state.residential.viewCard);
  const windowSize = useWindowSize();
  const getWidth = () => {
    if (windowSize <= 768) {
      return '100%';
    }
    return '30%';
  };
  const toggleFilter = () => {
    setOpen(!open);
  };
  const changeViewCard = (newValue) => {
    dispatch(setViewCard(newValue));
  };
  return (
    <ResidentialFilterStyle>
      <Box>
        <ButtonUI size='small' onClick={toggleFilter}>
          Фильтр
        </ButtonUI>
        {windowSize > 768 && (
          <SelectUI small onChange={changeViewCard} select={viewCard}>
            <SelectItemUI value='cell'>Плитка</SelectItemUI>
            <SelectItemUI value='map'>Карта</SelectItemUI>
          </SelectUI>
        )}
      </Box>
      <Link to='new'>
        <ButtonUI size='small' variant='outline'>
          Создать
        </ButtonUI>
      </Link>
      <SlideWindow open={open} onClose={toggleFilter} width={getWidth()}>
        <ResidentialFilterForm onClose={toggleFilter} />
      </SlideWindow>
    </ResidentialFilterStyle>
  );
};

export default ResidentialFilter;
