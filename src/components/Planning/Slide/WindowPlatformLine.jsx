import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import closeUrl from 'images/close.svg';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import {
  SelectMultipleUI,
  SelectMultipleItemUI,
} from 'ui/SelectMultipleUI/SelectMultipleUI';
import { setAdvLine } from '../../../api/planApi';

const WindowPlatformStyle = styled.div`
  background-color: #fff;
  border-radius: 5px;
  /* width: 50vw;
  height: 50vh; */
  min-width: 300px;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
`;
const WindowPlatformStyleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
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
const WindowPlatformStyleContext = styled.div`
  padding: 0.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const WindowPlatformStyleFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-top: 1px solid #ccc;
`;

const getCategoryState = (categories) => {
  return categories.map((category) => {
    return category.catName;
  });
};
//TODO: отфильтровать регионы (убрать из списка те что есть)
const WindowPlatformLine = ({ UID, platform, onClose, setAdvertising }) => {
  const [region, setRegion] = useState(platform?.region?.regName || '');
  const [category, setCategory] = useState(
    platform?.region?.data ? getCategoryState(platform.region.data) : []
  );
  const saveAdv = () => {
    setAdvLine({
      planId: UID,
      platform: platform.platformName,
      regName: region,
      catName: category,
    }).then((data) => {
      setAdvertising(data.advertising);
      onClose();
    });
  };
  const changeRegion = (newRegion) => {
    setRegion(newRegion);
  };
  const changeCategory = (newCanegory) => {
    setCategory(newCanegory);
  };
  return (
    <WindowPlatformStyle onClick={(e) => e.stopPropagation()}>
      <WindowPlatformStyleHeader>
        <TextSpanStyle>{platform.platformName}</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} alt='close' onClick={onClose} />
      </WindowPlatformStyleHeader>
      <WindowPlatformStyleContext>
        <SelectUI
          small
          onChange={changeRegion}
          select={region}
          disabled={Boolean(platform?.region?.regName)}
          label='Регион'
        >
          {regionList[platform.platformName].map((region) => (
            <SelectItemUI value={region} key={region}>
              {region}
            </SelectItemUI>
          ))}
        </SelectUI>
        <SelectMultipleUI
          onChange={changeCategory}
          value={category}
          multiple
          fullWidth
          label='Категории'
          small
        >
          {categoryList[platform.platformName].map((category) => (
            <SelectMultipleItemUI value={category} key={category}>
              {category}
            </SelectMultipleItemUI>
          ))}
        </SelectMultipleUI>
      </WindowPlatformStyleContext>
      <WindowPlatformStyleFooter>
        <ButtonUI onClick={saveAdv}>Сохранить</ButtonUI>
        <ButtonUI variant='outline' onClick={onClose}>
          Отменить
        </ButtonUI>
      </WindowPlatformStyleFooter>
    </WindowPlatformStyle>
  );
};

const regionList = {
  avito: [
    'Московская область',
    'Новосибирская область',
    'Сочи',
    'Тульская область',
    'Москва',
    'Новосибирская область (Кроме Новосибирска)',
  ],
  cian: ['Москва и Московская область', 'Новосибирск и Новосибирская область'],
  domclick: [
    'Москва и Московская область',
    'Новосибирск и Новосибирская область',
  ],
};
const categoryList = {
  avito: [
    'Дома, дачи, коттеджи',
    'Земельные участки',
    'Комнаты  (Продам)',
    'Квартиры (Продам)',
    'Гаражи и машиноместа',
    'Недвижимость за рубежом',
    'Коммерческая недвижимость',
    'Комнаты  (Сдам)',
    'Квартиры (Сдам)',
  ],
  cian: ['Квартиры и комнаты', 'Загородная'],
  domclick: ['Квартиры и комнаты', 'Загородная'],
};

export default WindowPlatformLine;
