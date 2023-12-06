import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { device } from 'styles/device';
import NewsCard from './NewsCard';

const NewsStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: min-content;
  width: 100%;
  gap: 1rem;
  @media ${device.tablet} {
    gap: 0.5rem;
  }
`;
const News = () => {
  const news = useSelector((state) => state.news.news);
  return (
    <NewsStyle>
      {news.map((broadcast, idx) => (
        <NewsCard key={idx} broadcast={broadcast} />
      ))}
    </NewsStyle>
  );
};

export default News;
