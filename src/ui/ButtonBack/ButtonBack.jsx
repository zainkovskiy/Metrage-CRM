import React from 'react';
import styled from 'styled-components';
import arrowUrl, { ReactComponent as Arrow } from 'images/arrow-down.svg';
import { TextSpanStyle } from 'styles/styles';

const ButtonBackStyle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const ArrowStyle = styled(Arrow)`
  width: 20px;
  height: 20px;
  transform: rotate(90deg);
  ${({ $fill }) => $fill && `fill: ${$fill};`}
`;

const ButtonBack = ({ onClick, color }) => {
  return (
    <ButtonBackStyle onClick={onClick}>
      <ArrowStyle $fill={color} />
      <TextSpanStyle color={color}>Назад</TextSpanStyle>
    </ButtonBackStyle>
  );
};

export default ButtonBack;
