import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import SlideObjectMeta from './SlideObjectMeta';
import SlideObjectNav from './SlideObjectNav';
import SlideObjectInfo from './SlideObjectInfo';
import SlideObjectFeature from './SlideObjectFeature';
import SlideObjectStory from './SlideObjectStory';
import { SlideBlockStyle } from '../ObjectsStyle';
import MapPlacemark from 'components/Main/MapPlacemark';
import { useWindowSize } from 'hooks/windowSize';

const SlideObjectStyle = styled.div`
  display: flex;
  height: 100%;
  gap: 0.5rem;
`
const SlideObjectContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  @media (min-width > 768){
    min-width: 450px;
  }
`

const SlideObject = ({ onCloseSlide }) => {
  const object = useAsyncValue();
  const windowSize = useWindowSize();
  const [change, setChange] = useState(false);
  const getCords = () => {
    const address = object.addressId;
    if (!address) { return }
    if (address?.geo_lat && address?.geo_lon) {
      return [address?.geo_lat, address?.geo_lon]
    }
    return
  }
  const changePhoto = (photos) => {
    object.photos = photos;
    setChange(!change);
  }
  return (
    <SlideObjectStyle>
      <SlideObjectContentStyle>
        <SlideObjectMeta />
        {
          object?.isEditor &&
          <SlideObjectNav onCloseSlide={onCloseSlide} changePhoto={changePhoto}/>
        }
        <SlideObjectInfo />
        <SlideObjectFeature />
        <SlideBlockStyle>
          <MapPlacemark cords={getCords()} disable />
        </SlideBlockStyle>
      </SlideObjectContentStyle>
      {
        windowSize > 768 && object?.isEditor &&
        <SlideObjectStory type={object?.typeEstate} id={object?.UID} />
      }
    </SlideObjectStyle>
  );
};

export default SlideObject;