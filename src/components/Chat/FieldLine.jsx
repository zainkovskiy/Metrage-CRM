import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

const FieldLineHeaderStyle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};  
`
const FieldLine = () => {
  return (
    <>
      <FieldLineHeaderStyle>
        <TextSpanStyle size={24}>Открыте линии</TextSpanStyle>
      </FieldLineHeaderStyle>
    </>
  );
};

export default FieldLine;