import React from 'react';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { ButtonLink } from 'ui/ButtonLink';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { useFormContext } from 'react-hook-form';

const DialogAddFeatureStyle = styled.div`
  background-color: #fff;
  border-radius: 5px;
  width: 30vw;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const DialogAddFeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DialogAddFeature = ({ onClose }) => {
  const { setValue, getValues, watch } = useFormContext();
  const featureList = getValues('featureList');

  const isMatch = (id) => {
    return featureList.includes(id);
  };
  const handleClick = (e) => {
    const id = e.target.id;
    if (isMatch(id)) {
      setValue('featureList', [...featureList.filter((item) => item !== id)], {
        shouldDirty: true,
      });
      return;
    }
    setValue('featureList', [...featureList, id], {
      shouldDirty: true,
    });
  };
  watch('featureList');
  return (
    <DialogAddFeatureStyle onClick={(e) => e.stopPropagation()}>
      <SliderTitle size={14}>Характеристики</SliderTitle>
      <DialogAddFeatureContent>
        <Box jc='space-between' fullWidth>
          <TextSpanStyle>Цена, от</TextSpanStyle>
          <ButtonLink
            size={12}
            color='#84019e'
            onClick={handleClick}
            id='priceFrom'
          >
            {isMatch('priceFrom') ? 'Удалить' : 'Добавить'}
          </ButtonLink>
        </Box>
        <Box jc='space-between' fullWidth>
          <TextSpanStyle>Цена, до</TextSpanStyle>
          <ButtonLink
            size={12}
            color='#84019e'
            onClick={handleClick}
            id='priceTo'
          >
            {isMatch('priceTo') ? 'Удалить' : 'Добавить'}
          </ButtonLink>
        </Box>
        <Box jc='space-between' fullWidth>
          <TextSpanStyle>Площадь общая, от</TextSpanStyle>
          <ButtonLink
            size={12}
            color='#84019e'
            onClick={handleClick}
            id='TotalAreaFrom'
          >
            {isMatch('TotalAreaFrom') ? 'Удалить' : 'Добавить'}
          </ButtonLink>
        </Box>
        <Box jc='space-between' fullWidth>
          <TextSpanStyle>Площадь общая, до</TextSpanStyle>
          <ButtonLink
            size={12}
            color='#84019e'
            onClick={handleClick}
            id='TotalAreaTo'
          >
            {isMatch('TotalAreaTo') ? 'Удалить' : 'Добавить'}
          </ButtonLink>
        </Box>
        <Box jc='space-between' fullWidth>
          <TextSpanStyle>Площадь участка, от</TextSpanStyle>
          <ButtonLink
            size={12}
            color='#84019e'
            onClick={handleClick}
            id='TotalAreaLandFrom'
          >
            {isMatch('TotalAreaLandFrom') ? 'Удалить' : 'Добавить'}
          </ButtonLink>
        </Box>
        <Box jc='space-between' fullWidth>
          <TextSpanStyle>Площадь участка, до</TextSpanStyle>
          <ButtonLink
            size={12}
            color='#84019e'
            onClick={handleClick}
            id='TotalAreaLandTo'
          >
            {isMatch('TotalAreaLandTo') ? 'Удалить' : 'Добавить'}
          </ButtonLink>
        </Box>
        <Box jc='space-between' fullWidth>
          <TextSpanStyle>Доступно с</TextSpanStyle>
          <ButtonLink
            size={12}
            color='#84019e'
            onClick={handleClick}
            id='AvailableFrom'
          >
            {isMatch('AvailableFrom') ? 'Удалить' : 'Добавить'}
          </ButtonLink>
        </Box>
        <Box jc='space-between' fullWidth>
          <TextSpanStyle>Класс здания</TextSpanStyle>
          <ButtonLink
            size={12}
            color='#84019e'
            onClick={handleClick}
            id='ClassType'
          >
            {isMatch('ClassType') ? 'Удалить' : 'Добавить'}
          </ButtonLink>
        </Box>
        <Box jc='space-between' fullWidth>
          <TextSpanStyle>Тип НДС</TextSpanStyle>
          <ButtonLink
            size={12}
            color='#84019e'
            onClick={handleClick}
            id='VatType'
          >
            {isMatch('VatType') ? 'Удалить' : 'Добавить'}
          </ButtonLink>
        </Box>
        <Box jc='space-between' fullWidth>
          <TextSpanStyle>Высота потолков</TextSpanStyle>
          <ButtonLink
            size={12}
            color='#84019e'
            onClick={handleClick}
            id='ceilingHeight'
          >
            {isMatch('ceilingHeight') ? 'Удалить' : 'Добавить'}
          </ButtonLink>
        </Box>
        <Box jc='space-between' fullWidth>
          <TextSpanStyle>Кол-во мокрых точек</TextSpanStyle>
          <ButtonLink
            size={12}
            color='#84019e'
            onClick={handleClick}
            id='WaterPipesCount'
          >
            {isMatch('WaterPipesCount') ? 'Удалить' : 'Добавить'}
          </ButtonLink>
        </Box>
      </DialogAddFeatureContent>
      <ButtonUI size='small' onClick={onClose}>
        Закрыть
      </ButtonUI>
    </DialogAddFeatureStyle>
  );
};

export default DialogAddFeature;
