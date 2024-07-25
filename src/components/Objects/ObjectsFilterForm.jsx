import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  SelectMultipleUI,
  SelectMultipleItemUI,
} from 'ui/SelectMultipleUI/SelectMultipleUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { SelectAutoсompleteMultipleUI } from 'ui/SelectAutoсompleteMultipleUI';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { CheckboxUI } from 'ui/CheckboxUI';
import { setFilter, getObjectList } from 'store/objectSlice';
import { useNumberTriad } from 'hooks/StringHook';
import { getUserList } from 'api/search';
import { getLocalOfficeList } from '../../api/search';
import Dadata from 'components/Main/Dadata';
import { getNewBuilderList } from 'api/dealAPI';
import {
  ButtonToggleGroup,
  ButtonToggleItem,
} from '../../ui/ButtonToggle/ButtonToggle';
import Accordeon from '../../ui/Accordeon';

const ObjectsFilterFormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
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
  users: user?.isAdmin === '1' ? [] : [user],
  // cords: null,
  agentType: 'all',
  onAdv: 'pofig',
  ExternalFindType: 'our',
  forModeration: false,
  isExclusive: false,
  expirationAdv: '',
  advStructCalls: 'Не важно',
  newbId: null,
  onlyNew: false,
};
const resetFilter = {
  onlyNew: false,
  typeRealty: 'live',
  typeObject: [],
  users: user?.isAdmin === '1' ? [] : [user],
  office: [],
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
  cords: null,
  dealType: '',
  platform: '',
  agentType: 'all',
  onAdv: 'pofig',
  ExternalFindType: 'our',
  curPlatform: '',
  platform: '',
  forModeration: false,
  isExclusive: false,
  expirationAdv: '',
  advStructCalls: 'Не важно',
  newbId: null,
};
const ObjectsFilterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [usersLoading, setUsersLoading] = useState(false);
  const [officeList, setOfficeList] = useState([]);
  const [newBuilderList, setNewBuilderList] = useState([]);
  const [newBuilderLoading, setNewBuilderLoading] = useState(false);
  const filter = useSelector((state) => state.objects.filter);
  const officeRequest = useRef(false);
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
  const getOfficeList = (value) => {
    if (value.length < 2) {
      setOfficeList([]);
      return;
    }
    if (officeRequest.current) {
      return;
    }
    officeRequest.current = true;
    getLocalOfficeList(value)
      .then((data) => {
        setOfficeList(data);
      })
      .finally(() => {
        officeRequest.current = false;
      });
  };
  const getNewBuilder = (value) => {
    if (value.length < 2) {
      return;
    }
    if (newBuilderLoading) {
      return;
    }
    setNewBuilderLoading(true);
    getNewBuilderList({
      requet: value,
      isSuburban: getValues('isSuburban'),
    })
      .then((data) => {
        setNewBuilderList(data);
      })
      .finally(() => {
        setNewBuilderLoading(false);
      });
  };
  const onSubmit = (data) => {
    dispatch(setFilter(data));
    dispatch(getObjectList());
    onClose();
    localStorage.setItem('filterObject', JSON.stringify(data));
  };
  const resetForm = () => {
    dispatch(setFilter(deafaultFilter));
    reset(resetFilter);
    setUsers([]);
    localStorage.removeItem('filterObject');
  };
  watch('typeRealty');
  watch('typeObject');
  watch('ExternalFindType');
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
      <FormTop>
        <FormTitle>Фильтр</FormTitle>
        <Controller
          name='ExternalFindType'
          control={control}
          render={({ field }) => (
            <ButtonToggleGroup fullWidth>
              <ButtonToggleItem
                id='our'
                active={field.value}
                onClick={(e) => {
                  field.onChange(e.target.id);
                }}
              >
                НАША БАЗА
              </ButtonToggleItem>
              <ButtonToggleItem
                id='outer'
                active={field.value}
                onClick={(e) => {
                  field.onChange(e.target.id);
                }}
              >
                ВНЕШНЯЯ
              </ButtonToggleItem>
            </ButtonToggleGroup>
          )}
        />
        {getValues('ExternalFindType') === 'our' && (
          <>
            <Controller
              name='users'
              control={control}
              render={({ field }) => (
                <SelectAutoсompleteMultipleUI
                  small
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
              name='office'
              control={control}
              render={({ field }) => (
                <SelectAutoсompleteUI
                  small
                  label='Офис'
                  options={officeList}
                  getOptionsLabel={(options) => options.name}
                  onChange={(option) => field.onChange(option)}
                  value={field.value}
                  inputChange={getOfficeList}
                />
              )}
            />
          </>
        )}
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
              small
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
              small
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
              small
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
          name='Address'
          control={control}
          render={({ field }) => (
            <Dadata
              label='Адрес'
              value={field.value || ''}
              onChange={(value) => field.onChange(value)}
              small
            />
          )}
        />
        {getValues('typeObject') &&
          getValues('typeObject').includes('newBuildingFlatSale') && (
            <Controller
              name='newbId'
              control={control}
              render={({ field }) => (
                <SelectAutoсompleteUI
                  label='ЖК'
                  inputChange={getNewBuilder}
                  options={newBuilderList}
                  loading={newBuilderLoading}
                  getOptionsLabel={(options) => options.resName}
                  getOptionsSubtitle={(options) => options.addrString}
                  onChange={(option) => field.onChange(option)}
                  value={field.value}
                  small
                  error={errors?.newbId}
                />
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
                  small
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
                  small
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
        {getValues('ExternalFindType') === 'our' && (
          <>
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
                      small
                    >
                      <SelectItemUI value='dupt'>
                        Договор уступки права требования
                      </SelectItemUI>
                      <SelectItemUI value='dzhsk'>Договор ЖСК</SelectItemUI>
                      <SelectItemUI value='free'>
                        Свободная продажа
                      </SelectItemUI>
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
          </>
        )}
        {getTotalArea() && (
          <Box column ai='flex-start' gap='0.2rem'>
            <TextSpanStyle>Площадь общая</TextSpanStyle>
            <Box>
              <Controller
                name={`TotalArea.${[0]}`}
                control={control}
                render={({ field }) => (
                  <InputUI
                    small
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
                    small
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
                    small
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
                    small
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
                    small
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
                    small
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
                    small
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
                    small
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
                small
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
        {getFloors() && (
          <Box column ai='flex-start' gap='0.2rem'>
            <TextSpanStyle>Этаж</TextSpanStyle>
            <Box>
              <Controller
                name={`Floor.${[0]}`}
                control={control}
                render={({ field }) => (
                  <InputUI
                    small
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
                    small
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
        {getValues('ExternalFindType') === 'outer' && (
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
                  small
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
                  small
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
          name='onlyNew'
          control={control}
          render={({ field }) => (
            <CheckboxUI
              label='Только новые'
              id='onlyNew'
              size='small'
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        {getValues('ExternalFindType') === 'our' && (
          <Accordeon title='Дополнительно'>
            <Box column ai='normal'>
              <Controller
                name='stage'
                control={control}
                render={({ field }) => (
                  <SelectUI
                    onChange={(newValue) => field.onChange(newValue)}
                    select={field.value || ''}
                    multiple
                    label='Стадия'
                    small
                  >
                    <SelectItemUI value=''>Выбрать</SelectItemUI>
                    <SelectItemUI value='0'>Черновик</SelectItemUI>
                    <SelectItemUI value='1'>Активный</SelectItemUI>
                    <SelectItemUI value='2'>Закрепление</SelectItemUI>
                    <SelectItemUI value='3'>Продано</SelectItemUI>
                    <SelectItemUI value='4'>Срыв</SelectItemUI>
                  </SelectUI>
                )}
              />
              <Controller
                name='onAdv'
                control={control}
                render={({ field }) => (
                  <SelectUI
                    onChange={(newValue) => field.onChange(newValue)}
                    select={field.value || 'pofig'}
                    multiple
                    label='В рекламе'
                    small
                  >
                    <SelectItemUI value='yes'>Да</SelectItemUI>
                    <SelectItemUI value='no'>Нет</SelectItemUI>
                    <SelectItemUI value='pofig'>Не важно</SelectItemUI>
                  </SelectUI>
                )}
              />
              <Controller
                name='curPlatform'
                control={control}
                render={({ field }) => (
                  <SelectUI
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    select={field.value || ''}
                    label='Площадка'
                    small
                  >
                    <SelectItemUI value='avito'>Авито</SelectItemUI>
                    <SelectItemUI value='cian'>ЦИАН</SelectItemUI>
                    <SelectItemUI value='yandex'>Яндекс</SelectItemUI>
                    <SelectItemUI value='domclick'>Домклик</SelectItemUI>
                  </SelectUI>
                )}
              />
              <Controller
                name='expirationAdv'
                control={control}
                render={({ field }) => (
                  <InputUI
                    small
                    label='Конец размещения'
                    value={field.value || ''}
                    onChange={field.onChange}
                    type='date'
                  />
                )}
              />
              <Controller
                name='advStructCalls'
                control={control}
                render={({ field }) => (
                  <SelectUI
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    select={field.value}
                    multiple
                    label='Без звонков месяц'
                    small
                  >
                    <SelectItemUI value='Не важно'>Не важно</SelectItemUI>
                    <SelectItemUI value='Avito'>Avito</SelectItemUI>
                    <SelectItemUI value='Cian'>Cian</SelectItemUI>
                  </SelectUI>
                )}
              />
              <Controller
                name='forModeration'
                control={control}
                render={({ field }) => (
                  <CheckboxUI
                    label='Ждут подтверждения'
                    id='forModeration'
                    checked={field.value || false}
                    onChange={(e) => field.onChange(e.target.checked)}
                    size='small'
                  />
                )}
              />
              <Controller
                name='isExclusive'
                control={control}
                render={({ field }) => (
                  <CheckboxUI
                    label='Эксклюзив'
                    id='isExclusive'
                    size='small'
                    checked={field.value || false}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            </Box>
          </Accordeon>
        )}
      </FormTop>
    </ObjectsFilterFormStyle>
  );
};

export default ObjectsFilterForm;
