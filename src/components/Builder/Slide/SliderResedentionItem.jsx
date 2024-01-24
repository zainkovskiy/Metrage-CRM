import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

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

const SliderResedentionItem = ({ resedention }) => {
  return (
    <Resedention>
      <ResedentionImage src={resedention.picture} />
      <TextSpanStyle size={24} color='#85009E'>
        {resedention.name}
      </TextSpanStyle>
    </Resedention>
  );
};

export default SliderResedentionItem;
