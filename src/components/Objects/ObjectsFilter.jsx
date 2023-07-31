import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SelectMultipleUI, SelectMultipleItemUI } from 'ui/SelectMultipleUI/SelectMultipleUI';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/objectSlice';

const ObjectsFilterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem;
`
const FilterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`
const ObjectsFilter = ({getList}) => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.objects.filter);
  const changeFilter = (name, newValue) => {
    dispatch(setFilter({
      name: name,
      value: newValue,
    }));
  }
  return (
    <ObjectsFilterStyle>
      <FilterForm>
        <SelectUI name='typeRealty' onChange={(newValue) => changeFilter('typeRealty', newValue)} select={filter.typeRealty} small multiple>
          <SelectItemUI value='live'>Жилая</SelectItemUI>
          <SelectItemUI value='business'>Коммерческая</SelectItemUI>
        </SelectUI>
        <SelectMultipleUI name='typeObject' onChange={(newValue) => changeFilter('typeObject', newValue)} value={filter.typeObject} small multiple>
          {
           filter.typeRealty === 'live' ?
              <>
                <SelectMultipleItemUI value='flatSale'>Квартира</SelectMultipleItemUI>
                <SelectMultipleItemUI value='newBuildingFlatSale'>Новостройка</SelectMultipleItemUI>
                <SelectMultipleItemUI value='flatShareSale'>Доля в квартире</SelectMultipleItemUI>
                <SelectMultipleItemUI value='roomSale'>Комната</SelectMultipleItemUI>
                <SelectMultipleItemUI value='garageSale'>Гараж</SelectMultipleItemUI>
                <SelectMultipleItemUI value='houseSale'>Дом</SelectMultipleItemUI>
                <SelectMultipleItemUI value='houseShareSale'>Часть дома</SelectMultipleItemUI>
                <SelectMultipleItemUI value='cottageSale'>Коттедж</SelectMultipleItemUI>
                <SelectMultipleItemUI value='townhouseSale'>Таунхаус</SelectMultipleItemUI>
                <SelectMultipleItemUI value='landSale'>Участок</SelectMultipleItemUI>
              </> :
              <>
                <SelectMultipleItemUI value='officeSale'>Офис</SelectMultipleItemUI>
                <SelectMultipleItemUI value='buildingSale'>Здание</SelectMultipleItemUI>
                <SelectMultipleItemUI value='shoppingAreaSale'>Торговая площадь</SelectMultipleItemUI>
                <SelectMultipleItemUI value='freeAppointmentObjectSale'>Помещение свободного назначения</SelectMultipleItemUI>
                <SelectMultipleItemUI value='industrySale'>Производство</SelectMultipleItemUI>
                <SelectMultipleItemUI value='warehouseSale'>Склад</SelectMultipleItemUI>
                <SelectMultipleItemUI value='businessSale'>Бизнес</SelectMultipleItemUI>
                <SelectMultipleItemUI value='commercialLandSale'>Коммерческая земля</SelectMultipleItemUI>
              </>
          }
        </SelectMultipleUI>
        <ButtonUI size='small' onClick={getList}>Показать</ButtonUI>
      </FilterForm>
      <Link to='new-object'>
        <ButtonUI size='small' variant='outline'>Создать</ButtonUI>
      </Link>
    </ObjectsFilterStyle >
  );
};

export default ObjectsFilter;