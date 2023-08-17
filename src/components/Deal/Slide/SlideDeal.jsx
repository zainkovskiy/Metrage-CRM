import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';

const SlideDealStyle = styled.div`
  height: 100%;
  display: flex;
  gap: 0.5rem;
`
const SlideObjectContext = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  @media (min-width > 768){
    min-width: 450px;
  }
`

const SlideDeal = ({ onCloseSlide }) => {
  const deal = useAsyncValue();
  console.log(deal);
  return (
    <SlideDealStyle>
      {/* <SlideObjectContext>
        <SlideObjectMeta />
        {
          object?.isEditor &&
          <SlideObjectNav onCloseSlide={onCloseSlide} changePhoto={changePhoto} />
        }
        <SlideObjectInfo />
        <SlideObjectFeature />
        <SlideBlockStyle>
          <MapPlacemark cords={getCords()} disable height={300} />
        </SlideBlockStyle>
        {
          windowSize <= 768 && object?.isEditor &&
          <SlideObjectStory type={object?.typeEstate} id={object?.UID} fullWidth height={500}/>
        }
      </SlideObjectContext>
      {
        windowSize > 768 && object?.isEditor &&
        <SlideObjectStory type={object?.typeEstate} id={object?.UID} />
      } */}
    </SlideDealStyle>
  );
};

export default SlideDeal;