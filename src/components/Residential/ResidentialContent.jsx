import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearResidentials,
  getResidentialList,
} from '../../store/slices/residentialSlice';
import ResidentialsMap from './ResidentialsMap';
import ResidentialFilter from './ResidentialFilter';
import ResidentialsCards from './ResidentialsCards';

const ResidentialContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  box-sizing: border-box;
  width: 100%;
`;
const DefaultError = styled.div``;

const ResidentialContent = () => {
  const firstMount = useRef(true);
  const { viewCard, modelFilter } = useSelector((state) => state.residential);
  const dispatch = useDispatch();
  useEffect(() => {
    if (firstMount.current) {
      return;
    }
    getList();
  }, [modelFilter]);
  useEffect(() => {
    getList();
    firstMount.current = false;
    return () => {
      dispatch(clearResidentials());
    };
  }, []);
  const getList = () => {
    dispatch(getResidentialList());
  };
  const getResidentialComponent = () => {
    switch (viewCard) {
      case 'cards':
        return ResidentialsCards;
      case 'map':
        return ResidentialsMap;
      default:
        return DefaultError;
    }
  };
  const ResidentialComponent = getResidentialComponent();
  return (
    <ResidentialContentStyle>
      <ResidentialFilter />
      <ResidentialComponent />
      <Outlet />
    </ResidentialContentStyle>
  );
};

export default ResidentialContent;
