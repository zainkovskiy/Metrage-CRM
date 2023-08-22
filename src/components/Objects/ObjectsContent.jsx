import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import ObjectsFilter from './ObjectsFilter';
import Objects from './Objects';
import styled from 'styled-components';
import { device } from 'styles/device';
import { Outlet } from 'react-router-dom';
import { getObjectList, clearObjects } from 'store/objectSlice';
import ObjectsFilterDesktop from './ObjectsFilterDesktop';

const ObjectsContentStyle = styled.div`
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

const ObjectsContent = () => {
  const firstMount = useRef(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getList();
    return () => {
      dispatch(clearObjects());
    };
  }, []);
  const getList = () => {
    dispatch(getObjectList());
  };
  return (
    <ObjectsContentStyle>
      <ObjectsFilterDesktop />
      <Objects firstMount={firstMount.current} />
      <Outlet />
    </ObjectsContentStyle>
  );
};
export default ObjectsContent;
