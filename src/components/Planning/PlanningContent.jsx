import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import FilterPlanning from './FilterPlanning';
import { getPlansList } from '../../store/slices/plansSlice';
import Plans from './Plans';

const PlanningContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

const PlanningContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getList();
    return () => {
      // dispatch(clearPlans());
    };
  }, []);
  const getList = () => {
    dispatch(getPlansList());
  };
  return (
    <PlanningContentStyle>
      <FilterPlanning />
      <Plans />
      <Outlet />
    </PlanningContentStyle>
  );
};

export default PlanningContent;
