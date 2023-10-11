import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import ClientCard from './ClientCard';
import { AnimatePresence } from 'framer-motion';

const ClientsStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: min-content;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
`;

const Clients = () => {
  const loading = useSelector((state) => state.clients.loading);
  const clients = useSelector((state) => state.clients.clients);
  if (loading) {
    return <Loader />;
  }
  return (
    <ClientsStyle>
      <AnimatePresence>
        {clients.length > 0 &&
          clients.map((item) => <ClientCard key={item.UID} client={item} />)}
      </AnimatePresence>
    </ClientsStyle>
  );
};

export default Clients;
