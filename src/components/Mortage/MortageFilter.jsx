import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';
import SlideWindow from 'components/Main/SlideWindow';
import { useWindowSize } from 'hooks/windowSize';
// import { useSelector } from 'react-redux';
import MortageFilterForm from './MortageFilterForm';
import MortageHopper from './MortageHopper';

const MortageFilterStyle = styled.div`
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
const MortageFilter = () => {
  // const isAdmin = useSelector((state) => state.user.isAdmin);
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
  return (
    <MortageFilterStyle>
      <MainFilter>
        <ButtonUI size='small' onClick={toggleFilter}>
          Фильтр
        </ButtonUI>
        <Link to='new'>
          <ButtonUI size='small' variant='outline'>
            Создать
          </ButtonUI>
        </Link>
      </MainFilter>
      {windowSize > 768 && <MortageHopper />}
      <SlideWindow open={open} onClose={toggleFilter} width={getWidth()}>
        <MortageFilterForm onClose={toggleFilter} />
      </SlideWindow>
    </MortageFilterStyle>
  );
};

export default MortageFilter;
