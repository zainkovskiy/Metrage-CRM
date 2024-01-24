import React from 'react';
import Loader from 'components/Main/Loader';
import { useSelector } from 'react-redux';
import BuildersCard from './BuildersCard';
import styled from 'styled-components';

const BuildersStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  padding: 0.5rem;
  box-sizing: border-box;
`;
const Builders = () => {
  const loading = useSelector((state) => state.builder.loadingList);
  const builders = useSelector((state) => state.builder.builders);
  if (loading) {
    return <Loader />;
  }
  return (
    <BuildersStyle>
      {builders.map((building) => (
        <BuildersCard key={building.UID} building={building} />
      ))}
    </BuildersStyle>
  );
};

export default Builders;
