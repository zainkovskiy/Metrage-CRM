import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import SlideResidentialBuiling from './SlideResidentialBuiling';
import SlideResidentialVillage from './SlideResidentialVillage';
import SlideResidentialBusiness from './SlideResidentialBusiness';

const SlideResidentialBuilings = () => {
  const residential = useAsyncValue();
  const getBuildingComponent = () => {
    switch (residential.JKType) {
      case 'КП':
        return SlideResidentialVillage;
      case 'ЖК':
        return SlideResidentialBuiling;
      case 'БЦ':
        return SlideResidentialBusiness;
    }
  };
  const BuildingComponent = getBuildingComponent();
  return (
    <>
      {residential.buildings?.length > 0 &&
        residential.buildings.map((building) => {
          return <BuildingComponent building={building} key={building.UID} />;
        })}
    </>
  );
};

export default SlideResidentialBuilings;
