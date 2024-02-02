import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  YMaps,
  Map,
  FullscreenControl,
  Placemark,
  ZoomControl,
} from 'react-yandex-maps';
import styled from 'styled-components';

const ResidentialsMapContainer = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  flex-grow: 1;
`;

const ResidentialsMap = () => {
  const navigate = useNavigate();
  const residentials = useSelector((state) => state.residential.residentials);
  const office = useSelector((state) => state.user.office);
  // const center = office === '2' ? [55.75222, 37.61556] : [55.030204, 82.92043];
  const center = [55.030204, 82.92043];
  const openSlide = (residential) => {
    navigate(`${residential.UID}`);
  };
  return (
    <ResidentialsMapContainer>
      <YMaps
        query={{
          apikey: process.env.YANDEX_API_KEY,
        }}
      >
        <Map state={{ center: center, zoom: 14 }} width='100%' height='100%'>
          {residentials.map((item, idx) => {
            if (item?.lat && item?.lng) {
              return (
                <Placemark
                  key={idx}
                  geometry={[item.lat, item.lng]}
                  onClick={() => openSlide(item)}
                />
              );
            }
          })}
          {/* <FullscreenControl onClick={toggleFullScreen} />
          <ZoomControl /> */}
        </Map>
      </YMaps>
    </ResidentialsMapContainer>
  );
};

export default ResidentialsMap;
