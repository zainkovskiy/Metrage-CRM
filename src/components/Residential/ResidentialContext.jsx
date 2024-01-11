import React, { Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import { getNewsList } from '../../store/slices/newsSlice';
import { useDispatch, useSelector } from 'react-redux';

const ResidentialContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;
const NewsContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getList();
    // return () => {
    //   dispatch(clearDeals());
    // };
  }, []);
  const getList = () => {
    // dispatch(getNewsList());
  };
  return (
    <ResidentialContentStyle>
      <Link to='1'>to slide</Link>
      <Outlet />
    </ResidentialContentStyle>
  );
};

export default NewsContent;
