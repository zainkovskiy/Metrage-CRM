import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonUI } from 'ui/ButtonUI';

const FilterNewsStyle = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const FilterNews = () => {
  return (
    <FilterNewsStyle>
      <Link to='new'>
        <ButtonUI size='small' variant='outline'>
          Создать
        </ButtonUI>
      </Link>
    </FilterNewsStyle>
  );
};

export default FilterNews;
