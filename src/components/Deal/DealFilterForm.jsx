import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from 'api/search';
import { Box } from 'ui/Box';
import { CheckboxUI } from 'ui/CheckboxUI';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { SelectAutoсompleteMultipleUI } from 'ui/SelectAutoсompleteMultipleUI';
import {
  FilterFormStyle,
  FilterTitle,
  FilterFields,
} from '../../styles/filter';
import {
  defaultDealFilter,
  getDealList,
  resetFilter,
} from '../../store/dealSlice';
import { getLocalOfficeList } from '../../api/search';

const DealFilterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const filter = useSelector((state) => state.deal.filter);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: filter,
  });
  const onSubmit = (data) => {
    dispatch(getDealList(data));
    localStorage.setItem('filterDeal', JSON.stringify(data));
    onClose();
  };
  const setResetFilter = () => {
    reset(defaultDealFilter);
    dispatch(resetFilter());
    localStorage.removeItem('filterDeal');
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
  const getLawyers = (value) => {
    if (value.length < 2) {
      setLawyers([]);
      return;
    }
    getUserList(value).then((data) => {
      setLawyers(data);
    });
  };
  const getOfficeList = (value) => {
    if (value.length < 2) {
      setOfficeList([]);
      return;
    }
    getLocalOfficeList(value).then((data) => {
      setOfficeList(data);
    });
  };
  return (
    <FilterFormStyle onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <ButtonUI type='submit' fullWidth>
          Применить
        </ButtonUI>
        <ButtonUI variant='outline' fullWidth onClick={setResetFilter}>
          Очистить
        </ButtonUI>
      </Box>
      <FilterFields>
        <FilterTitle>Фильтр</FilterTitle>
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
              label='Офис'
              options={officeList}
              getOptionsLabel={(options) => options.name}
              onChange={(option) => field.onChange(option)}
              value={field.value}
              inputChange={getOfficeList}
            />
          )}
        />
        <Controller
          name='lawyer'
          control={control}
          render={({ field }) => (
            <SelectAutoсompleteUI
              label='Юрист'
              options={lawyers}
              getOptionsLabel={(options) =>
                `${options.lastName || ''} ${options.firstName || ''} ${
                  options.secondName || ''
                }`
              }
              onChange={(lawyer) => field.onChange(lawyer)}
              value={field.value || ''}
              inputChange={getLawyers}
            />
          )}
        />
        <Controller
          name='dealType'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              select={field.value}
              label='Тип сделки'
            >
              <SelectItemUI value='all'>Все</SelectItemUI>
              <SelectItemUI value='simple'>Обычная</SelectItemUI>
              <SelectItemUI value='developer'>От застройщика</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          name='status'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              select={field.value || 'all'}
              label='Статус'
            >
              <SelectItemUI value='all'>Все</SelectItemUI>
              <SelectItemUI value='new'>Закрепление</SelectItemUI>
              <SelectItemUI value='pre'>ПДКП</SelectItemUI>
              <SelectItemUI value='success'>ДКП</SelectItemUI>
              <SelectItemUI value='registration'>Акт подписан</SelectItemUI>
              <SelectItemUI value='finally'>Оплачено</SelectItemUI>
              <SelectItemUI value='loss'>Срыв</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          name='agentsCalculated'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              select={field.value || 'all'}
              label='Агент расчитан полностью'
            >
              <SelectItemUI value='all'>Все</SelectItemUI>
              <SelectItemUI value='yes'>Да</SelectItemUI>
              <SelectItemUI value='no'>Нет</SelectItemUI>
            </SelectUI>
          )}
        />
        <Box wrap>
          <Controller
            control={control}
            name='plannedDateFrom'
            render={({ field }) => (
              <InputUI
                type='date'
                value={field.value}
                onChange={field.onChange}
                fg='1'
                label='Дата сделки (План) От'
              />
            )}
          />
          <Controller
            control={control}
            name='plannedDateTo'
            render={({ field }) => (
              <InputUI
                type='date'
                value={field.value}
                onChange={field.onChange}
                fg='1'
                label='Дата сделки (План) До'
              />
            )}
          />
        </Box>
        <Box wrap>
          <Controller
            control={control}
            name='actualDateFrom'
            render={({ field }) => (
              <InputUI
                type='date'
                value={field.value}
                onChange={field.onChange}
                fg='1'
                label='Дата сделки (Факт) От'
              />
            )}
          />
          <Controller
            control={control}
            name='actualDateTo'
            render={({ field }) => (
              <InputUI
                type='date'
                value={field.value}
                onChange={field.onChange}
                fg='1'
                label='Дата сделки (Факт) До'
              />
            )}
          />
        </Box>
        <Controller
          name='isFromExternal'
          control={control}
          render={({ field }) => (
            <CheckboxUI
              label='Сделка по лидам'
              id='isFromExternal'
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </FilterFields>
    </FilterFormStyle>
  );
};

export default DealFilterForm;
