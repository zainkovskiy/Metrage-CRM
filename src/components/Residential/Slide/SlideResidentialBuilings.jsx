import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import SlideResidentialBuiling from './SlideResidentialBuiling';
import SlideResidentialVillage from './SlideResidentialVillage';

const SlideResidentialBuilings = () => {
  const residential = useAsyncValue();
  return (
    <>
      {residential.buildings?.length > 0 &&
        residential.buildings.map((building) => {
          if (building.isSuburban) {
            return (
              <SlideResidentialVillage key={building.UID} building={building} />
            );
          }
          return (
            <SlideResidentialBuiling key={building.UID} building={building} />
          );
        })}
    </>
  );
};

export default SlideResidentialBuilings;
