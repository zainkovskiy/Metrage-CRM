import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import closeUrl from 'images/close.svg';
import { TextSpanStyle } from 'styles/styles';
import { device } from 'styles/device';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const DialogMapStyle = styled.div`
  width: 60vw;
  height: 60vh;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  @media ${device.tablet} {
    width: calc(100vw - 1rem);
    height: 80vh;
  }
`;
const DialogMapHeader = styled.div`
  padding: 0.5rem 0.5rem 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;
const DialogMapContent = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  flex-grow: 1;
`;
const ButtonClose = styled.img`
  width: 18px;
  height: 18px;
  opacity: 0.5;
  cursor: pointer;
  transition: transform 0.3s;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
  }
  @media (hover: none) {
    &:active {
      transform: scale(0.9);
    }
  }
`;

const DialogMap = ({ onClose }) => {
  const residential = useAsyncValue();
  console.log(residential);
  const getCentar = () => {
    if (residential?.lat && residential?.lng) {
      return [residential?.lat, residential?.lng];
    }
    return [55.030204, 82.92043];
  };
  const center = getCentar();
  console.log(residential);
  return (
    <DialogMapStyle onClick={(e) => e.stopPropagation()}>
      <DialogMapHeader>
        <TextSpanStyle>{residential?.name || ''}</TextSpanStyle>
        <ButtonClose src={closeUrl} onClick={onClose} />
      </DialogMapHeader>
      <DialogMapContent>
        <YMaps
          query={{
            apikey: process.env.YANDEX_API_KEY,
          }}
        >
          <Map
            state={{ center: center, zoom: 14 }}
            width={'100%'}
            height={'100%'}
          >
            <Placemark
              geometry={center}
              // options={{
              //   iconColor: residential?.JKType === 'КП' ? '#058002' : '#1e98ff',
              // }}
            />
          </Map>
        </YMaps>
      </DialogMapContent>
    </DialogMapStyle>
  );
};

export default DialogMap;
