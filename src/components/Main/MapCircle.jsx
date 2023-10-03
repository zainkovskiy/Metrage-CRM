import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import {
  YMaps,
  Map,
  Button,
  Circle,
  FullscreenControl,
  ZoomControl,
} from 'react-yandex-maps';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';

const MapCircle = forwardRef(({ circle, onChange, error }, ref) => {
  const mapRef = React.useRef(null);
  const circleRef = React.useRef(null);
  const ymapRef = React.useRef(null);
  const office = useSelector((state) => state.user.office);
  const [drawCircle, setDrawCircle] = React.useState(false);
  const [fullScreen, setFullscreen] = React.useState(false);

  React.useEffect(() => {
    if (circleRef.current) {
      if (drawCircle) {
        startDraw();
        return;
      }
      stopDraw();
    }
  }, [drawCircle]);
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

  const isDraw = () => {
    setDrawCircle(!drawCircle);
  };
  const startDraw = () => {
    circleRef.current.editor.startDrawing();
    circleRef.current.editor.events.add('statechange', (event) => {
      setCircleCords();
    });
  };
  const stopDraw = () => {
    circleRef.current.editor.stopEditing();
  };
  const setCircleCords = () => {
    onChange([
      circleRef.current.geometry.getCoordinates(),
      circleRef.current.geometry.getRadius(),
    ]);
  };
  const toggleFullScreen = () => {
    setFullscreen(!fullScreen);
  };
  const defaueltCords = () => {
    if (office === '1') {
      return [55.030204, 82.92043];
    }
    return [55.75222, 37.61556];
  };
  return (
    <YMaps
      query={{
        apikey: process.env.YANDEX_API_KEY,
        // load: 'package.full'
      }}
      ref={ymapRef}
    >
      <Map
        defaultState={{
          center: circle ? circle[0] : defaueltCords(),
          zoom: 14,
        }}
        width={'100%'}
        height={250}
        modules={['geoObject.addon.editor', 'LoadingObjectManager']}
        instanceRef={(yaMap) => {
          if (yaMap) {
            mapRef.current = yaMap;
            scrollOff();
          }
        }}
      >
        <Circle
          instanceRef={circleRef}
          geometry={circle || []}
          onClick={() => circleRef.current.editor.stopEditing()}
          options={{
            editorDrawingCursor: 'crosshair',
          }}
        />
        <Button
          data={{
            image: `${
              drawCircle
                ? 'https://crm.centralnoe.ru/dealincom/assets/img/remove_icon.png'
                : 'https://crm.centralnoe.ru/dealincom/assets/svg/location-pin-svgrepo-com.svg'
            }`,
            title: `${drawCircle ? 'Отменить' : 'Указать на карте (круг)'}`,
          }}
          options={{
            float: 'left',
            position: {
              left: 10,
              top: 10,
            },
          }}
          onClick={isDraw}
        />
        <FullscreenControl onClick={toggleFullScreen} />
        <ZoomControl />
      </Map>
      {error?.message && (
        <Box>
          <TextSpanStyle color='red' size={12}>
            {error?.message && error.message}
          </TextSpanStyle>
          <input
            type='text'
            ref={ref}
            style={{ height: 0, width: 0, border: 'none' }}
          />
        </Box>
      )}
    </YMaps>
  );
});

export default MapCircle;
