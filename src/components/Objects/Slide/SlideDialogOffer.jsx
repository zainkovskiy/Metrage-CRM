import React from 'react';
import styled from 'styled-components';
import closeUrl from 'images/close.svg';
import offer1Url from 'images/offer/offer1.jpg';
import offer2Url from 'images/offer/offer2.jpg';
import offer3Url from 'images/offer/offer3.jpg';
import offer4Url from 'images/offer/offer4.jpg';
import offer5Url from 'images/offer/offer5.jpg';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { getImageOffer } from '../../../api/objectAPI';
import { useAsyncValue } from 'react-router-dom';

const DialogOffer = styled.div`
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;
const DialogOfferHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
`;
const DialogOfferContext = styled.div`
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: space-evenly;
  overflow: auto;
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
const OfferImg = styled.img`
  height: 300px;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.03);
      box-shadow: rgba(0, 0, 0, 0.75) 7px 8px 14px -6px;
    }
    &:active {
      transform: scale(0.9);
    }
  }
  @media (hover: none) {
    &:active {
      transform: scale(1.03);
      box-shadow: rgba(0, 0, 0, 0.75) 7px 8px 14px -6px;
    }
  }
`;
const SlideDialogOffer = ({ onClose }) => {
  const object = useAsyncValue();
  const save = (e) => {
    const id = e.target.id;
    getImageOffer({
      UID: object.UID,
      type: object.subTypeEstate,
      offerTemplate: id,
    });
    onClose();
  };
  return (
    <DialogOffer onClick={(e) => e.stopPropagation()}>
      <DialogOfferHeader>
        <TextSpanStyle>Укажите шаблон</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} onClick={onClose} />
      </DialogOfferHeader>
      <DialogOfferContext>
        <OfferImg src={offer1Url} id='1' onClick={save} />
        <OfferImg src={offer2Url} id='2' onClick={save} />
        <OfferImg src={offer3Url} id='3' onClick={save} />
        <OfferImg src={offer4Url} id='4' onClick={save} />
        <OfferImg src={offer5Url} id='5' onClick={save} />
      </DialogOfferContext>
    </DialogOffer>
  );
};

export default SlideDialogOffer;
