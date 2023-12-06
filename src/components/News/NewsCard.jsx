import React from 'react';
import imgErrorUrl from 'images/img-error.svg';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { Link } from 'react-router-dom';

const NewsCardStyle = styled(Link)`
  background-color: #93669a;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  text-decoration: none;
`;
const NewsImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  padding: 0 0.5rem;
  box-sizing: border-box;
`;
const NewsCardHeader = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  flex-grow: 1;
`;
const NewsCardFooter = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;
const NewsCard = ({ broadcast }) => {
  return (
    <NewsCardStyle to='1'>
      <NewsCardHeader>
        <TextSpanStyle align='end' color='#fff' size={10}>
          #23
        </TextSpanStyle>
        <TextSpanStyle color='#fff' size={12}>
          {broadcast.title}
        </TextSpanStyle>
      </NewsCardHeader>
      <NewsImage src={broadcast?.imageUrl || imgErrorUrl} />
      <NewsCardFooter>
        <TextSpanStyle color='#fff' size={10}>
          Петров Петр
        </TextSpanStyle>
        <TextSpanStyle color='#fff' size={10}>
          12.12.2023
        </TextSpanStyle>
      </NewsCardFooter>
    </NewsCardStyle>
  );
};

export default NewsCard;
