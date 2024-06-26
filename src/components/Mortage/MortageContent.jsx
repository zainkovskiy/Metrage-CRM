import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { getMortageList, clearMortage } from '../../store/slices/mortageSlice';
import MortageCards from './MortageCards';
import { useDispatch } from 'react-redux';
import { device } from 'styles/device';
import MortageFilter from './MortageFilter';

const MortageContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  @media ${device.tablet} {
    padding: 0;
  }
`;
const MortageContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getList();
    return () => {
      dispatch(clearMortage());
    };
  }, []);
  const getList = () => {
    dispatch(getMortageList());
  };
  return (
    <MortageContentStyle>
      <MortageFilter />
      <MortageCards />
      <Outlet />
    </MortageContentStyle>
  );
};

export default MortageContent;
