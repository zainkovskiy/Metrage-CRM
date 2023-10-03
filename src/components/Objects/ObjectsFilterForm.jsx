import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
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
import { setFilter, getObjectList } from 'store/objectSlice';
import { useNumberTriad } from 'hooks/StringHook';
import { getUserList } from 'api/search';
import Dadata from 'components/Main/Dadata';
import MapCircle from 'components/Main/MapCircle';

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
const user = globalUser ? JSON.parse(globalUser) : null;
const deafaultFilter = {
  typeRealty: 'live',
  stage: 1,
  users: [user],
  cords: null,
  agentType: 'all',
};
const resetFilter = {
  typeRealty: 'live',
  typeObject: [],
  users: [],
  Address: '',
  TotalArea: [null, null],
  LivingArea: [null, null],
  KitchenArea: [null, null],
  LandArea: [null, null],
  FlatRoomsCount: '',
  Price: [null, null],
  Floor: [null, null],
  ExternalFind: false,
  objectUID: '',
  SaleType: '',
  stage: 1,
  users: [user],
  cords: null,
  dealType: '',
  platform: '',
  agentType: 'all',
};
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
    reset,
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
    // console.log(data);
    dispatch(setFilter(data));
    dispatch(getObjectList());
    onClose();
  };
  const resetForm = () => {
    dispatch(setFilter(deafaultFilter));
    reset(resetFilter);
    setUsers([]);
  };
  watch('typeRealty');
  watch('typeObject');
  watch('ExternalFind');
  const getTotalArea = () => {
    if (!getValues('typeObject')) {
      return false;
    }
    if (getValues('typeObject').includes('flatSale')) {
      return true;
    }
    if (getValues('typeObject').includes('newBuildingFlatSale')) {
      return true;
    }
    if (getValues('typeObject').includes('flatShareSale')) {
      return true;
    }
    if (getValues('typeObject').includes('houseSale')) {
      return true;
    }
    if (getValues('typeObject').includes('houseShareSale')) {
      return true;
    }
    if (getValues('typeObject').includes('cottageSale')) {
      return true;
    }
    if (getValues('typeObject').includes('officeSale')) {
      return true;
    }
    if (getValues('typeObject').includes('buildingSale')) {
      return true;
    }
    if (getValues('typeObject').includes('shoppingAreaSale')) {
      return true;
    }
    if (getValues('typeObject').includes('freeAppointmentObjectSale')) {
      return true;
    }
    if (getValues('typeObject').includes('industrySale')) {
      return true;
    }
    if (getValues('typeObject').includes('warehouseSale')) {
      return true;
    }
    if (getValues('typeObject').includes('businessSale')) {
      return true;
    }
    return false;
  };
  const getLivingArea = () => {
    if (!getValues('typeObject')) {
      return false;
    }
    if (getValues('typeObject').includes('flatSale')) {
      return true;
    }
    if (getValues('typeObject').includes('newBuildingFlatSale')) {
      return true;
    }
    if (getValues('typeObject').includes('roomSale')) {
      return true;
    }
    return false;
  };
  const getKitchenArea = () => {
    if (!getValues('typeObject')) {
      return false;
    }
    if (getValues('typeObject').includes('flatSale')) {
      return true;
    }
    if (getValues('typeObject').includes('newBuildingFlatSale')) {
      return true;
    }
    return false;
  };
  const getLandArea = () => {
    if (!getValues('typeObject')) {
      return false;
    }
    if (getValues('typeObject').includes('houseSale')) {
      return true;
    }
    if (getValues('typeObject').includes('houseShareSale')) {
      return true;
    }
    if (getValues('typeObject').includes('cottageSale')) {
      return true;
    }
    if (getValues('typeObject').includes('townhouseSale')) {
      return true;
    }
    if (getValues('typeObject').includes('landSale')) {
      return true;
    }
    if (getValues('typeObject').includes('buildingSale')) {
      return true;
    }
    if (getValues('typeObject').includes('industrySale')) {
      return true;
    }
    if (getValues('typeObject').includes('warehouseSale')) {
      return true;
    }
    if (getValues('typeObject').includes('commercialLandSale')) {
      return true;
    }
    return false;
  };
  const getFloors = () => {
    if (!getValues('typeObject')) {
      return false;
    }
    if (getValues('typeObject').includes('flatSale')) {
      return true;
    }
    if (getValues('typeObject').includes('newBuildingFlatSale')) {
      return true;
    }
    if (getValues('typeObject').includes('flatShareSale')) {
      return true;
    }
    if (getValues('typeObject').includes('roomSale')) {
      return true;
    }
    if (getValues('typeObject').includes('officeSale')) {
      return true;
    }
    if (getValues('typeObject').includes('shoppingAreaSale')) {
      return true;
    }
    if (getValues('typeObject').includes('freeAppointmentObjectSale')) {
      return true;
    }
    if (getValues('typeObject').includes('industrySale')) {
      return true;
    }
    if (getValues('typeObject').includes('warehouseSale')) {
      return true;
    }
    if (getValues('typeObject').includes('businessSale')) {
      return true;
    }
    return false;
  };
  const getRoomsCount = () => {
    if (!getValues('typeObject')) {
      return false;
    }
    if (getValues('typeObject').includes('flatSale')) {
      return true;
    }
    if (getValues('typeObject').includes('newBuildingFlatSale')) {
      return true;
    }
    if (getValues('typeObject').includes('flatShareSale')) {
      return true;
    }
    if (getValues('typeObject').includes('roomSale')) {
      return true;
    }
    if (getValues('typeObject').includes('houseSale')) {
      return true;
    }
    if (getValues('typeObject').includes('houseShareSale')) {
      return true;
    }
    if (getValues('typeObject').includes('cottageSale')) {
      return true;
    }
    if (getValues('typeObject').includes('townhouseSale')) {
      return true;
    }
    if (getValues('typeObject').includes('landSale')) {
      return true;
    }
    if (getValues('typeObject').includes('officeSale')) {
      return true;
    }
    if (getValues('typeObject').includes('buildingSale')) {
      return true;
    }
    if (getValues('typeObject').includes('shoppingAreaSale')) {
      return true;
    }
    if (getValues('typeObject').includes('freeAppointmentObjectSale')) {
      return true;
    }
    if (getValues('typeObject').includes('industrySale')) {
      return true;
    }
    if (getValues('typeObject').includes('warehouseSale')) {
      return true;
    }
    return false;
  };
  return (
    <ObjectsFilterFormStyle onSubmit={handleSubmit(onSubmit)}>
      <FormTop>
        <FormTitle>Фильтр</FormTitle>
        <Controller
          name='dealType'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              select={field.value || ''}
              label='Тип потребности'
            >
              <SelectItemUI value='Sell'>Продать</SelectItemUI>
              <SelectItemUI value='Rent'>Сдать</SelectItemUI>
            </SelectUI>
          )}
        />
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
        {getValues('typeObject') &&
          getValues('typeObject').includes('newBuildingFlatSale') && (
            <Controller
              name='SaleType'
              control={control}
              render={({ field }) => (
                <SelectUI
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  select={field.value}
                  multiple
                  label='Тип продажи'
                >
                  <SelectItemUI value='dupt'>
                    Договор уступки права требования
                  </SelectItemUI>
                  <SelectItemUI value='dzhsk'>Договор ЖСК</SelectItemUI>
                  <SelectItemUI value='free'>Свободная продажа</SelectItemUI>
                  <SelectItemUI value='fz214'>214-ФЗ</SelectItemUI>
                  <SelectItemUI value='investment'>
                    Договор инвестирования
                  </SelectItemUI>
                  <SelectItemUI value='pdkp'>
                    Предварительный договор купли-продажи
                  </SelectItemUI>
                </SelectUI>
              )}
            />
          )}
        <Controller
          name='users'
          control={control}
          render={({ field }) => (
            <SelectAutoсompleteMultipleUI
              options={users}
              placeholder='Ответственный'
              inputChange={getUsers}
              loading={usersLoading}
              defaultValue={[]}
              getOptionsLabel={(options) =>
                `${options.lastName || ''} ${options.firstName || ''} ${
                  options.secondName || ''
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
        {getTotalArea() && (
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
        )}
        {getLivingArea() && (
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
        )}
        {getKitchenArea() && (
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
        )}
        {getLandArea() && (
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
        )}
        {getRoomsCount() && (
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
                <SelectItemUI value=''>Выбрать</SelectItemUI>
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
        )}
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
        {getFloors() && (
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
        )}
        <Controller
          name='stage'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => field.onChange(newValue)}
              select={field.value || ''}
              multiple
              label='Стадия'
            >
              <SelectItemUI value=''>Выбрать</SelectItemUI>
              <SelectItemUI value={0}>Черновик</SelectItemUI>
              <SelectItemUI value={1}>Активный</SelectItemUI>
              <SelectItemUI value={2}>Закрепление</SelectItemUI>
              <SelectItemUI value={3}>Продано</SelectItemUI>
              <SelectItemUI value={4}>Срыв</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          name='objectUID'
          control={control}
          render={({ field }) => (
            <InputUI
              label='Номер объекта'
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
              type='number'
            />
          )}
        />
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
        {getValues('ExternalFind') && (
          <>
            <Controller
              name='platform'
              control={control}
              render={({ field }) => (
                <SelectUI
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  select={field.value || ''}
                  label='Площадка'
                >
                  <SelectItemUI value='avito'>Авито</SelectItemUI>
                  <SelectItemUI value='cian'>ЦИАН</SelectItemUI>
                  <SelectItemUI value='yandex'>Яндекс</SelectItemUI>
                </SelectUI>
              )}
            />
            <Controller
              name='agentType'
              control={control}
              render={({ field }) => (
                <SelectUI
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  select={field.value || 'all'}
                  label='Автор объявления'
                >
                  <SelectItemUI value='all'>Все</SelectItemUI>
                  <SelectItemUI value='private'>Частник</SelectItemUI>
                  <SelectItemUI value='agent'>Агент</SelectItemUI>
                </SelectUI>
              )}
            />
          </>
        )}
        <Controller
          control={control}
          name='cords'
          render={({ field }) => (
            <MapCircle
              circle={field.value}
              onChange={field.onChange}
              error={errors?.cords}
              ref={field.ref}
            />
          )}
        />
      </FormTop>
      <Box jc='flex-start'>
        <ButtonUI
          fullWidth
          type='submit'
          // onClick={() => onSubmit(getValues())}
        >
          Применить
        </ButtonUI>
        <ButtonUI variant='outline' fullWidth onClick={resetForm}>
          Очистить
        </ButtonUI>
      </Box>
    </ObjectsFilterFormStyle>
  );
};

export default ObjectsFilterForm;
