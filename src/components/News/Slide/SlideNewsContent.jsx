import React from 'react';
import styled from 'styled-components';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import { SliderBlock } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useGetAvatar } from 'hooks/MakeAvatar';
import { useSelector } from 'react-redux';

const NewsTemplate = styled.div`
  font-family: ${({ theme }) => theme.font.family};
  & > img {
    width: 100% !important;
  }
`;
const NewsContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const EditButton = styled.span`
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.primary};
  text-decoration: none;
  font-size: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const Avatar = styled.img`
  width: 16px;
  height: 16px;
  object-fit: cover;
  object-position: top;
  border-radius: 40px;
`;
const SlideNewsContent = ({ onCloseSlide }) => {
  const isAdmin = useSelector((state) => state.user?.isAdmin || '');
  const news = useAsyncValue();
  const navigate = useNavigate();
  const template = (news?.template && JSON.parse(news.template)) || null;
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html, { ADD_ATTR: ['target'] }),
    };
  };
  const clickEdit = () => {
    setTimeout(() => {
      navigate(`/news/edit/${news?.UID}`, {
        replace: true,
      });
    }, 300);
    onCloseSlide();
  };
  return (
    <SliderBlock>
      <NewsContentContainer>
        <Box jc='space-between'>
          <Box jc='flex-start'>
            <Avatar
              src={useGetAvatar({
                avatar: news?.authorId?.avatar,
                firstName: news?.authorId?.firstName,
                lastName: news?.authorId?.lastName,
              })}
            />
            <TextSpanStyle size={12}>
              {news?.authorId?.firstName} {news?.authorId?.lastName}
            </TextSpanStyle>
          </Box>
          {isAdmin === '1' && (
            <EditButton onClick={clickEdit}>Редактировать</EditButton>
          )}
        </Box>
        <TextSpanStyle bold size={20}>
          {news?.title}
        </TextSpanStyle>
        {template && (
          <NewsTemplate
            dangerouslySetInnerHTML={createMarkup(draftToHtml(template))}
          ></NewsTemplate>
        )}
      </NewsContentContainer>
    </SliderBlock>
  );
};

export default SlideNewsContent;
