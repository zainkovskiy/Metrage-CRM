import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import {
  FilterFields,
  FilterFormStyle,
  FilterTitle,
} from '../../styles/filter';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import {
  getUserList,
  getLocalOfficeList,
  getJKByReq,
  getDeveloperByReq,
} from 'api/search';
import {
  defaultFixationFilter,
  getFixationList,
  resetFixationFilter,
} from '../../store/slices/fixationSlice';

const FixationFilterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.fixation);
  const { handleSubmit, control, reset, watch, getValues } = useForm({
    defaultValues: filter,
  });
  const [users, setUsers] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [jkList, setJKList] = useState([]);
  const [developerList, setDeveloperList] = useState([]);
  const sendRequest = useRef(false);
  const onSubmit = (data) => {
    dispatch(getFixationList(data));
    localStorage.setItem('clientFixation', JSON.stringify(data));
    onClose();
  };
  const setResetFilter = () => {
    reset(defaultFixationFilter);
    dispatch(resetFixationFilter());
    localStorage.removeItem('clientFixation');
  };
  const getUsers = (value) => {
    if (value.length < 2) {
      setUsers([]);
      return;
    }
    if (sendRequest.current) {
      return;
    }
    sendRequest.current = true;
    getUserList(value)
      .then((data) => {
        setUsers(data);
      })
      .finally(() => {
        sendRequest.current = false;
      });
  };
  const getOfficeList = (value) => {
    if (value.length < 2) {
      setOfficeList([]);
      return;
    }
    if (sendRequest.current) {
      return;
    }
    sendRequest.current = true;
    getLocalOfficeList(value)
      .then((data) => {
        setOfficeList(data);
      })
      .finally(() => {
        sendRequest.current = false;
      });
  };
  const getJKList = (value) => {
    if (value.length < 2) {
      setJKList([]);
      return;
    }
    if (sendRequest.current) {
      return;
    }
    sendRequest.current = true;
    getJKByReq(value)
      .then((data) => {
        setJKList(data);
      })
      .finally(() => {
        sendRequest.current = false;
      });
  };
  const getDeveloperList = (value) => {
    if (value.length < 2) {
      setDeveloperList([]);
      return;
    }
    if (sendRequest.current) {
      return;
    }
    sendRequest.current = true;
    getDeveloperByReq(value)
      .then((data) => {
        setDeveloperList(data);
      })
      .finally(() => {
        sendRequest.current = false;
      });
  };
  watch('typeObject');
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
          name='fixationType'
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => field.onChange(newValue)}
              select={field.value}
              label='Тип'
            >
              <SelectItemUI value='0'>Уведомление</SelectItemUI>
              <SelectItemUI value='1'>Бронь</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          control={control}
          name='typeObject'
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => field.onChange(newValue)}
              select={field.value}
              label='Тип объекта'
            >
              <SelectItemUI value='0'>Новостройка</SelectItemUI>
              <SelectItemUI value='1'>Загородка</SelectItemUI>
            </SelectUI>
          )}
        />
        {getValues('typeObject') === '1' && (
          <Controller
            control={control}
            name='suburbanType'
            render={({ field }) => (
              <SelectUI
                onChange={(newValue) => field.onChange(newValue)}
                select={field.value}
                label='Тип'
              >
                <SelectItemUI value='1'>Участок с подрядом</SelectItemUI>
                <SelectItemUI value='2'>Участок</SelectItemUI>
                <SelectItemUI value='3'>Подряд</SelectItemUI>
              </SelectUI>
            )}
          />
        )}

        <Controller
          name='realtor'
          control={control}
          render={({ field }) => (
            <SelectAutoсompleteUI
              label='Риелтор'
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
          name='stageId'
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => field.onChange(newValue)}
              select={field.value}
              label='Стадия'
            >
              <SelectItemUI value='0'>Новая</SelectItemUI>
              <SelectItemUI value='1'>Отправлена</SelectItemUI>
              <SelectItemUI value='2'>Подтверждена</SelectItemUI>
              <SelectItemUI value='3'>Исполнено</SelectItemUI>
              <SelectItemUI value='4'>Отказано</SelectItemUI>
              <SelectItemUI value='5'>Срыв</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          name='jk'
          control={control}
          render={({ field }) => (
            <SelectAutoсompleteUI
              label='ЖК(КП)'
              options={jkList}
              getOptionsLabel={(options) => options.name}
              getOptionsSubtitle={(options) => options.addrStr}
              onChange={(option) => field.onChange(option)}
              value={field.value}
              inputChange={getJKList}
            />
          )}
        />
        <Controller
          name='developer'
          control={control}
          render={({ field }) => (
            <SelectAutoсompleteUI
              label='Застройщик(Подрядчик)'
              options={developerList}
              getOptionsLabel={(options) => options.devName}
              onChange={(option) => field.onChange(option)}
              value={field.value}
              inputChange={getDeveloperList}
            />
          )}
        />
      </FilterFields>
    </FilterFormStyle>
  );
};
export default FixationFilterForm;
