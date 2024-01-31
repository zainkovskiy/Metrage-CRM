import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

const ResidentialFlat = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #ccc;
  padding: 0.5rem;
  ${({ $isGray }) => $isGray && 'background-color: #ccc;'};
`;

const SlideResidentialFlat = ({ flat }) => {
  return (
    <ResidentialFlat $isGray={flat.status === 'sold'}>
      <TextSpanStyle>{flat.type}</TextSpanStyle>
      <TextSpanStyle>{flat.price}</TextSpanStyle>
    </ResidentialFlat>
  );
};

export default SlideResidentialFlat;

//варики free/sold/booking
//free - свободна, sold - продана и бронь соответственно
