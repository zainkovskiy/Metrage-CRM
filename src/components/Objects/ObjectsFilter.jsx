import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';

const ObjectsFilterStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem;
`
const ObjectsFilter = () => {
  return (
    <ObjectsFilterStyle>
      <Link to='new-object'>
        <ButtonUI size='small' variant='outline'>Создать</ButtonUI>
      </Link>
    </ObjectsFilterStyle>
  );
};

export default ObjectsFilter;