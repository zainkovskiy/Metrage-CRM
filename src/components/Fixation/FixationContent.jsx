import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { device } from 'styles/device';
import FixationFilter from './FixationFilter';
import {
  cleareFixation,
  getFixationList,
} from '../../store/slices/fixationSlice';
import FixationCards from './FixationCards';

const FixationStyle = styled.div`
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
const FixationContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getFixedList();
    return () => {
      dispatch(cleareFixation());
    };
  }, []);

  const getFixedList = () => {
    dispatch(getFixationList());
  };
  return (
    <FixationStyle>
      <FixationFilter />
      <FixationCards />
      <Outlet />
    </FixationStyle>
  );
};

export default FixationContent;
