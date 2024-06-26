import React from 'react';
import { Circle, YMaps, Map } from 'react-yandex-maps';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useAsyncValue } from 'react-router-dom';
import { SliderTitle } from 'styles/slider';

const TaskObjectInfoStyle = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const buyTypeTranslate = {
  forMyself: 'Покупает себе',
  forBusiness: 'Для заработка',
};
const SlideApplicationObjectInfo = () => {
  const application = useAsyncValue();
  const demand = application?.demand;
  return (
    <TaskObjectInfoStyle>
      <SliderTitle>Потребность</SliderTitle>
      <TextSpanStyle>{demand?.typePlace}</TextSpanStyle>
      {application?.buyType && (
        <TextSpanStyle>
          Причина покупки: {buyTypeTranslate[application?.buyType]}
        </TextSpanStyle>
      )}
      {demand?.address?.value && (
        <TextSpanStyle>{demand?.address?.value}</TextSpanStyle>
      )}
      {demand?.cords && (
        <YMaps>
          <Map
            defaultState={{
              center: demand?.cords?.[0] || [55.030204, 82.92043],
              zoom: 12,
            }}
            width={'100%'}
            height={250}
          >
            <Circle geometry={demand?.cords} />
          </Map>
        </YMaps>
      )}
    </TaskObjectInfoStyle>
  );
};

export default SlideApplicationObjectInfo;
