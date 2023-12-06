import React from 'react';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import { SliderBlock } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import styled from 'styled-components';
const NewsTemplate = styled.div`
  font-family: ${({ theme }) => theme.font.family};
  & > img {
    width: 100% !important;
  }
`;
const SlideNewsContent = () => {
  const news = useSelector((state) => state.news.news)[0] || {};
  const template = JSON.parse(news.template);
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html, { ADD_ATTR: ['target'] }),
    };
  };
  return (
    <SliderBlock>
      <Box jc='flex-end'>
        <TextSpanStyle size={12}>Автор: Петров Петр</TextSpanStyle>
      </Box>
      <TextSpanStyle size={16}>{news?.title}</TextSpanStyle>
      <NewsTemplate
        dangerouslySetInnerHTML={createMarkup(draftToHtml(template))}
      ></NewsTemplate>
    </SliderBlock>
  );
};

export default SlideNewsContent;
