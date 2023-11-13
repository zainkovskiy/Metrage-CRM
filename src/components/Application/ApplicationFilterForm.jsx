import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { SelectAutoсompleteMultipleUI } from 'ui/SelectAutoсompleteMultipleUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { getUserList } from 'api/search';
import { setApplicationFilter } from 'store/applicationSlice';
import { getApplicationFilterList } from '../../store/applicationSlice';
import { getLocalOfficeList } from '../../api/search';
import {
  FilterFields,
  FilterFormStyle,
  FilterTitle,
} from '../../styles/filter';
import { defaultAppFilter } from '../../store/applicationSlice';

const ApplicationFilterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.application.filter);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [officeList, setOfficeList] = useState([]);
  const officeRequest = useRef(false);
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
  const onSubmit = (data) => {
    localStorage.setItem('filterApplication', JSON.stringify(data));
    dispatch(getApplicationFilterList(data));
    onClose();
  };
  const setResetFilter = () => {
    reset(defaultAppFilter);
    dispatch(setApplicationFilter(defaultAppFilter));
    localStorage.removeItem('filterApplication');
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
      </FilterFields>
    </FilterFormStyle>
  );
};

export default ApplicationFilterForm;
