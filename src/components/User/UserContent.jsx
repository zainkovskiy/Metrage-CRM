import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from 'styles/device';
import UserFilter from './UserFilter';
import { getUsersList } from '../../store/usersSlice';
import Users from './Users';

const UserContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  @media ${device.tablet} {
    padding: 0;
    gap: 0;
  }
`;

const UserContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
    return () => {
      // dispatch(clearDeals());
    };
  }, []);

  const getUsers = () => {
    dispatch(getUsersList());
  };
  return (
    <UserContentStyle>
      <UserFilter />
      <Users />
      <Outlet />
    </UserContentStyle>
  );
};

export default UserContent;
