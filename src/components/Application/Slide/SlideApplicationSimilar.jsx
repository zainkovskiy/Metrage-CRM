import React from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import SlideMapPlacemark from '../../Objects/Slide/SlideMapPlacemark';
import { useAsyncValue } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';

const ApplicationSimilar = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SlideApplicationSimilar = () => {
  const application = useAsyncValue();
  const office = useSelector((state) => state.user.office);
  const loadingSave = useSelector((state) => state.application.loadingSave);
  const getCords = () => {
    return office === '2' ? [55.75222, 37.61556] : [55.030204, 82.92043];
  };
  return (
    <ApplicationSimilar>
      <SliderTitle>Подходящие варианты</SliderTitle>
      <MapContainer>
        {loadingSave ? (
          <Loader />
        ) : (
          <SlideMapPlacemark
            cords={getCords()}
            height={300}
            apiTemplate={`application_${application?.UID}`}
          />
        )}
      </MapContainer>
    </ApplicationSimilar>
  );
};

export default SlideApplicationSimilar;
