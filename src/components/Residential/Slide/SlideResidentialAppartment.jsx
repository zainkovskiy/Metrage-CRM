import React, { useState } from 'react';
import styled from 'styled-components';
import DialogWindow from 'components/Main/DialogWindow';
import { TextSpanStyle } from 'styles/styles';

const Appartment = styled.div``;
const AppartmentImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: contain;
  background-color: #e2e2e2;
  cursor: pointer;
`;
const DialogImage = styled.img`
  width: 90vw;
  height: 90vh;
  object-fit: contain;
  background-color: #e2e2e2;
`;
const SlideResidentialAppartment = ({ flat }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <Appartment>
      <AppartmentImage src={flat?.plan || ''} onClick={toggleOpen} />
      <TextSpanStyle size={10}>Этаж: {flat?.floor || ''}</TextSpanStyle>
      <TextSpanStyle size={10}>Площадь: {flat?.area || ''}</TextSpanStyle>
      <TextSpanStyle size={10}>Цена: {flat.price || ''}</TextSpanStyle>
      <DialogWindow onClose={toggleOpen} open={open}>
        <DialogImage src={flat?.plan || ''} />
      </DialogWindow>
    </Appartment>
  );
};

export default SlideResidentialAppartment;
