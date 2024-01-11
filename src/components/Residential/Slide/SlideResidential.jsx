import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import SlideResidentialInfo from './SlideResidentialInfo';
import SlideResidentialBuilding from './SlideResidentialBuilding';

const SlideResidential = () => {
  const residential = useAsyncValue();
  return (
    <SliderStyle>
      <SliderContext>
        <SlideResidentialInfo />
        {residential?.buildings?.length > 0 &&
          residential.buildings.map((building) => (
            <SlideResidentialBuilding building={building} key={building.UID} />
          ))}
      </SliderContext>
    </SliderStyle>
  );
};

export default SlideResidential;
