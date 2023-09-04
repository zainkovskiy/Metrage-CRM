import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import imgErrorUrl from 'images/img-error.svg';

import { LinkUI } from 'ui/LinkUI';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { SlideBlockStyle } from '../ObjectsStyle';
import SlideObjectResponsible from './SlideObjectResponsible';
import { ReactComponent as Area } from 'images/arrow-bottom-left.svg';
import { ReactComponent as Height } from 'images/height.svg';

import { useGetMeterPrice } from '../objectHook';
import { useNumberTriad } from 'hooks/StringHook';
import { ImageGalary } from 'components/Main/ImageGalary';
import { useWindowSize } from 'hooks/windowSize';
import { FlatRoomsCountTranslate } from '../KeyTranslate';
const AreaStyle = styled(Area)`
  width: 36px;
  height: 36px;
`;
const HeightStyle = styled(Height)`
  width: 10px;
  height: 36px;
`;
const SlideInfoBlock = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
  @media (min-width: 768px) {
    height: 250px;
  }
`;
const SlideObjectInfo = () => {
  const windowSize = useWindowSize();
  const object = useAsyncValue();
  const getLineTypeObject = () => {
    if (!object?.Category) {
      return '';
    }
    if (
      object?.Category === 'flatSale' ||
      object?.Category === 'newBuildingFlatSale' ||
      object?.Category === 'flatShareSale'
    ) {
      if (object?.FlatRoomsCount) {
        return `${FlatRoomsCountTranslate[object?.FlatRoomsCount]} кв.`;
      }
      return `${typeObjects[object?.typeEstate][object?.Category]}`;
    }
    return `${typeObjects[object?.typeEstate][object?.Category]}`;
  };
  const getPrice = () => {
    if (object.typeEstate === 'business') {
      <Box jc='space-between' fullWidth ai='flex-start'>
        <Box column ai='flex-start' gap='0'>
          <TextSpanStyle bold>
            {useNumberTriad(object?.BargainTermsPrice)} руб.
          </TextSpanStyle>
          <TextSpanStyle size={8}>{object?.BargainTermsVatType}</TextSpanStyle>
        </Box>
        <TextSpanStyle size={12}>
          {useGetMeterPrice(object?.BargainTermsPrice, object?.TotalArea)}{' '}
          руб/м2
        </TextSpanStyle>
      </Box>;
    }
    if (object.typeEstate === 'live') {
      return (
        <Box jc='space-between'>
          <TextSpanStyle bold>
            {useNumberTriad(object?.Price)} руб.
          </TextSpanStyle>
          <TextSpanStyle size={12}>
            {useGetMeterPrice(object?.Price, object?.TotalArea)} руб/м2
          </TextSpanStyle>
        </Box>
      );
    }
  };
  return (
    <SlideBlockStyle $wrap={windowSize < 768}>
      <SlideInfoBlock>
        <Box column ai='flex-start'>
          <Box column gap='0' ai='flex-start'>
            <TextSpanStyle size={10}>
              {object?.typeDeal} {typeEstateTranslate[object?.typeEstate]}
            </TextSpanStyle>
            <TextSpanStyle size={12}>{getLineTypeObject()}</TextSpanStyle>
          </Box>
          <TextSpanStyle bold>
            {' '}
            {object?.addressId?.addrString || 'Нет адреса'}
          </TextSpanStyle>
          {getPrice()}
          {object?.platform?.length > 0 && (
            <Box wrap jc='flex-start'>
              <TextSpanStyle size={12}>Ссылки:</TextSpanStyle>
              {object?.platform.map((item) => (
                <LinkUI
                  key={item.href}
                  href={item.URL}
                  target='_blank'
                  size={12}
                >
                  {item.platform}
                </LinkUI>
              ))}
            </Box>
          )}
        </Box>
        {object?.Category !== 'landSale' && (
          <Box column ai='flex-start'>
            <Box jc='space-between' fullWidth>
              <Box>
                <AreaStyle />
                <Box column gap='0' jc='space-between' ai='flex-start'>
                  <Box gap='0.2rem' ai='flex-end'>
                    <TextSpanStyle bold>
                      {object?.TotalArea || 0} м2
                    </TextSpanStyle>
                    <TextSpanStyle size={12}>Общая</TextSpanStyle>
                  </Box>
                  {object?.LivingArea && (
                    <Box gap='0.2rem' ai='flex-end'>
                      <TextSpanStyle bold>
                        {object?.LivingArea} м2
                      </TextSpanStyle>
                      <TextSpanStyle size={12}>Жилая</TextSpanStyle>
                    </Box>
                  )}
                  {object?.BuildingTotalArea && (
                    <Box gap='0.2rem' ai='flex-end'>
                      <TextSpanStyle bold>
                        {object?.BuildingTotalArea} м2
                      </TextSpanStyle>
                      <TextSpanStyle size={12}>Здание</TextSpanStyle>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box>
                <HeightStyle />
                <Box column gap='0' jc='space-between' ai='flex-start'>
                  {object?.FloorNumber && (
                    <Box gap='0.2rem' ai='flex-end'>
                      <TextSpanStyle bold>
                        {object?.FloorNumber || 0}
                      </TextSpanStyle>
                      <TextSpanStyle size={12}>Этаж</TextSpanStyle>
                    </Box>
                  )}
                  <Box gap='0.2rem' ai='flex-end'>
                    <TextSpanStyle bold>
                      {object?.FloorsCount || object?.BuildingFloorsCount || 0}
                    </TextSpanStyle>
                    <TextSpanStyle size={12}>Этажей</TextSpanStyle>
                  </Box>
                </Box>
              </Box>
            </Box>
            {object?.responsibleId && (
              <SlideObjectResponsible responsible={object?.responsibleId} />
            )}
          </Box>
        )}
      </SlideInfoBlock>
      <SlideInfoBlock>
        {/* <img src={object?.photos[0].URL} style={{width: '100%', height: '100%', objectFit: 'cover'}}/> */}
        <ImageGalary images={object?.photos || [{ URL: imgErrorUrl }]} />
      </SlideInfoBlock>
    </SlideBlockStyle>
  );
};
const typeEstateTranslate = {
  live: '(Жилая)',
  business: '(Коммерция)',
};
const typeObjects = {
  live: {
    flatSale: 'Квартира',
    newBuildingFlatSale: 'Новостройка',
    flatShareSale: 'Доля в квартире',
    roomSale: 'Комната',
    garageSale: 'Гараж',
    houseSale: 'Дом',
    houseShareSale: 'Часть дома',
    cottageSale: 'Коттедж',
    townhouseSale: 'Таунхаус',
    landSale: 'Участок',
  },
  business: {
    officeSale: 'Офис',
    buildingSale: 'Здание',
    shoppingAreaSale: 'Торговая площадь',
    freeAppointmentObjectSale: 'Помещение свободного назначения',
    industrySale: 'Производство',
    warehouseSale: 'Склад',
    businessSale: 'Бизнес',
    commercialLandSale: 'Коммерческая земля',
  },
};
export default SlideObjectInfo;
