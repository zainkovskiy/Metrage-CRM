import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import SlideObjectMeta from './SlideObjectMeta';
import SlideObjectNav from './SlideObjectNav';
import SlideObjectInfo from './SlideObjectInfo';
import SlideObjectFeature from './SlideObjectFeature';
import SlideObjectStory from './SlideObjectStory';
import { SlideBlockStyle } from '../ObjectsStyle';
import MapPlacemark from 'components/Main/MapPlacemark';

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

const SlideObject = () => {
  const object = useAsyncValue();
  console.log(object);

  const getCords = () => {
    const address = object.addressId;
    if (!address) { return }
    if (address?.geo_lat && address?.geo_lon) {
      return [address?.geo_lat, address?.geo_lon]
    }
    return 
  }
  return (
    <SlideObjectStyle>
      <SlideObjectContentStyle>
        <SlideObjectMeta />
        {
          object?.isEditor &&
          <SlideObjectNav />
        }
        <SlideObjectInfo />
        <SlideObjectFeature />
        <SlideBlockStyle>
          <MapPlacemark cords={getCords()} disable/>
        </SlideBlockStyle>
      </SlideObjectContentStyle>
      {
        object?.isEditor &&
        <SlideObjectStory />
      }
    </SlideObjectStyle>
  );
};

export default SlideObject;