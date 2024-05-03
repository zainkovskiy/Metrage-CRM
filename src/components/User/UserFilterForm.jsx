import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import {
  FilterFormStyle,
  FilterTitle,
  FilterFields,
} from '../../styles/filter';
import {
  defaultUsersFilter,
  getUsersList,
  resetFilter,
} from '../../store/usersSlice';
import { getLocalOfficeList, getUserList } from '../../api/search';

const UserFilterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [officeList, setOfficeList] = useState([]);
  const [users, setUsers] = useState([]);
  const officeRequest = useRef(false);
  const userRequest = useRef(false);
  const filter = useSelector((state) => state.users.filter);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: filter,
  });
  const onSubmit = (data) => {
    dispatch(getUsersList(data));
    localStorage.setItem('filterUsers', JSON.stringify(data));
    onClose();
  };
  const setResetFilter = () => {
    reset(defaultUsersFilter);
    dispatch(resetFilter());
    localStorage.removeItem('filterUsers');
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
  const getUsers = (value) => {
    if (value.length < 2) {
      setUsers([]);
      return;
    }
    if (userRequest.current) {
      return;
    }
    userRequest.current = true;
    getUserList(value)
      .then((data) => {
        setUsers(data);
      })
      .finally(() => {
        userRequest.current = false;
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
          name='user'
          control={control}
          render={({ field }) => (
            <SelectAutoсompleteUI
              label='Пользователь'
              options={users}
              getOptionsLabel={(options) =>
                `${options.lastName || ''} ${options.firstName || ''} ${
                  options.secondName || ''
                }`
              }
              onChange={(user) => field.onChange(user)}
              value={field.value}
              inputChange={getUsers}
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
          name='withMegafon'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              select={field.value || 'all'}
              label='Наличие корп.связи'
            >
              <SelectItemUI value='all'>Любое</SelectItemUI>
              <SelectItemUI value='with'>Есть</SelectItemUI>
              <SelectItemUI value='without'>Отсутствует</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          control={control}
          name='fired'
          render={({ field }) => (
            <CheckboxUI
              label='Показать уволенных'
              onChange={(e) => {
                field.onChange(e.target.checked);
              }}
              checked={field.value || false}
              id='fired'
            />
          )}
        />
      </FilterFields>
    </FilterFormStyle>
  );
};

export default UserFilterForm;
