import React from 'react';
import styled from 'styled-components';
import SlideResidentialFlat from './!!!SlideResidentialFlat';
import { TextSpanStyle } from 'styles/styles';

const ResidentialFloor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const ResidentialFlats = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

const SlideResidentialFloor = ({ floor }) => {
  return (
    <ResidentialFloor>
      <TextSpanStyle>{floor.floor}</TextSpanStyle>
      <ResidentialFlats>
        {floor.appartments.map((flat, idx) => (
          <SlideResidentialFlat key={idx} flat={flat} />
        ))}
      </ResidentialFlats>
    </ResidentialFloor>
  );
};

export default SlideResidentialFloor;
