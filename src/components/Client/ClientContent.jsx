import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from 'styles/device';
import ClientFilter from './ClientFilter';
import Clients from './Clients';
import { getClientsList } from '../../store/clientsSlice';

const ClientContentStyle = styled.div`
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

const ClientContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getClients();
  }, []);
  const getClients = () => {
    dispatch(getClientsList());
  };
  return (
    <ClientContentStyle>
      <ClientFilter />
      <Clients />
      {/* <Link to='3'>client slider</Link> */}
      <Outlet />
    </ClientContentStyle>
  );
};

export default ClientContent;
