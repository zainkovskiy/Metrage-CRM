import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';

const ClientFilterStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-wrap: wrap;
`;
const ClientFilter = () => {
  return (
    <ClientFilterStyle>
      {/* <Link to='new'> */}
      <ButtonUI size='small' variant='outline'>
        Создать
      </ButtonUI>
      {/* </Link> */}
    </ClientFilterStyle>
  );
};

export default ClientFilter;
