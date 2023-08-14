import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';
import ObjectsFilterForm from './ObjectsFilterForm';
const ObjectsFilterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-wrap: wrap;
`
const FilterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
`
const ObjectsFilterDesktop = ({ getList }) => {
  return (
    <ObjectsFilterStyle>
      <FilterForm>
        <ObjectsFilterForm/>
        <ButtonUI size='small' onClick={getList}>Показать</ButtonUI>
      </FilterForm>
      <Link to='new-object'>
        <ButtonUI size='small' variant='outline'>Создать</ButtonUI>
      </Link>
    </ObjectsFilterStyle >
  );
};

export default ObjectsFilterDesktop;