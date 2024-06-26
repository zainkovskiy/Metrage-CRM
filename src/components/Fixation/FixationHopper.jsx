import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import FixationHopperItem from './FixationHopperItem';

const FixationHopperStyle = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  padding-right: 1.5rem;
  box-sizing: border-box;
`;
//TODO: вынести в отдельный компонент
const FixationHopper = () => {
  const { hopper } = useSelector((state) => state.fixation);
  return (
    <FixationHopperStyle>
      {hopper.map((hop) => (
        <FixationHopperItem key={hop.name} hop={hop} />
      ))}
    </FixationHopperStyle>
  );
};

export default FixationHopper;
