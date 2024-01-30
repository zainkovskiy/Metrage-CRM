import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import SlideWindow from 'components/Main/SlideWindow';
import { ButtonUI } from 'ui/ButtonUI';
import BuilderFilterForm from './BuilderFilterForm';

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
    <BuilderFilterStyle>
      <ButtonUI size='small' onClick={toggleFilter}>
        Фильтр
      </ButtonUI>
      <Link to='new'>
        <ButtonUI size='small' variant='outline'>
          Создать
        </ButtonUI>
      </Link>
      <SlideWindow open={open} onClose={toggleFilter} width={getWidth()}>
        <BuilderFilterForm onClose={toggleFilter} />
      </SlideWindow>
    </BuilderFilterStyle>
  );
};

export default BuilderFilter;
