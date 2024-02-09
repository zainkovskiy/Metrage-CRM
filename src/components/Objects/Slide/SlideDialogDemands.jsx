import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';
import { getObjectDemandsList } from '../../../api/objectAPI';
import closeUrl from 'images/close.svg';
import { Box } from '../../../ui/Box';
import { ButtonUI } from '../../../ui/ButtonUI/ButtonUI';
import { TextSpanStyle } from '../../../styles/styles';
import SlideDialogDemandItem from './SlideDialogDemandItem';
import { AnimatePresence, motion } from 'framer-motion';

const DialogDemands = styled(SliderBlock)`
  width: 300px;
  height: 60vh;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
const DialogDemandsContent = styled(motion.div)`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem 0;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;
const mltShdSpin = keyframes`
0% {
    box-shadow: 0 -0.83em 0 -0.4em,
    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 
    0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 
    0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, 
    -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, 
    -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
     -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, 
     -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
     -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, 
     -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 
    0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
`;
const round = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
    `;
const Spiner = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.color.primary};
  font-size: 45px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  transform: translateZ(0);
  animation: ${mltShdSpin} 1.7s infinite ease, ${round} 1.7s infinite ease;
`;
const SpinerContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const SlideDialogDemands = ({ onClose }) => {
  const object = useAsyncValue();
  const [demands, setDemands] = useState([]);
  const [loading, setLoding] = useState(true);
  useEffect(() => {
    getDemandsList();
  }, []);
  const getDemandsList = () => {
    getObjectDemandsList({
      UID: object.UID,
      type: object.subTypeEstate,
    })
      .then((reqDemands) => {
        setDemands(reqDemands);
      })
      .finally(() => {
        setLoding(false);
      });
  };
  return (
    <DialogDemands onClick={(e) => e.stopPropagation()}>
      <Box jc='space-between'>
        <TextSpanStyle>Заявки</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} alt='close' onClick={onClose} />
      </Box>
      <DialogDemandsContent>
        {loading ? (
          <SpinerContainer>
            <Spiner />
          </SpinerContainer>
        ) : (
          <AnimatePresence>
            {demands.map((demand, idx) => (
              <SlideDialogDemandItem
                curDemand={demand}
                key={demand.UID}
                idx={idx}
              />
            ))}
          </AnimatePresence>
        )}
      </DialogDemandsContent>
      <Box jc='flex-end'>
        <ButtonUI size='small' onClick={onClose}>
          Закрыть
        </ButtonUI>
      </Box>
    </DialogDemands>
  );
};

export default SlideDialogDemands;
