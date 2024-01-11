import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonUI } from 'ui/ButtonUI';

const FilterPlanningStyle = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: flex-end;
`;

const FilterPlanning = () => {
  return (
    <FilterPlanningStyle>
      <Link to='new'>
        <ButtonUI size='small' variant='outline'>
          Создать
        </ButtonUI>
      </Link>
    </FilterPlanningStyle>
  );
};

export default FilterPlanning;
