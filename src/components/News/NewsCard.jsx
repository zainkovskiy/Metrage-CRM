import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import imgErrorUrl from 'images/img-error.svg';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import { motion } from 'framer-motion';

const LinkStyle = styled(Link)`
  text-decoration: none;
`;
const NewsCardStyle = styled(motion.div)`
  background-color: #93669a;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
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
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
const NewsCard = ({ broadcast }) => {
  return (
    <LinkStyle to={`${broadcast?.UID || ''}`}>
      <NewsCardStyle variants={variants} initial='hidden' animate='visible'>
        <NewsCardHeader>
          <TextSpanStyle align='end' color='#fff' size={10}>
            #{broadcast?.UID || ''}
          </TextSpanStyle>
          <TextSpanStyle color='#fff' size={12}>
            {broadcast.title}
          </TextSpanStyle>
        </NewsCardHeader>
        <NewsImage src={broadcast?.imageUrl || imgErrorUrl} />
        <NewsCardFooter>
          <TextSpanStyle color='#fff' size={10}>
            {broadcast?.author || ''}
          </TextSpanStyle>
          <TextSpanStyle color='#fff' size={10}>
            {useDateFormat(broadcast?.created)}
          </TextSpanStyle>
        </NewsCardFooter>
      </NewsCardStyle>
    </LinkStyle>
  );
};

export default NewsCard;
