import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';

const DealFilterStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-wrap: wrap;
`
const DealFilter = () => {
  return (
    <DealFilterStyle>
      <Link to='new'>
        <ButtonUI size='small' variant='outline'>Создать</ButtonUI>
      </Link>
    </DealFilterStyle >
  );
};

export default DealFilter;