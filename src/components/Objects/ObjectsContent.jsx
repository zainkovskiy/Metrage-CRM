import React from 'react';
import ObjectsFilter from './ObjectsFilter';
import styled from 'styled-components';
import { device } from 'styles/device';
import { Outlet } from 'react-router-dom';

const ObjectsContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
  @media ${device.tablet}{
    padding: 0;
    gap: 0;
  }
`

const ObjectsContent = () => {
  return (
    <ObjectsContentStyle>
      <ObjectsFilter/>
      <Outlet/>
    </ObjectsContentStyle>
  );
};

export default ObjectsContent;