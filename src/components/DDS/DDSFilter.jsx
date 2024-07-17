import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import SlideWindow from 'components/Main/SlideWindow';
import { ButtonUI } from 'ui/ButtonUI';
import DDSFilterForm from './DDSFilterForm';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { Box } from 'ui/Box';
import { useDispatch, useSelector } from 'react-redux';
import { setNewMode } from '../../store/slices/ddsSlice';

const DDSFilterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-wrap: wrap;
  @media print {
    display: none;
  }
`;
const DDSFilter = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.dds);
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
  const setMode = (newMode) => {
    if (newMode === mode) {
      return;
    }
    dispatch(setNewMode(newMode));
  };
  return (
    <DDSFilterStyle>
      <Box>
        <ButtonUI size='small' onClick={toggleFilter}>
          Фильтр
        </ButtonUI>
        <SelectUI small onChange={setMode} select={mode}>
          <SelectItemUI value='dds'>ДДС</SelectItemUI>
          <SelectItemUI value='bill'>Счета</SelectItemUI>
        </SelectUI>
      </Box>
      <Link to='new'>
        <ButtonUI size='small' variant='outline'>
          Создать
        </ButtonUI>
      </Link>
      <SlideWindow open={open} onClose={toggleFilter} width={getWidth()}>
        <DDSFilterForm onClose={toggleFilter} />
      </SlideWindow>
    </DDSFilterStyle>
  );
};

export default DDSFilter;
