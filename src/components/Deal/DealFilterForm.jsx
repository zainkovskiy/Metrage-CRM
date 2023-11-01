import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from 'api/search';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
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

const DealFilterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
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
              <SelectItemUI value='finally'>Агент расчитан</SelectItemUI>
              <SelectItemUI value='loss'>Срыв</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          control={control}
          name='plannedDate'
          render={({ field }) => (
            <InputUI
              type='date'
              small
              value={field.value}
              onChange={field.onChange}
              label='Дата сделки (План) *'
            />
          )}
        />
      </FilterFields>
    </FilterFormStyle>
  );
};

export default DealFilterForm;
