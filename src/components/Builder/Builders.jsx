import React from 'react';
import Loader from 'components/Main/Loader';
import { useSelector } from 'react-redux';
import BuildersCard from './BuildersCard';
import styled from 'styled-components';

const BuildersContainer = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
`;
const BuildersStyle = styled.table`
  overflow: auto;
  border-collapse: collapse;
  width: 100%;
`;
const Builders = () => {
  const loading = useSelector((state) => state.builder.loadingList);
  const builders = useSelector((state) => state.builder.builders);
  if (loading) {
    return <Loader />;
  }
  //TODO: переделать в таблицу
  //TODO: добавить пагинацию
  return (
    <BuildersContainer>
      <BuildersStyle>
        {builders.map((building) => (
          <BuildersCard key={building.UID} building={building} />
        ))}
      </BuildersStyle>
    </BuildersContainer>
  );
};

export default Builders;
