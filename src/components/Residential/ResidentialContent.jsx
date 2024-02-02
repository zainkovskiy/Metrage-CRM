import React, { useEffect } from 'react';
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
  const viewCard = useSelector((state) => state.residential.viewCard);
  const dispatch = useDispatch();
  useEffect(() => {
    getList();
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
