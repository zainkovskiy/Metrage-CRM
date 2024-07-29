import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';

const DealIndexStyle = styled.div`
  display: flex;
  padding: 0 0.5rem;
  box-sizing: border-box;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const DealIndex = () => {
  const { index } = useSelector((state) => state.deal);
  return (
    <DealIndexStyle>
      <TextSpanStyle size={12}>
        Коммисия агентства: {index.comission}
      </TextSpanStyle>
      <TextSpanStyle size={12}>ЗП: {index.items}</TextSpanStyle>
      <TextSpanStyle size={12}>Кол-во: {index.zp}</TextSpanStyle>
    </DealIndexStyle>
  );
};

export default DealIndex;
