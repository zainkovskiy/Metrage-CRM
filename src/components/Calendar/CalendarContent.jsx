import React, { useEffect } from 'react';
import styled from 'styled-components';
import CalendarFilter from './CalendarFilter';
import CalendarComponent from './Calendar';
import { useDispatch } from 'react-redux';
import { getEventList } from '../../store/slices/calendarSlice';
import { Outlet } from 'react-router-dom';

const CalendarContainer = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
`;

const CalendarContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    dispatch(getEventList());
  };
  return (
    <CalendarContainer>
      <CalendarFilter />
      <CalendarComponent />
      <Outlet />
    </CalendarContainer>
  );
};
export default CalendarContent;
