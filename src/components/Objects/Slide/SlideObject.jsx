import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import SlideObjectMeta from './SlideObjectMeta';
import SlideObjectNav from './SlideObjectNav';
import SlideObjectInfo from './SlideObjectInfo';
import SlideObjectAd from './SlideObjectAd';
import SlideObjectFeature from './SlideObjectFeature';
import SlideObjectStory from './SlideObjectStory';
import { SlideBlockStyle } from '../ObjectsStyle';
import MapPlacemark from 'components/Main/MapPlacemark';
import { useWindowSize } from 'hooks/windowSize';
import SlideObjectStatus from './SlideObjectStatus';
import SlideToMyObject from './SlideToMyObject';

const SlideObjectStyle = styled.div`
  height: 100%;
  display: flex;
  gap: 0.5rem;
`;
const SlideObjectContext = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  @media (min-width > 768) {
    min-width: 450px;
  }
`;

const SlideObject = ({ onCloseSlide }) => {
  const object = useAsyncValue();
  const windowSize = useWindowSize();
  const [change, setChange] = useState(false);
  const getCords = () => {
    const address = object.addressId;
    if (!address) {
      return;
    }
    if (address?.geo_lat && address?.geo_lon) {
      return [address?.geo_lat, address?.geo_lon];
    }
    return;
  };
  const changePhoto = (photos) => {
    object.photos = photos;
    setChange(!change);
  };
  if (JSON.stringify(object) === '{}') {
    return;
  }
  return (
    <SlideObjectStyle>
      <SlideObjectContext>
        <SlideObjectMeta />
        <SlideObjectStatus />
        {object?.isEditor && (
          <SlideObjectNav
            onCloseSlide={onCloseSlide}
            changePhoto={changePhoto}
          />
        )}
        <SlideObjectInfo />
        {object?.subtypeEstate === 'liveExternal' ||
        object?.subtypeEstate === 'businessExternal' ? (
          <SlideToMyObject />
        ) : (
          <SlideObjectAd />
        )}
        <SlideObjectFeature />
        <SlideBlockStyle>
          <MapPlacemark cords={getCords()} disable height={300} />
        </SlideBlockStyle>
        {windowSize <= 768 && object?.isEditor && (
          <SlideObjectStory
            type={object?.typeEstate}
            id={object?.UID}
            fullWidth
            height={500}
          />
        )}
      </SlideObjectContext>
      {windowSize > 768 && object?.isEditor && (
        <SlideObjectStory type={object?.typeEstate} id={object?.UID} />
      )}
    </SlideObjectStyle>
  );
};

export default SlideObject;
