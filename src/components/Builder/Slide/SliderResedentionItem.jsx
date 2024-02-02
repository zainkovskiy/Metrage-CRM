import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { Link } from 'react-router-dom';

const Resedention = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
`;
const ResedentionImage = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
`;
const ResedentionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  box-sizing: border-box;
`;
const CustomLink = styled(Link)`
  color: rgb(120, 120, 120);
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const SliderResedentionItem = ({ resedention }) => {
  return (
    <Resedention>
      <ResedentionImage src={resedention.picture} />
      <ResedentionFooter>
        <TextSpanStyle size={24} color='#85009E'>
          {resedention.name}
        </TextSpanStyle>
        <CustomLink to={`/residential/${resedention.UID}`}>Открыть</CustomLink>
      </ResedentionFooter>
    </Resedention>
  );
};

export default SliderResedentionItem;
