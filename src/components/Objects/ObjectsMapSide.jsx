import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ButtonLink } from 'ui/ButtonLink/ButtonLink';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useGetMeterPrice } from './objectHook';
import imgErrorUrl from 'images/img-error.svg';
import { Link } from 'react-router-dom';
import { device } from 'styles/device';

const SideObjects = styled(motion.div)`
  position: absolute;
  width: 30%;
  top: 0.5rem;
  bottom: 0.5rem;
  right: 0.5rem;
  background-color: #85009e;
  border-radius: 5px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  box-sizing: border-box;
  gap: 0.5rem;
  @media (${device.tablet}) {
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
  }
`;
const SlideObjectHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #fff;
`;
const SliderObjectList = styled.div`
  display: grid;
  grid-template-columns: ${({ $full }) =>
    $full === 1 ? '1fr' : 'repeat(auto-fill, minmax(150px, 1fr))'};
  grid-auto-rows: min-content;
  gap: 0.5rem;
  height: 100%;
  overflow: auto;
`;
const ObjectsMapSide = ({ targetObjects, cleareTargetObjects }) => {
  return (
    <SideObjects
      initial={{ x: 1000 }}
      exit={{ x: 1000 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SlideObjectHeader>
        <ButtonLink size={12} color='#fff' onClick={cleareTargetObjects}>
          Закрыть
        </ButtonLink>
      </SlideObjectHeader>
      <SliderObjectList $full={targetObjects.length}>
        {targetObjects.map((object) => (
          <SliderObjectItem key={object.id} object={object.properties} />
        ))}
      </SliderObjectList>
    </SideObjects>
  );
};

const ObjectImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  box-sizing: border-box;
  border-radius: 5px 5px 0 0;
  ${({ $isPhoto }) => !$isPhoto && 'border: 1px solid #ddd;'}
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: filter 0.3s;
  @media (hover: hover) {
    &:hover {
      filter: contrast(0.5);
    }
    &:active {
      filter: none;
    }
  }
  @media (hover: none) {
    &:active {
      filter: contrast(0.5);
    }
  }
`;
const SliderObjectItemInfo = styled.div`
  padding: 0.5rem;
  background-color: #f9f5f5;
  flex-grow: 1;
  border-radius: 0 0 5px 5px;
`;
const SliderObjectItem = ({ object }) => {
  console.log(object);
  const getArea = () => {
    if (object?.Area) {
      return object?.Area.split('/')[0];
    }
    return object?.Area || '0';
  };
  return (
    <LinkStyle to={`${object.CategoryOriginal}/${object?.UID}`}>
      <ObjectImage
        src={object?.Photo || imgErrorUrl}
        $isPhoto={Boolean(object?.Photo)}
      />
      <SliderObjectItemInfo>
        <Box jc='flex-start' gap='0 0.3rem' wrap>
          <TextSpanStyle size={10}>{object?.SubCategory || ''}</TextSpanStyle>
          {object?.Category !== 'Жил. Уч.' && (
            <TextSpanStyle size={10}>{object?.Floors || '1 эт.'}</TextSpanStyle>
          )}
          <TextSpanStyle size={10}>
            {getArea()} {object?.Category === 'Жил. Уч.' ? 'сот.' : 'м2'}
          </TextSpanStyle>
        </Box>
        <TextSpanStyle color='#595959' size={12}>
          {object?.addrString || ''}
        </TextSpanStyle>
        <Box gap='0.3rem' jc='flex-start'>
          <TextSpanStyle bold size={12}>
            {object?.Price || '0'} руб.
          </TextSpanStyle>
          <TextSpanStyle size={10} color='#858585'>
            {useGetMeterPrice(object?.Price, getArea())}{' '}
            {object?.Category === 'Жил. Уч.' ? 'руб/сот.' : 'руб/м2'}
          </TextSpanStyle>
        </Box>
        <TextSpanStyle size={10} color='#858585'>
          Обновлено: {object?.Created || 'Нет даты'}
        </TextSpanStyle>
      </SliderObjectItemInfo>
    </LinkStyle>
  );
};
export default ObjectsMapSide;
