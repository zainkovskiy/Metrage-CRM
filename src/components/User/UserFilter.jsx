import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';

const UserFilterStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-wrap: wrap;
`;
const UserFilter = () => {
  return (
    <UserFilterStyle>
      {/* <Link to='new'> */}
      <ButtonUI size='small' variant='outline'>
        Создать 11
      </ButtonUI>
      {/* </Link> */}
    </UserFilterStyle>
  );
};

export default UserFilter;
