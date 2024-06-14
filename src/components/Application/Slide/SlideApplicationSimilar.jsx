import React, { useState } from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import SlideMapPlacemark from '../../Objects/Slide/SlideMapPlacemark';
import { useAsyncValue } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Loader from 'components/Main/Loader';
import { TextSpanStyle } from '../../../styles/styles';
import {
  ButtonToggleGroup,
  ButtonToggleItem,
} from 'ui/ButtonToggle/ButtonToggle';

const ApplicationSimilar = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SlideApplicationSimilar = ({ moveToNewSelectList, selectList }) => {
  const application = useAsyncValue();
  const office = useSelector((state) => state.user.office);
  const loadingSave = useSelector((state) => state.application.loadingSave);
  const getCords = () => {
    if (application?.object?.lat && application?.object?.lng) {
      return [application.object.lat, application.object.lng];
    }
    return office === '2' ? [55.75222, 37.61556] : [55.030204, 82.92043];
  };
  const [base, setBase] = useState('inbase');
  const getSelect = (select) => {
    moveToNewSelectList(select);
  };
  const changeBase = (e) => {
    const newBase = e.target.id;
    setBase(newBase);
  };
  return (
    <ApplicationSimilar>
      <SliderTitle>Подходящие варианты</SliderTitle>
      <ButtonToggleGroup fullWidth>
        <ButtonToggleItem id='inbase' active={base} onClick={changeBase}>
          НАША БАЗА
        </ButtonToggleItem>
        <ButtonToggleItem id='outbase' active={base} onClick={changeBase}>
          ВНЕШНЯЯ
        </ButtonToggleItem>
      </ButtonToggleGroup>
      <TextSpanStyle size={12} bold color='#85009e'>
        Метками на карте отображены похожие объекты. При отсутствии вариантов -
        отдалите карту
      </TextSpanStyle>
      <MapContainer>
        {loadingSave ? (
          <Loader />
        ) : (
          <SlideMapPlacemark
            cords={getCords()}
            height={300}
            apiTemplate={`application_${application?.UID}_${base}`}
            callbackGetItem={getSelect}
            selectList={selectList}
          />
        )}
      </MapContainer>
    </ApplicationSimilar>
  );
};

export default SlideApplicationSimilar;
