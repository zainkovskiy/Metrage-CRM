import React, { forwardRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  YMaps,
  Map,
  FullscreenControl,
  Placemark,
  ZoomControl,
} from 'react-yandex-maps';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';

const MapPlacemark = forwardRef(
  ({ onChange, error, cords, clearErrors, disable, height }, ref) => {
    const office = useSelector((state) => state.user.office);
    const [center, setCenter] = React.useState(
      cords || office === '2' ? [55.75222, 37.61556] : [55.030204, 82.92043]
    );
    const mapRef = React.useRef(null);
    const [fullScreen, setFullscreen] = React.useState(false);
    useEffect(() => {
      if (!cords) {
        return;
      }
      if (typeof cords[0] === 'number') {
        return;
      }
      setCenter(cords);
    }, [cords]);
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
    const handleClick = (event) => {
      if (disable) {
        return;
      }
      const cords = event.get('coords');
      onChange && onChange(cords);
      if (error?.message) {
        clearErrors('cords');
      }
    };
    return (
      <YMaps
        query={{
          apikey: process.env.YANDEX_API_KEY,
        }}
      >
        <Map
          state={{ center: center, zoom: 14 }}
          width={'100%'}
          height={height || 250}
          onClick={(event) => handleClick(event)}
          instanceRef={(yaMap) => {
            if (yaMap) {
              mapRef.current = yaMap;
              scrollOff();
            }
          }}
        >
          <Placemark geometry={cords || [55.030204, 82.92043]} />
          <FullscreenControl onClick={toggleFullScreen} />
          <ZoomControl />
        </Map>
        {error?.message && (
          <Box jc='flex-start'>
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
  }
);

export default MapPlacemark;
