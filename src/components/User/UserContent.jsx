import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from 'styles/device';
import UserFilter from './UserFilter';

const UserContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
  @media ${device.tablet} {
    padding: 0;
    gap: 0;
  }
`;

const UserContent = () => {
  return (
    <UserContentStyle>
      <UserFilter />
      <Link to='3'>user slider</Link>
      <Outlet />
    </UserContentStyle>
  );
};

export default UserContent;
