import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  Clusterer,
  ObjectManager,
} from 'react-yandex-maps';
import styled from 'styled-components';
import ObjectsMapSide from './ObjectsMapSide';
const ObjectsMapStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0.5rem;
  box-sizing: border-box;
`;
const ObjectsMap = () => {
  const mapRef = useRef(null);
  const objectManagerRef = useRef(null);
  const office = useSelector((state) => state.user.office);
  const objects = useSelector((state) => state.objects.objects);
  const [targetObjects, setTargetObjects] = useState([]);
  const [center, setCenter] = React.useState(
    office === '2' ? [55.75222, 37.61556] : [55.030204, 82.92043]
  );
  useEffect(() => {
    if (objects.length === 0) {
      return;
    }
    const cordFirstObjects = [objects[0]?.AddressLat, objects[0]?.AddressLng];
    setCenter(cordFirstObjects);
  }, [objects]);

  const handleleClickObjectManager = (e) => {
    const regExp = new RegExp(/cluster/, 'g');
    const id = e.get('objectId');
    if (regExp.test(id)) {
      setTargetObjects(objectManagerRef.current.clusters.getById(id).features);
      return;
    }
    setTargetObjects([objectManagerRef.current.objects.getById(id)]);
  };
  const cleareTargetObjects = () => {
    setTargetObjects([]);
  };
  return (
    <ObjectsMapStyle>
      <YMaps
        query={{
          apikey: process.env.YANDEX_API_KEY,
        }}
      >
        <Map
          state={{ center: center, zoom: 14 }}
          width={'100%'}
          height={'100%'}
          onClick={cleareTargetObjects}
          instanceRef={(yaMap) => {
            if (yaMap) {
              mapRef.current = yaMap;
              // scrollOff();
            }
          }}
        >
          <ObjectManager
            instanceRef={objectManagerRef}
            onClick={handleleClickObjectManager}
            options={{
              clusterize: true,
              clusterDisableClickZoom: true,
              clusterGroupByCoordinates: false,
            }}
            clusters={{
              preset: 'islands#invertedVioletClusterIcons',
            }}
            objects={{
              preset: 'islands#violetCircleDotIconWithCaption',
              // iconColor: '#85009e',
            }}
            features={objects.map((object, idx) => ({
              type: 'Feature',
              id: object.UID,
              geometry: {
                type: 'Point',
                coordinates: [object?.AddressLat, object?.AddressLng],
              },
              properties: { ...object },
            }))}
            modules={['objectManager.addon.objectsBalloon']}
          />
          {/* <Clusterer
            options={{
              disableClickZoom: true,
              groupByCoordinates: false,
            }}
            onClick={(e) => {
              console.log(e);
            }}
          >
            {objects.map((object) => (
              <Placemark
                key={object.UID}
                geometry={[object?.AddressLat, object?.AddressLng]}
                onClick={() => {
                  console.log(object);
                }}
              />
            ))}
          </Clusterer> */}
          <ZoomControl />
        </Map>
      </YMaps>
      <AnimatePresence>
        {targetObjects.length > 0 && (
          <ObjectsMapSide
            targetObjects={targetObjects}
            cleareTargetObjects={cleareTargetObjects}
          />
        )}
      </AnimatePresence>
    </ObjectsMapStyle>
  );
};

export default ObjectsMap;
