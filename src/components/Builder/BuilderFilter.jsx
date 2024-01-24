import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import SlideWindow from 'components/Main/SlideWindow';
import { ButtonUI } from 'ui/ButtonUI';
// import { Box } from 'ui/Box';
// import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
// import { useDispatch, useSelector } from 'react-redux';
// import { setViewCard } from '../../store/dealSlice';

const BuilderFilterStyle = styled.div`
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

const BuilderFilter = () => {
  const [open, setOpen] = useState(false);
  // const dispatch = useDispatch();
  // const viewCard = useSelector((state) => state.deal.viewCard);
  const windowSize = useWindowSize();

  const toggleFilter = () => {
    setOpen(!open);
  };
  // const changeViewCard = (newValue) => {
  //   dispatch(setViewCard(newValue));
  // };
  const getWidth = () => {
    if (windowSize <= 768) {
      return '100%';
    }
    return '30%';
  };
  return (
    <BuilderFilterStyle>
      <ButtonUI size='small' onClick={toggleFilter}>
        Фильтр
      </ButtonUI>
      {/* <Box>
        <ButtonUI size='small' onClick={toggleFilter}>
          Фильтр
        </ButtonUI>
        {windowSize > 768 && (
          <SelectUI small onChange={changeViewCard} select={viewCard}>
            <SelectItemUI value='cell'>Плитка</SelectItemUI>
            <SelectItemUI value='table'>Таблица</SelectItemUI>
          </SelectUI>
        )}
      </Box> */}
      <Link to='new'>
        <ButtonUI size='small' variant='outline'>
          Создать
        </ButtonUI>
      </Link>
      <SlideWindow open={open} onClose={toggleFilter} width={getWidth()}>
        {/* <DealFilterForm onClose={toggleFilter} /> */}
      </SlideWindow>
    </BuilderFilterStyle>
  );
};

export default BuilderFilter;
