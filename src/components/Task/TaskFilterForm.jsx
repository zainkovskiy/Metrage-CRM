import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from 'api/search';
import { getLocalOfficeList } from 'api/search';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { SelectAutoсompleteMultipleUI } from 'ui/SelectAutoсompleteMultipleUI';
import {
  FilterFormStyle,
  FilterTitle,
  FilterFields,
} from '../../styles/filter';
import {
  defaultTaskFilter,
  getTaskList,
  resetFilter,
} from '../../store/taskSlice';

const TaskFilterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [officeList, setOfficeList] = useState([]);
  const filter = useSelector((state) => state.task.filter);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: filter,
  });
  const onSubmit = (data) => {
    dispatch(getTaskList(data));
    localStorage.setItem('filterTask', JSON.stringify(data));
    onClose();
  };
  const setResetFilter = () => {
    reset(defaultTaskFilter);
    dispatch(resetFilter());
    localStorage.removeItem('filterTask');
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
          control={control}
          name='inWork'
          render={({ field }) => (
            <CheckboxUI
              label='В работе'
              onChange={(e) => {
                field.onChange(e.target.checked);
              }}
              checked={field.value || false}
              id='inWork'
            />
          )}
        />
        <Controller
          control={control}
          name='completed'
          render={({ field }) => (
            <CheckboxUI
              label='Завершенные'
              onChange={(e) => {
                field.onChange(e.target.checked);
              }}
              checked={field.value || false}
              id='completed'
            />
          )}
        />
      </FilterFields>
    </FilterFormStyle>
  );
};

export default TaskFilterForm;
