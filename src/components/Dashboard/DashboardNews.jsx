import React from 'react';
import styled from 'styled-components';
import imgErrorUrl from 'images/img-error.svg';
import { TextSpanStyle } from '../../styles/styles';
import { Link } from 'react-router-dom';

const DashboardNewsStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 40px 0 40px 0;
`;
const TextSpanStyleBorder = styled(TextSpanStyle)`
  border-bottom: 1px solid black;
`;
const NewsContainer = styled.div`
  height: 250px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;
const NewsItem = styled.div`
  display: flex;
  gap: 0.5rem;
  &:not(:last-child) {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #cbcbcb;
  }
`;
const NewsImage = styled.img`
  width: 100px;
  min-width: 100px;
  height: 70px;
  object-fit: cover;
`;
const NewsTitle = styled(TextSpanStyle)`
  height: 52.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  -moz-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
const NewsLink = styled(Link)`
  color: ${({ theme }) => theme.color.primary};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  text-align: end;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const NewsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;
const DashboardNews = ({ news }) => {
  return (
    <DashboardNewsStyle>
      <TextSpanStyleBorder align='end'>Новости</TextSpanStyleBorder>
      <NewsContainer>
        {news.map((item) => (
          <NewsItem key={item.UID}>
            <NewsImage src={item?.imageUrl || imgErrorUrl} />
            <NewsWrap>
              <NewsTitle>{item?.title || ''}</NewsTitle>
              <NewsLink to={`/news/${item.UID}`}>Читать</NewsLink>
            </NewsWrap>
          </NewsItem>
        ))}
      </NewsContainer>
    </DashboardNewsStyle>
  );
};

export default DashboardNews;
