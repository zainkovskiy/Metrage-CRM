import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import styled from 'styled-components';
import Dadata from 'components/Main/Dadata';
import MapCircle from 'components/Main/MapCircle';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import {
  ButtonToggleGroup,
  ButtonToggleItem,
} from 'ui/ButtonToggle/ButtonToggle';

const DialogAddPlaceStyle = styled(motion.div)`
  background-color: #fff;
  width: 50vw;
  min-width: 300px;
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DialogAddPlace = ({ onClose, startPlace }) => {
  const { control, setValue, getValues } = useFormContext();
  const [show, setShow] = useState('address');
  const [address, setAddress] = useState(null);
  const [cords, setCords] = useState(null);
  useEffect(() => {
    if (show === 'map') {
      if (address) {
        setAddress(null);
      }
    }
    if (show === 'address') {
      if (cords) {
        setCords(null);
      }
    }
  }, [show]);
  const handleShow = (e) => {
    const newShow = e.target.id;
    setShow(newShow);
  };
  const handleSetAddress = (newAddress) => {
    setAddress(newAddress);
  };
  const handleSetCords = (newCords) => {
    setCords(newCords);
  };
  const savePlace = () => {
    if (address) {
      setValue('addressList', [...getValues('addressList'), address], {
        shouldDirty: true,
      });
    }
    if (cords) {
      setValue('cordsList', [...getValues('cordsList'), cords], {
        shouldDirty: true,
      });
    }
    onClose();
  };
  return (
    <DialogAddPlaceStyle onClick={(e) => e.stopPropagation()} layout>
      <SliderTitle>Местоположение</SliderTitle>
      <ButtonToggleGroup>
        <ButtonToggleItem onClick={handleShow} id='address' active={show}>
          По адресу
        </ButtonToggleItem>
        <ButtonToggleItem onClick={handleShow} id='map' active={show}>
          По карте
        </ButtonToggleItem>
      </ButtonToggleGroup>
      <motion.div layout>
        <AnimatePresence>
          {show === 'address' && (
            <Dadata
              small
              value={address}
              onChange={handleSetAddress}
              label='Адрес'
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {show === 'map' && (
            <MapCircle circle={cords} onChange={handleSetCords} />
          )}
        </AnimatePresence>
      </motion.div>
      <Box jc='flex-start' fullWidth>
        <ButtonUI size='small' onClick={onClose}>
          Закрыть
        </ButtonUI>
        <ButtonUI size='small' variant='outline' onClick={savePlace}>
          Добавить
        </ButtonUI>
      </Box>
    </DialogAddPlaceStyle>
  );
};

export default DialogAddPlace;
