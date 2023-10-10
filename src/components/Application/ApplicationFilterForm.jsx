import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SelectAutoсompleteMultipleUI } from 'ui/SelectAutoсompleteMultipleUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { getUserList } from 'api/search';
import { setApplicationFilter } from 'store/applicationSlice';
import { getApplicationFilterList } from '../../store/applicationSlice';

const ApplicationSlideFilterSlide = styled.form`
  height: 100%;
  border-radius: 5px;
  background-color: #fff;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  box-sizing: border-box;
`;
const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  flex-grow: 1;
`;
const user = globalUser ? JSON.parse(globalUser) : null;
const resetFilter = {
  users: [user],
  status: 'all',
  type: 'all',
  isFailure: false,
  isWork: true,
};
const ApplicationFilterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.application.filter);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: filter,
  });
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
    dispatch(getApplicationFilterList(data));
    onClose();
  };
  const setResetFilter = () => {
    reset(resetFilter);
    dispatch(setApplicationFilter(resetFilter));
  };
  return (
    <ApplicationSlideFilterSlide onSubmit={handleSubmit(onSubmit)}>
      <FormFields>
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
              <SelectItemUI value='first'>Первый контакт</SelectItemUI>
              <SelectItemUI value='meet'>Проведена встреча</SelectItemUI>
              <SelectItemUI value='show'>Показы</SelectItemUI>
              <SelectItemUI value='catch'>Закрепление</SelectItemUI>
              <SelectItemUI value='success'>Успешно</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          name='type'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              select={field.value || 'all'}
              label='Тип потребности'
            >
              <SelectItemUI value='all'>Все</SelectItemUI>
              <SelectItemUI value='sell'>Продать</SelectItemUI>
              <SelectItemUI value='buy'>Купить</SelectItemUI>
              <SelectItemUI value='rent'>Сдать</SelectItemUI>
              <SelectItemUI value='take'>Снять</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          name='isWork'
          control={control}
          render={({ field }) => (
            <CheckboxUI
              label='В работе'
              id='isWork'
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        <Controller
          name='isFailure'
          control={control}
          render={({ field }) => (
            <CheckboxUI
              label='Срыв'
              id='isFailure'
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </FormFields>
      <Box>
        <ButtonUI type='submit' fullWidth>
          Применить
        </ButtonUI>
        <ButtonUI variant='outline' fullWidth onClick={setResetFilter}>
          Очистить
        </ButtonUI>
      </Box>
    </ApplicationSlideFilterSlide>
  );
};

export default ApplicationFilterForm;
