import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ApplicationHopperItem from './ApplicationHopperItem';

const ApplicationHopperStyle = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  padding-right: 1.5rem;
  box-sizing: border-box;
`;
const ApplicationHopper = () => {
  const { hopper } = useSelector((state) => state.application);
  return (
    <ApplicationHopperStyle>
      {hopper.map((hop) => (
        <ApplicationHopperItem key={hop.name} hop={hop} />
      ))}
    </ApplicationHopperStyle>
  );
};

export default ApplicationHopper;
