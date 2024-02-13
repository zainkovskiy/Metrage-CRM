import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import SlideObjectMeta from './SlideObjectMeta';
import SlideObjectNav from './SlideObjectNav';
import SlideObjectInfo from './SlideObjectInfo';
import SlideObjectAd from './SlideObjectAd';
import SlideObjectFeature from './SlideObjectFeature';
import SlideObjectStory from './SlideObjectStory';
import { useWindowSize } from 'hooks/windowSize';
import SlideObjectStatus from './SlideObjectStatus';
import SlideToMyObject from './SlideToMyObject';
import SlideObjectDocs from './SlideObjectDocs';

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

  const toggleChange = () => {
    setChange(!change);
  };
  const changePhoto = (photos) => {
    object.photos = photos;
    toggleChange();
  };
  if (JSON.stringify(object) === '{}') {
    return;
  }
  const getTypeEstateComponent = () => {
    switch (object?.subTypeEstate) {
      case 'liveExternal':
        return <SlideToMyObject />;
      case 'businessExternal':
        return <SlideToMyObject />;
      case 'live':
        return <SlideObjectAd />;
      case 'business':
        return <SlideObjectAd />;
      default:
        break;
    }
  };
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
        <SlideObjectInfo toggleChange={toggleChange} />
        {getTypeEstateComponent()}
        <SlideObjectFeature />
        {windowSize <= 768 && object?.isEditor && (
          <SlideObjectStory
            type={object?.typeEstate}
            id={object?.UID}
            fullWidth
            height={500}
          />
        )}
        {object?.isEditor && <SlideObjectDocs />}
      </SlideObjectContext>
      {windowSize > 768 && object?.isEditor && (
        <SlideObjectStory type={object?.typeEstate} id={object?.UID} />
      )}
    </SlideObjectStyle>
  );
};

export default SlideObject;
