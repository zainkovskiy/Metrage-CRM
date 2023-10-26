import React, { useEffect, useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import imgErrorUrl from 'images/img-error.svg';

import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
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
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket } from '../../../store/objectSlice';
import SlideCountView from './SlideCountView';
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
    height: 300px;
  }
`;
const ButtonBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const ContentBlock = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  ${({ $wrap }) => $wrap && 'flex-wrap: wrap;'};
`;
const SlideObjectInfo = () => {
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.objects.basket);
  const object = useAsyncValue();
  const [match, setMatch] = useState(false);
  useEffect(() => {
    basket.forEach((element) => {
      if (element.UID === object.UID) {
        setMatch(true);
      }
    });
  }, []);
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
    return (
      <Box jc='space-between'>
        <TextSpanStyle bold>{useNumberTriad(object?.Price)} руб.</TextSpanStyle>
        <TextSpanStyle size={12}>
          {useGetMeterPrice(object?.Price, object?.TotalArea)} руб/м2
        </TextSpanStyle>
      </Box>
    );
  };
  const addObjectToBasket = () => {
    if (match) {
      dispatch(removeFromBasket(object));
      setMatch(false);
      return;
    }
    dispatch(addToBasket(object));
    setMatch(true);
  };
  return (
    <SlideBlockStyle $wrap>
      <ButtonBlock>
        <ButtonUI size='small' onClick={addObjectToBasket}>
          {match ? 'Удалить из подборки' : 'Добавить в подборку'}
        </ButtonUI>
      </ButtonBlock>
      <ContentBlock $wrap={windowSize < 1201}>
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
          </Box>
          <Box column ai='flex-start'>
            {object?.Category !== 'landSale' && (
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
                        {object?.FloorsCount ||
                          object?.BuildingFloorsCount ||
                          0}
                      </TextSpanStyle>
                      <TextSpanStyle size={12}>Этажей</TextSpanStyle>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            <Box jc='space-between' fullWidth>
              {object?.responsibleId && (
                <SlideObjectResponsible
                  link={
                    object?.subTypeEstate === 'liveExternal' ||
                    object?.subTypeEstate === 'businessExternal'
                      ? object?.videoUrl
                      : ''
                  }
                />
              )}
              {object?.advStats && <SlideCountView view={object.advStats} />}
            </Box>
          </Box>
        </SlideInfoBlock>
        <SlideInfoBlock>
          {/* <img src={object?.photos[0].URL} style={{width: '100%', height: '100%', objectFit: 'cover'}}/> */}
          <ImageGalary
            images={
              object?.photos?.length > 0
                ? object.photos
                : [{ URL: imgErrorUrl }]
            }
            height={windowSize < 768 ? 300 : ''}
            status
          />
        </SlideInfoBlock>
      </ContentBlock>
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
