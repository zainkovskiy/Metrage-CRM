import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import SlideWindow from 'components/Main/SlideWindow';
import { useWindowSize } from 'hooks/windowSize';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeModelFilter,
  getResidentialList,
  setViewCard,
} from '../../store/slices/residentialSlice';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import ResidentialFilterForm from './ResidentialFilterForm';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle';

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
  const { viewCard, modelFilter, schema } = useSelector(
    (state) => state.residential
  );
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
    if (newValue === 'map') {
      dispatch(getResidentialList());
    }
  };
  const changeModel = (e) => {
    const newValue = e.target.id;
    dispatch(changeModelFilter(newValue));
  };
  return (
    <ResidentialFilterStyle>
      <Box>
        <ButtonUI size='small' onClick={toggleFilter}>
          Фильтр
        </ButtonUI>
        <ButtonToggleGroup fullWidth>
          <ButtonToggleItem
            id='ЖК-БЦ'
            onClick={changeModel}
            active={modelFilter}
          >
            ЖК/БЦ {schema?.countHouses || 0}
          </ButtonToggleItem>
          <ButtonToggleItem onClick={changeModel} id='КП' active={modelFilter}>
            КП {schema?.countLands || 0}
          </ButtonToggleItem>
        </ButtonToggleGroup>
        {windowSize > 768 && (
          <SelectUI small onChange={changeViewCard} select={viewCard}>
            <SelectItemUI value='cards'>Плитка</SelectItemUI>
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
