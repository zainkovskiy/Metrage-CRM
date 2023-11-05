import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  YMaps,
  Map,
  FullscreenControl,
  Placemark,
  ZoomControl,
  Clusterer,
} from 'react-yandex-maps';
import SlideMapObjectsList from './SlideMapObjectsList';

const SlideMapPlacemarkContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;
const SlideMapPlacemark = ({ cords, height, apiTemplate }) => {
  const mapRef = useRef(null);
  const ymapRef = useRef(null);
  const objectManagerRef = useRef(null);
  const [fullScreen, setFullscreen] = React.useState(false);
  const [otherObjects, setOtherObjects] = useState([]);

  const scrollOff = () => {
    mapRef.current.behaviors.disable('scrollZoom');
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      //... отключаем перетаскивание карты
      mapRef.current.behaviors.disable('drag');
    }
  };

  const toggleFullScreen = () => {
    setFullscreen(!fullScreen);
  };
  const cleareOtherList = () => {
    if (otherObjects.length > 0) {
      setOtherObjects([]);
    }
  };
  const setListOtherObjects = (other) => {
    if (other.type === 'object') {
      setOtherObjects([other.object.properties]);
    }
    if (other.type === 'cluster') {
      const otherArr = other.object.map((item) => {
        return item.properties;
      });
      setOtherObjects(otherArr);
    }
  };
  const init = () => {
    const loadingObjectManager = new ymapRef.current.LoadingObjectManager(
      'https://crm.metragegroup.com/API/bBox.php/?bbox=%b',
      {
        // Включаем кластеризацию.
        clusterize: true,
        // Опции кластеров задаются с префиксом cluster.
        clusterHasBalloon: false,
        // Опции объектов задаются с префиксом geoObject.
        geoObjectOpenBalloonOnClick: false,
        // Отключает zoom при клике
        clusterDisableClickZoom: true,
        paddingTemplate: `${apiTemplate}_%b`,
      }
    );
    objectManagerRef.current = loadingObjectManager;
    function onObjectClick(e) {
      const objectId = e.get('objectId');
      const object = loadingObjectManager.objects.getById(objectId);
      setListOtherObjects({
        object: object,
        type: 'object',
      });
    }
    function onClickCluster(e) {
      const clustertId = e.get('objectId');
      const cluster = loadingObjectManager.clusters.getById(clustertId);
      setListOtherObjects({
        object: cluster.features,
        type: 'cluster',
      });
    }
    loadingObjectManager.objects.events.add(['click'], onObjectClick);
    loadingObjectManager.clusters.events.add(['click'], onClickCluster);
    mapRef.current.geoObjects.add(objectManagerRef.current);
  };
  return (
    <SlideMapPlacemarkContainer>
      <YMaps
        query={{
          apikey: process.env.YANDEX_API_KEY,
        }}
      >
        <Map
          state={{ center: cords, zoom: 14 }}
          width={'100%'}
          height={height || 250}
          onClick={cleareOtherList}
          modules={['geoObject.addon.editor', 'LoadingObjectManager']}
          onLoad={(ymaps) => {
            ymaps.ready(() => {
              ymapRef.current = ymaps;
              init();
            });
          }}
          instanceRef={(yaMap) => {
            if (yaMap) {
              mapRef.current = yaMap;
              scrollOff();
            }
          }}
        >
          <Placemark
            geometry={cords}
            options={{
              iconColor: `#85009e`,
            }}
          />
          <FullscreenControl onClick={toggleFullScreen} />
          <ZoomControl />
        </Map>
      </YMaps>
      <AnimatePresence>
        {otherObjects.length > 0 && (
          <SlideMapObjectsList
            cleareOtherList={cleareOtherList}
            otherList={otherObjects}
          />
        )}
      </AnimatePresence>
    </SlideMapPlacemarkContainer>
  );
};

export default SlideMapPlacemark;
