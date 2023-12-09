import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { device } from 'styles/device';
import NewsCard from './NewsCard';
import Loader from 'components/Main/Loader';
const NewsContainer = styled.div`
  padding: 0.5rem;
  flex-grow: 1;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
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
  const loading = useSelector((state) => state.news.loadingList);

  if (loading) {
    return <Loader />;
  }
  return (
    <NewsContainer>
      <NewsStyle>
        {news.map((broadcast, idx) => (
          <NewsCard key={idx} broadcast={broadcast} />
        ))}
      </NewsStyle>
    </NewsContainer>
  );
};

export default News;
