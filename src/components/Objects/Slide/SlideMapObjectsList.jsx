import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { TextSpanStyle } from '../../../styles/styles';
import { ButtonLink } from '../../../ui/ButtonLink/ButtonLink';
import { Link } from 'react-router-dom';
import { device } from '../../../styles/device';

const SideObjects = styled(motion.div)`
  position: absolute;
  width: 30%;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  padding: 0.5rem;
  box-sizing: border-box;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (${device.tablet}) {
    width: 100%;
  }
`;
const SlideObjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SliderObjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  overflow: auto;
`;

const SlideMapObjectsList = ({ otherList, cleareOtherList }) => {
  return (
    <SideObjects
      initial={{ x: 1000 }}
      exit={{ x: 1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SlideObjectHeader>
        <TextSpanStyle color='#6d6d6d'>
          Количество объектов: {otherList.length}
        </TextSpanStyle>
        <ButtonLink size={12} color='#6d6d6d' onClick={cleareOtherList}>
          Закрыть
        </ButtonLink>
      </SlideObjectHeader>
      <SliderObjectList>
        {otherList.map((item) => (
          <SlideMapObjectItem key={item.objUID} object={item} />
        ))}
      </SliderObjectList>
    </SideObjects>
  );
};

const SliderMapObjectItemStyle = styled(Link)`
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  @media (hover: hover) {
    &:hover {
      background-color: #ededed;
    }
    &:active {
      background-color: #fff;
    }
  }
  @media (hover: none) {
    &:active {
      background-color: #ededed;
    }
  }
`;
const SlideMapObjectItem = ({ object }) => {
  return (
    <SliderMapObjectItemStyle
      to={`/objects/${object.objType}/${object.objUID}`}
    >
      <TextSpanStyle color='#6d6d6d'>{object?.objaddrStr || ''}</TextSpanStyle>
    </SliderMapObjectItemStyle>
  );
};

export default SlideMapObjectsList;
