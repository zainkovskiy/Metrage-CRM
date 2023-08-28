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
import { CheckboxUI } from 'ui/CheckboxUI';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import Dadata from 'components/Main/Dadata';
import { setFilter, getObjectList } from 'store/objectSlice';
import { useNumberTriad } from 'hooks/StringHook';
import { getUserList } from 'api/search';
import { Controller, useForm } from 'react-hook-form';

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

const ObjectsFilterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [usersLoading, setUsersLoading] = useState(false);
  const filter = useSelector((state) => state.objects.filter);
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { ...filter },
  });
  const [users, setUsers] = useState([]);
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
  const onSubmit = (data) => {
    dispatch(setFilter(getValues()));
    dispatch(getObjectList());
    onClose();
  };
  watch('typeRealty');
  return (
    <ObjectsFilterFormStyle onSubmit={handleSubmit(onSubmit)}>
      <FormTop>
        <FormTitle>Фильтр</FormTitle>
        <Controller
          name='typeRealty'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                field.onChange(newValue);
                setValue('typeObject', []);
              }}
              select={field.value}
              multiple
              label='Тип недвижимости'
            >
              <SelectItemUI value='live'>Жилая</SelectItemUI>
              <SelectItemUI value='business'>Коммерческая</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          name='typeObject'
          control={control}
          render={({ field }) => (
            <SelectMultipleUI
              onChange={(newValue) => field.onChange(newValue)}
              value={field.value || []}
              multiple
              fullWidth
              label='Тип объекта'
            >
              {getValues('typeRealty') === 'live' ? (
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
                  <SelectMultipleItemUI value='houseSale'>
                    Дом
                  </SelectMultipleItemUI>
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
          )}
        />
        <Controller
          name='users'
          control={control}
          render={({ field }) => (
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
              onChange={(user) => field.onChange(user)}
              isOpenOptions={(open) => !open && setUsers([])}
              value={field.value || []}
              label='Ответственный'
            />
          )}
        />
        <Controller
          name='Address'
          control={control}
          render={({ field }) => (
            <Dadata
              label='Адрес'
              value={field.value || ''}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
        <Box column ai='flex-start' gap='0.2rem'>
          <TextSpanStyle>Площадь общая</TextSpanStyle>
          <Box>
            <Controller
              name={`TotalArea.${[0]}`}
              control={control}
              render={({ field }) => (
                <InputUI
                  placeholder='от'
                  value={field.value || ''}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  type='number'
                />
              )}
            />
            <Controller
              name={`TotalArea.${[1]}`}
              control={control}
              render={({ field }) => (
                <InputUI
                  placeholder='до'
                  value={field.value || ''}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  type='number'
                />
              )}
            />
          </Box>
        </Box>
        <Box column ai='flex-start' gap='0.2rem'>
          <TextSpanStyle>Площадь жилая</TextSpanStyle>
          <Box>
            <Controller
              name={`LivingArea.${[0]}`}
              control={control}
              render={({ field }) => (
                <InputUI
                  placeholder='от'
                  value={field.value || ''}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  type='number'
                />
              )}
            />
            <Controller
              name={`LivingArea.${[1]}`}
              control={control}
              render={({ field }) => (
                <InputUI
                  value={field.value || ''}
                  placeholder='до'
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  type='number'
                />
              )}
            />
          </Box>
        </Box>
        <Box column ai='flex-start' gap='0.2rem'>
          <TextSpanStyle>Площадь кухни</TextSpanStyle>
          <Box>
            <Controller
              name={`KitchenArea.${[0]}`}
              control={control}
              render={({ field }) => (
                <InputUI
                  placeholder='от'
                  value={field.value || ''}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  type='number'
                />
              )}
            />
            <Controller
              name={`KitchenArea.${[1]}`}
              control={control}
              render={({ field }) => (
                <InputUI
                  placeholder='до'
                  value={field.value || ''}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  type='number'
                />
              )}
            />
          </Box>
        </Box>
        <Box column ai='flex-start' gap='0.2rem'>
          <TextSpanStyle>Площадь участка</TextSpanStyle>
          <Box>
            <Controller
              name={`LandArea.${[0]}`}
              control={control}
              render={({ field }) => (
                <InputUI
                  placeholder='от'
                  value={field.value || ''}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  type='number'
                />
              )}
            />
            <Controller
              name={`LandArea.${[1]}`}
              control={control}
              render={({ field }) => (
                <InputUI
                  placeholder='до'
                  value={field.value || ''}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  type='number'
                />
              )}
            />
          </Box>
        </Box>
        <Controller
          name='FlatRoomsCount'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => field.onChange(newValue)}
              select={field.value || ''}
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
          )}
        />
        <Box column ai='flex-start' gap='0.2rem'>
          <TextSpanStyle>Цена</TextSpanStyle>
          <Box>
            <Controller
              name={`Price.${[0]}`}
              control={control}
              render={({ field }) => (
                <InputUI
                  placeholder='от'
                  value={field.value ? useNumberTriad(field.value) : ''}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value.split(' ').join('')))
                  }
                />
              )}
            />
            <Controller
              name={`Price.${[1]}`}
              control={control}
              render={({ field }) => (
                <InputUI
                  placeholder='до'
                  value={field.value ? useNumberTriad(field.value) : ''}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value.split(' ').join('')))
                  }
                />
              )}
            />
          </Box>
        </Box>
        <Box column ai='flex-start' gap='0.2rem'>
          <TextSpanStyle>Этаж</TextSpanStyle>
          <Box>
            <Controller
              name={`Floor.${[0]}`}
              control={control}
              render={({ field }) => (
                <InputUI
                  placeholder='от'
                  value={field.value || ''}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  type='number'
                />
              )}
            />
            <Controller
              name={`Floor.${[1]}`}
              control={control}
              render={({ field }) => (
                <InputUI
                  placeholder='до'
                  value={field.value || ''}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                  type='number'
                />
              )}
            />
          </Box>
        </Box>
        <Controller
          name='ExternalFind'
          control={control}
          render={({ field }) => (
            <CheckboxUI
              label='Внешние источники'
              id='ExternalFind'
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </FormTop>
      <ButtonUI fullWidth type='submit'>
        Применить
      </ButtonUI>
    </ObjectsFilterFormStyle>
  );
};

export default ObjectsFilterForm;
