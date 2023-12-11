import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import FilterNews from './FilterNews';
import News from './News';
import { getNewsList } from '../../store/slices/newsSlice';
import { useDispatch, useSelector } from 'react-redux';

const NewsContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;
const NewsContent = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user?.isAdmin || '');
  useEffect(() => {
    getList();
    // return () => {
    //   dispatch(clearDeals());
    // };
  }, []);
  const getList = () => {
    dispatch(getNewsList());
  };
  return (
    <NewsContentStyle>
      {isAdmin === '1' && <FilterNews />}
      <News />
      <Outlet />
    </NewsContentStyle>
  );
};

export default NewsContent;
