import React, { useState } from 'react';
import styled from 'styled-components';
import SlideMapPlacemark from './SlideMapPlacemark';
import closeUrl from 'images/close.svg';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from '../../../styles/styles';
import { Box } from 'ui/Box';
import { useSelector } from 'react-redux';
import { device } from '../../../styles/device';

const SlideDialogMapStyle = styled.div`
  width: 80vw;
  height: 70vh;
  border-radius: 5px;
  background: #fff;
  @media (${device.tablet}) {
    width: calc(100vw - 1rem);
  }
`;
const CloseButtonStyle = styled.img`
  width: 18px;
  height: 18px;
  opacity: 0.5;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;
const DialogMapHeader = styled.div`
  padding: 1rem 1rem 0 1rem;
  box-sizing: border-box;
  border-radius: 5px;
  background: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media (${device.tablet}) {
    padding: 0.5rem 0.5rem 0 0.5rem;
  }
`;
const DialogMapContext = styled.div`
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 5px;
  background: #fff;
  height: 100%;
  @media (${device.tablet}) {
    padding: 0.5rem;
  }
`;

const SlideDialogMap = ({ onClose }) => {
  const object = useAsyncValue();
  const office = useSelector((state) => state.user.office);
  const [countObject, serCountObject] = useState(0);

  const getCords = () => {
    const address = object.addressId;
    if (address?.geo_lat && address?.geo_lon) {
      return [address?.geo_lat, address?.geo_lon];
    }
    return office === '2' ? [55.75222, 37.61556] : [55.030204, 82.92043];
  };
  const getCountObject = (count) => {
    serCountObject(count);
  };
  return (
    <SlideDialogMapStyle onClick={(e) => e.stopPropagation()}>
      <DialogMapHeader>
        <Box column ai='flex-start' gap='0'>
          <TextSpanStyle>{object?.addressId?.addrString || ''}</TextSpanStyle>
          <TextSpanStyle size={12}>
            Похожих вариантов: {countObject}
          </TextSpanStyle>
        </Box>
        <CloseButtonStyle src={closeUrl} alt='close' onClick={onClose} />
      </DialogMapHeader>
      <DialogMapContext>
        <SlideMapPlacemark
          cords={getCords()}
          height={'100%'}
          apiTemplate={`${object?.subTypeEstate}_${object?.UID}`}
          getCountObject={getCountObject}
        />
      </DialogMapContext>
    </SlideDialogMapStyle>
  );
};

export default SlideDialogMap;
