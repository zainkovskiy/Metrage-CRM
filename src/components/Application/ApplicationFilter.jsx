import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import SlideWindow from 'components/Main/SlideWindow';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import {} from 'store/applicationSlice';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import ApplicationFilterForm from './ApplicationFilterForm';

const ApplicationFilterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem;
`;
const ApplicationFilter = () => {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();
  const [open, setOpen] = useState(false);
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
    <ApplicationFilterStyle>
      <ButtonUI size='small' onClick={toggleFilter}>
        Фильтр
      </ButtonUI>
      <Link to='new-app'>
        <ButtonUI size='small' variant='outline'>
          Создать
        </ButtonUI>
      </Link>
      <SlideWindow open={open} onClose={toggleFilter} width={getWidth()}>
        <ApplicationFilterForm onClose={toggleFilter} />
      </SlideWindow>
    </ApplicationFilterStyle>
  );
};

export default ApplicationFilter;
