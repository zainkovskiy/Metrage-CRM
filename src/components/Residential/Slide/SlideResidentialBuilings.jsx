import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import SlideResidentialBuiling from './SlideResidentialBuiling';

const SlideResidentialBuilings = () => {
  const residential = useAsyncValue();
  return (
    <>
      {residential.buildings?.length > 0 &&
        residential.buildings.map((building) => (
          <SlideResidentialBuiling key={building.UID} building={building} />
        ))}
    </>
  );
};

export default SlideResidentialBuilings;
