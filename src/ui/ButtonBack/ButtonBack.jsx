import React from 'react';
import styled from 'styled-components';
import arrowUrl, { ReactComponent as Arrow } from 'images/arrow-down.svg';
import { TextSpanStyle } from 'styles/styles';
 
const ButtonBackStyle = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem;
  padding-bottom: 0;
`
const ArrowStyle = styled(Arrow)`
  width: 24px;
  height: 24px;
  transform: rotate(90deg);
  fill: #fff;
`

const ButtonBack = ({onClic}) => {
  return (
    <ButtonBackStyle onClick={onClic}>
      <ArrowStyle style={{ width: 24, height: 24 }} />
      <TextSpanStyle color='#fff'>Назад</TextSpanStyle>
    </ButtonBackStyle>
  );
};

export default ButtonBack;