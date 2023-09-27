import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CompilationsCard from './CompilationsCard';
import { Outlet } from 'react-router-dom';

const CompilationsStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: min-content;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
`;

const Compilations = () => {
  const compilations = useSelector((state) => state.compilation.compilations);
  return (
    <CompilationsStyle>
      {compilations.map((item) => (
        <CompilationsCard key={item.UID} compilation={item} />
      ))}
      <Outlet />
    </CompilationsStyle>
  );
};

export default Compilations;
