import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import ObjectsFilterForm from './ObjectsFilterForm';
import SlideWindow from 'components/Main/SlideWindow';
import { useWindowSize } from 'hooks/windowSize';
const ObjectsFilterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-wrap: wrap;
`;
const ObjectsFilterDesktop = () => {
  const [open, setOpen] = useState(false);
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
  return (
    <ObjectsFilterStyle>
      <Box>
        <ButtonUI size='small' onClick={toggleFilter}>
          Фильтр
        </ButtonUI>
        {windowSize > 768 && (
          <TextSpanStyle>Обязательно проверьте фильтр</TextSpanStyle>
        )}
      </Box>
      <Link to='new'>
        <ButtonUI size='small' variant='outline'>
          Создать
        </ButtonUI>
      </Link>
      <SlideWindow open={open} onClose={toggleFilter} width={getWidth()}>
        <ObjectsFilterForm onClose={toggleFilter} />
      </SlideWindow>
    </ObjectsFilterStyle>
  );
};

export default ObjectsFilterDesktop;
