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
import { CheckboxUI } from 'ui/CheckboxUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import {
  getBankList,
  getLegalList,
  getLocalOfficeList,
  getUserList,
} from '../../api/search';
import {
  defaultDDSFilter,
  resetDDSFilter,
  getDDSData,
} from '../../store/slices/ddsSlice';

const DDSFilterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.dds);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: filter,
  });
  const legalRequest = useRef(false);
  const bankRequest = useRef(false);
  const officeRequest = useRef(false);
  const userRequest = useRef(false);
  const [legalList, setLegalList] = useState([]);
  const [bankList, setBankList] = useState([]);
  const [officeList, setOfficeList] = useState([]);
  const [users, setUsers] = useState([]);
  const onSubmit = (data) => {
    dispatch(getDDSData(data));
    localStorage.setItem('filterDDS', JSON.stringify(data));
    onClose();
  };
  const setResetFilter = () => {
    reset(defaultDDSFilter);
    dispatch(resetDDSFilter());
    localStorage.removeItem('filterDDS');
  };
  const reqLegalList = (value) => {
    if (value.length < 2) {
      setLegalList([]);
      return;
    }
    if (legalRequest.current) {
      return;
    }
    legalRequest.current = true;
    getLegalList(value)
      .then((data) => {
        setLegalList(data);
      })
      .finally(() => {
        legalRequest.current = false;
      });
  };
  const reqBankList = (value) => {
    if (value.length < 2) {
      setBankList([]);
      return;
    }
    if (bankRequest.current) {
      return;
    }
    bankRequest.current = true;
    getBankList(value)
      .then((data) => {
        setBankList(data);
      })
      .finally(() => {
        bankRequest.current = false;
      });
  };
  const reqOfficeList = (value) => {
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
          control={control}
          name='periodFrom'
          render={({ field }) => (
            <InputUI
              type='date'
              value={field.value}
              onChange={field.onChange}
              fullWidth
              label='Период, от'
            />
          )}
        />
        <Controller
          control={control}
          name='periodTo'
          render={({ field }) => (
            <InputUI
              type='date'
              value={field.value}
              onChange={field.onChange}
              fullWidth
              label='Период, до'
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
              inputChange={reqOfficeList}
            />
          )}
        />
        <Controller
          name='resipient'
          control={control}
          render={({ field }) => (
            <SelectAutoсompleteUI
              label='Получатель'
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
          name='legal'
          control={control}
          render={({ field }) => (
            <SelectAutoсompleteUI
              label='Юр.лицо'
              options={legalList}
              getOptionsLabel={(options) => options.name}
              onChange={(option) => field.onChange(option)}
              value={field.value}
              inputChange={reqLegalList}
            />
          )}
        />
        <Controller
          name='bank'
          control={control}
          render={({ field }) => (
            <SelectAutoсompleteUI
              label='Банк/касса'
              options={bankList}
              getOptionsLabel={(options) => options.name}
              onChange={(option) => field.onChange(option)}
              value={field.value}
              inputChange={reqBankList}
            />
          )}
        />
        <Controller
          name='isDeleted'
          control={control}
          render={({ field }) => (
            <CheckboxUI
              label='Включая удалённые'
              id='isDeleted'
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </FilterFields>
    </FilterFormStyle>
  );
};
export default DDSFilterForm;
