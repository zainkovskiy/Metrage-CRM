import React from 'react';
import { SliderBlock } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import SlideResidentialFloor from './SlideResidentialFloor';
import styled from 'styled-components';

const ResidentialFloors = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  margin-top: 0.5rem;
`;
const SlideResidentialBuilding = ({ building }) => {
  return (
    <SliderBlock>
      {building?.name && (
        <TextSpanStyle size={16}>Название: {building.name}</TextSpanStyle>
      )}
      {building?.house && (
        <TextSpanStyle size={12}>Номер дома: {building.house}</TextSpanStyle>
      )}
      {building?.appartments?.length > 0 && (
        <ResidentialFloors>
          {building.appartments.map((floor) => (
            <SlideResidentialFloor floor={floor} key={floor.floor} />
          ))}
        </ResidentialFloors>
      )}
    </SliderBlock>
  );
};

export default SlideResidentialBuilding;
