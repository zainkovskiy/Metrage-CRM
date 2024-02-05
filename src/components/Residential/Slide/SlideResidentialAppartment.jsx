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
const ImageComntainer = styled.div`
  position: relative;
  display: flex;
`;
const DialogImage = styled.img`
  width: 90vw;
  height: 90vh;
  object-fit: contain;
  background-color: #e2e2e2;
`;
const CountText = styled.span`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 12px;
  background-color: #84019e91;
  padding: 0.2rem 0.4rem;
  box-sizing: border-box;
  border-radius: 5px;
  color: #fff;
  font-family: ${({ theme }) => theme.font.family};
  min-width: 30px;
  text-align: center;
`;
const SlideResidentialAppartment = ({ flat }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <Appartment>
      <ImageComntainer>
        <AppartmentImage src={flat?.plan || ''} onClick={toggleOpen} />
        {flat?.count && (
          <CountText className='count-span' style={{ position: 'absolute' }}>
            {flat.count}
          </CountText>
        )}
      </ImageComntainer>
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
