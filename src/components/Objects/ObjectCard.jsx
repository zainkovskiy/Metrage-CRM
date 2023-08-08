import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import imgErrorUrl from 'images/img-error.svg';
import { useGetMeterPrice } from './objectHook';

const ObjectCardStyle = styled(motion.div)`
  border-radius: 40px 0 40px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow .2s, transform .2s;
  height: 100%;
  @media (hover: hover){
    &:hover{
      transform: scale(1.03);
      box-shadow: 7px 8px 14px -6px rgba(0,0,0,0.75);
    }
  }
  @media (hover: none){
    &:active{
      transform: scale(1.03);
      box-shadow: 7px 8px 14px -6px rgba(0,0,0,0.75);
    }
  }
`
const ObjectHeader = styled.div`
  border-radius: 40px 0 0 0;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: #6ECD4C;
  width: 100%;
  box-sizing: border-box;
`
const ObjectCardContent = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-grow: 1;
  background-color: #F5F5F5;
`
const ObjectCardFooter = styled.div`
  background-color: #D9D9D9;
  padding: 0.6rem;
  border-radius: 0 0 40px 0;
`
const ObjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`
const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0
  }
}
const ObjectCard = ({ object }) => {
  return (
    <LinkStyle to={`${object.CategoryOriginal}/${object?.UID}`}>
      <ObjectCardStyle
        variants={variants}
        initial='hidden'
        animate='visible'
      >
        <ObjectHeader>
          <TextSpanStyle size={10}>{object?.AddressCity || 'Нет города'}</TextSpanStyle>
          <TextSpanStyle size={12}>{object?.AddressStreet || 'Нет адреса'}</TextSpanStyle>
        </ObjectHeader>
        <ObjectImage src={object?.Photo || imgErrorUrl} />
        <ObjectCardContent>
          <Box column>
            <Box jc='space-between' fullWidth>
              <Box column gap='0' ai='flex-start'>
                <TextSpanStyle bold size={12}>{object?.Price || '0'} руб.</TextSpanStyle>
                <TextSpanStyle size={10}>{useGetMeterPrice(object?.Price, object?.Area)} руб/м2</TextSpanStyle>
              </Box>
              <Box column gap='0' ai='flex-end'>
                <TextSpanStyle size={10}>{object?.SubCategory || ''}</TextSpanStyle>
                <Box>
                  <TextSpanStyle bold size={12}>{object?.Area || '0'} м2</TextSpanStyle>
                  <TextSpanStyle size={10}>{object?.Floors || '1'}</TextSpanStyle>
                </Box>
              </Box>
            </Box>
            <Box jc='space-between' fullWidth>
              <TextSpanStyle size={10}>Создано: {object?.Created || 'Нет даты'}</TextSpanStyle>
              <TextSpanStyle size={10}>Обновлено: {object?.Updated || 'Нет даты'}</TextSpanStyle>
            </Box>
          </Box>
        </ObjectCardContent>
        <ObjectCardFooter>
          <TextSpanStyle size={10}>{object?.Agent || 'Нет агента'}</TextSpanStyle>
          <Box jc='flex-start'>
            <TextSpanStyle size={10}>ID: {object?.UID || '0'}</TextSpanStyle>
            <TextSpanStyle size={10}>{object?.Category || 'Нет категории'}</TextSpanStyle>
          </Box>
        </ObjectCardFooter>
      </ObjectCardStyle>
    </LinkStyle>
  );
};

export default ObjectCard;