import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import FilterNews from './FilterNews';
import News from './News';

const NewsContentStyle = styled.div`
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
`;
const NewsContent = () => {
  return (
    <NewsContentStyle>
      <FilterNews />
      <News />
      <Outlet />
    </NewsContentStyle>
  );
};

export default NewsContent;
