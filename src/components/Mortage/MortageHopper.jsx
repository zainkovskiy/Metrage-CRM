import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MortageHopperItem from './MortageHopperItem';

const MortageHopperStyle = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  padding-right: 1.5rem;
  box-sizing: border-box;
`;
const MortageHopper = () => {
  const { hopper } = useSelector((state) => state.mortage);
  return (
    <MortageHopperStyle>
      {hopper.map((hop) => (
        <MortageHopperItem key={hop.name} hop={hop} />
      ))}
    </MortageHopperStyle>
  );
};

export default MortageHopper;
