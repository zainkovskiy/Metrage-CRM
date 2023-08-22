import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  SelectMultipleUI,
  SelectMultipleItemUI,
} from 'ui/SelectMultipleUI/SelectMultipleUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SelectAutoсompleteMultipleUI } from 'ui/SelectAutoсompleteMultipleUI';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import Dadata from 'components/Main/Dadata';
import { setFilter, getObjectList } from 'store/objectSlice';
import { useNumberTriad } from 'hooks/StringHook';
import { getUserList } from 'api/search';

const ObjectsFilterFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  justify-content: space-between;
  overflow: auto;
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
`;
const FormTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const FormTitle = styled.div`
  font-family: ${({ theme }) => theme.font.family};
  width: 100%;
  text-align: center;
`;

const ObjectsFilterForm = () => {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.objects.filter);
  const changeFilter = (name, newValue) => {
    dispatch(
      setFilter({
        name: name,
        value: newValue,
      })
    );
  };
  const getUsers = (value) => {
    if (value.length < 2) {
      setUsers([]);
      return;
    }
    setUsersLoading(true);
    getUserList(value)
      .then((data) => {
        setUsers(data);
      })
      .finally(() => {
        setUsersLoading(false);
      });
  };
  const getList = () => {
    dispatch(getObjectList());
  };
  return (
    <ObjectsFilterFormStyle>
      <FormTop>
        <FormTitle>Фильтр</FormTitle>
        <SelectUI
          name='typeRealty'
          onChange={(newValue) => changeFilter('typeRealty', newValue)}
          select={filter.typeRealty}
          multiple
          label='Тип недвижимости'
        >
          <SelectItemUI value='live'>Жилая</SelectItemUI>
          <SelectItemUI value='business'>Коммерческая</SelectItemUI>
        </SelectUI>
        <SelectMultipleUI
          name='typeObject'
          onChange={(newValue) => changeFilter('typeObject', newValue)}
          value={filter.typeObject}
          multiple
          fullWidth
          label='Тип объекта'
        >
          {filter.typeRealty === 'live' ? (
            <>
              <SelectMultipleItemUI value='flatSale'>
                Квартира
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='newBuildingFlatSale'>
                Новостройка
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='flatShareSale'>
                Доля в квартире
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='roomSale'>
                Комната
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='garageSale'>
                Гараж
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='houseSale'>Дом</SelectMultipleItemUI>
              <SelectMultipleItemUI value='houseShareSale'>
                Часть дома
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='cottageSale'>
                Коттедж
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='townhouseSale'>
                Таунхаус
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='landSale'>
                Участок
              </SelectMultipleItemUI>
            </>
          ) : (
            <>
              <SelectMultipleItemUI value='officeSale'>
                Офис
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='buildingSale'>
                Здание
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='shoppingAreaSale'>
                Торговая площадь
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='freeAppointmentObjectSale'>
                Помещение свободного назначения
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='industrySale'>
                Производство
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='warehouseSale'>
                Склад
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='businessSale'>
                Бизнес
              </SelectMultipleItemUI>
              <SelectMultipleItemUI value='commercialLandSale'>
                Коммерческая земля
              </SelectMultipleItemUI>
            </>
          )}
        </SelectMultipleUI>
        <SelectAutoсompleteMultipleUI
          options={users}
          placeholder='Ответственный'
          inputChange={getUsers}
          loading={usersLoading}
          getOptionsLabel={(options) =>
            `${
              options.lastName +
              ' ' +
              options.firstName +
              ' ' +
              options.secondName
            }`
          }
          onChange={(value) => changeFilter('users', value)}
          isOpenOptions={(open) => !open && setUsers([])}
          value={filter.users}
          label='Ответственный'
        />
        <Dadata
          label='Адрес'
          value={filter?.Address || ''}
          onChange={(value) => changeFilter('Address', value)}
        />
        <InputUI
          label='Площадь общая'
          value={filter?.TotalArea || ''}
          onChange={(e) =>
            changeFilter('TotalArea', parseFloat(e.target.value))
          }
          type='number'
        />
        <InputUI
          label='Площадь жилая'
          value={filter?.LivingArea || ''}
          onChange={(e) =>
            changeFilter('LivingArea', parseFloat(e.target.value))
          }
          type='number'
        />
        <InputUI
          label='Площадь кухни'
          value={filter?.KitchenArea || ''}
          onChange={(e) =>
            changeFilter('KitchenArea', parseFloat(e.target.value))
          }
          type='number'
        />
        <InputUI
          label='Площадь участка'
          value={filter?.LandArea || ''}
          onChange={(e) => changeFilter('LandArea', parseFloat(e.target.value))}
          type='number'
        />
        <SelectUI
          name='FlatRoomsCount'
          onChange={(newValue) => changeFilter('FlatRoomsCount', newValue)}
          select={filter?.FlatRoomsCount}
          multiple
          label='Комнатность'
        >
          <SelectItemUI value={1}>1-комнатная</SelectItemUI>
          <SelectItemUI value={2}>2-комнатная</SelectItemUI>
          <SelectItemUI value={3}>3-комнатная</SelectItemUI>
          <SelectItemUI value={4}>4-комнатная</SelectItemUI>
          <SelectItemUI value={5}>5-комнатная</SelectItemUI>
          <SelectItemUI value={6}>6+</SelectItemUI>
          <SelectItemUI value={7}>Свободная планировка</SelectItemUI>
          <SelectItemUI value={9}>Студия</SelectItemUI>
        </SelectUI>
        <InputUI
          label='Цена'
          value={filter.Price ? useNumberTriad(filter.Price) : ''}
          onChange={(e) =>
            changeFilter('Price', parseInt(e.target.value.split(' ').join('')))
          }
        />
        <InputUI
          label='Этаж'
          value={filter?.Floor || ''}
          onChange={(e) => changeFilter('Floor', parseInt(e.target.value))}
          type='number'
        />
      </FormTop>
      <ButtonUI onClick={getList} fullWidth>
        Применить
      </ButtonUI>
    </ObjectsFilterFormStyle>
  );
};

export default ObjectsFilterForm;
