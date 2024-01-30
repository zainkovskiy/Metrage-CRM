import React, { useEffect } from 'react';
import styled from 'styled-components';
import BuilderFilter from './BuilderFilter';
import Builders from './Builders';
import { useDispatch } from 'react-redux';
import {
  cleareBuilders,
  getBuilderList,
} from '../../store/slices/builderSlice';
import { Outlet } from 'react-router-dom';

const BuilderContentStyle = styled.div`
  padding: 0.5;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;
const BuilderContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getBuilders();
    return () => {
      dispatch(cleareBuilders());
    };
  }, []);
  const getBuilders = () => {
    dispatch(getBuilderList());
  };
  return (
    <BuilderContentStyle>
      <BuilderFilter />
      <Builders />
      <Outlet />
    </BuilderContentStyle>
  );
};

export default BuilderContent;
