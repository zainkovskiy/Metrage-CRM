import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import SlideWindow from 'components/Main/SlideWindow';
import { ButtonUI } from 'ui/ButtonUI';
import DDSFilterForm from './DDSFilterForm';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { Box } from 'ui/Box';

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
    <DDSFilterStyle>
      <Box>
        <ButtonUI size='small' onClick={toggleFilter}>
          Фильтр
        </ButtonUI>
        <SelectUI small onChange={() => {}} select={'dds'}>
          <SelectItemUI value='dds'>ДДС</SelectItemUI>
          <SelectItemUI value='projects'>Проекты</SelectItemUI>
          <SelectItemUI value='company'>Организации</SelectItemUI>
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
