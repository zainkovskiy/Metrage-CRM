import React, { forwardRef } from "react";
import { YMaps, Map, Button, Circle, FullscreenControl, ZoomControl } from 'react-yandex-maps';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';

const MapCircle = forwardRef(({ circle, onChange, error }, ref) => {
  const mapRef = React.useRef(null);
  const circleRef = React.useRef(null);
  const ymapRef = React.useRef(null);
  const [drawCircle, setDrawCircle] = React.useState(false);
  const [fullScreen, setFullscreen] = React.useState(false);

  React.useEffect(() => {
    if (circleRef.current) {
      if (drawCircle) {
        startDraw();
        return
      }
      stopDraw();
    }
  }, [drawCircle])
  const scrollOff = () => {
    mapRef.current.behaviors.disable('scrollZoom');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      //... отключаем перетаскивание карты
      mapRef.current.behaviors.disable('drag');
    }
  }

  const isDraw = () => {
    setDrawCircle(!drawCircle);
  }
  const startDraw = () => {
    circleRef.current.editor.startDrawing();
    circleRef.current.editor.events.add("statechange", event => {
      setCircleCords();
    });
  };
  const stopDraw = () => {
    circleRef.current.editor.stopEditing();
  }
  const setCircleCords = () => {
    onChange([circleRef.current.geometry.getCoordinates(), circleRef.current.geometry.getRadius()]);
  }
  const toggleFullScreen = () => {
    setFullscreen(!fullScreen);
  }
  return (
    <YMaps
      query={{
        apikey: 'a890e783-cb17-4f01-88cd-0030e80a7572',
        // load: 'package.full' 
      }}
      ref={ymapRef}
    >
      <Map
        defaultState={{ center: circle ? circle[0] : [55.030204, 82.920430], zoom: 14 }}
        width={'100%'}
        height={250}
        modules={["geoObject.addon.editor", 'LoadingObjectManager']}
        instanceRef={yaMap => {
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
            editorDrawingCursor: "crosshair",
          }}
        />
        <Button
          data={{
            image: `${drawCircle ?
              'https://crm.centralnoe.ru/dealincom/assets/img/remove_icon.png' :
              'https://crm.centralnoe.ru/dealincom/assets/svg/location-pin-svgrepo-com.svg'
              }`,
            title: `${drawCircle ? 'Отменить' : 'Указать на карте (круг)'}`,
          }}
          options={{
            float: 'left',
            position: {
              left: 10,
              top: 10
            }
          }}
          onClick={isDraw}
        />
        <FullscreenControl onClick={toggleFullScreen} />
        <ZoomControl/>
      </Map>
      {
        error?.message &&
        <Box>
          <TextSpanStyle color='red' size={12}>{error?.message && error.message}</TextSpanStyle>
          <input type="text" ref={ref} style={{ height: 0, width: 0, border: 'none' }} />
        </Box>
      }
    </YMaps >
  )
})

export default MapCircle;