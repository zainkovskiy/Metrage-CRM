import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import SlideWindow from 'components/Main/SlideWindow';
import { ButtonUI } from 'ui/ButtonUI';

const CalendarFilterStyle = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const CalendarFilter = () => {
  const windowSize = useWindowSize();
  const getWidth = () => {
    if (windowSize <= 768) {
      return '100%';
    }
    return '30%';
  };
  return (
    <CalendarFilterStyle>
      <ButtonUI size='small' onClick={() => {}}>
        Фильтр
      </ButtonUI>
      <Link to='new'>
        <ButtonUI size='small' variant='outline'>
          Создать
        </ButtonUI>
      </Link>
      <SlideWindow open={false} onClose={() => {}} width={getWidth()}>
        {/* <DealFilterForm onClose={() => {}} /> */}
      </SlideWindow>
    </CalendarFilterStyle>
  );
};

export default CalendarFilter;
