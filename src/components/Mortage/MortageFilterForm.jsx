import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
  FilterFields,
  FilterFormStyle,
  FilterTitle,
} from '../../styles/filter';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { getUserList } from 'api/search';
import {
  getMortageList,
  resetMortageFilter,
  defaultMortageFilter,
} from '../../store/slices/mortageSlice';

const MortageFilterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { stageList, filter } = useSelector((state) => state.mortage);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: filter,
  });
  const [users, setUsers] = useState([]);
  const usersRequest = useRef(false);
  const onSubmit = (data) => {
    dispatch(getMortageList(data));
    localStorage.setItem('filterMortage', JSON.stringify(data));
    onClose();
  };
  const setResetFilter = () => {
    reset(defaultMortageFilter);
    dispatch(resetMortageFilter());
    localStorage.removeItem('filterMortage');
  };
  const getUsers = (value) => {
    if (value.length < 2) {
      setUsers([]);
      return;
    }
    if (usersRequest.current) {
      return;
    }
    usersRequest.current = true;
    getUserList(value)
      .then((data) => {
        setUsers(data);
      })
      .finally(() => {
        usersRequest.current = false;
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
          control={control}
          name='stageId'
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => field.onChange(newValue)}
              select={field.value}
              label='Стадия'
            >
              {stageList.map((stage) => (
                <SelectItemUI key={stage} value={stage}>
                  {stage}
                </SelectItemUI>
              ))}
            </SelectUI>
          )}
        />
        <Controller
          control={control}
          name='createdFrom'
          render={({ field }) => (
            <InputUI
              type='date'
              value={field.value}
              onChange={field.onChange}
              fullWidth
              label='Дата создания, от'
            />
          )}
        />
        <Controller
          control={control}
          name='createdTo'
          render={({ field }) => (
            <InputUI
              type='date'
              value={field.value}
              onChange={field.onChange}
              fullWidth
              label='Дата создания, до'
            />
          )}
        />
        <Controller
          name='broker'
          control={control}
          render={({ field }) => (
            <SelectAutoсompleteUI
              label='Брокер'
              options={users}
              getOptionsLabel={(options) =>
                `${options.lastName || ''} ${options.firstName || ''} ${
                  options.secondName || ''
                }`
              }
              onChange={(option) => field.onChange(option)}
              value={field.value}
              inputChange={getUsers}
            />
          )}
        />
        <Controller
          control={control}
          name='typeRealty'
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => field.onChange(newValue)}
              select={field.value}
              label='Тип недвижимости'
            >
              <SelectItemUI value='Вторичка'>Вторичка</SelectItemUI>
              <SelectItemUI value='Новостройка'>Новостройка</SelectItemUI>
              <SelectItemUI value='ИЖС'>ИЖС</SelectItemUI>
            </SelectUI>
          )}
        />
      </FilterFields>
    </FilterFormStyle>
  );
};
export default MortageFilterForm;
