import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { findBuilderList } from '../../api/search';
import {
  SelectMultipleUI,
  SelectMultipleItemUI,
} from 'ui/SelectMultipleUI/SelectMultipleUI';
import {
  FilterFormStyle,
  FilterTitle,
  FilterFields,
} from '../../styles/filter';
import {
  getResidentialList,
  defaultResidentialFilter,
  resetFilter,
} from '../../store/slices/residentialSlice';

const ResidentialFilterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { modelFilter, schema, filter } = useSelector(
    (state) => state.residential
  );
  const builderRequest = useRef(false);
  const [builderList, setBuilderList] = useState([]);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: filter,
  });
  const onSubmit = (data) => {
    dispatch(getResidentialList(data));
    localStorage.setItem('filterResidential', JSON.stringify(data));
    onClose();
  };
  const setResetFilter = () => {
    reset(defaultResidentialFilter);
    dispatch(resetFilter());
    localStorage.removeItem('filterResidential');
  };
  const getBuilders = (value) => {
    if (value.length < 2) {
      setBuilderList([]);
      return;
    }
    if (builderRequest.current) {
      return;
    }
    builderRequest.current = true;
    findBuilderList(value)
      .then((data) => {
        setBuilderList(data);
      })
      .finally(() => {
        builderRequest.current = false;
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
        {modelFilter === 'ЖК-БЦ' && (
          <>
            <Controller
              name='JKType'
              control={control}
              render={({ field }) => (
                <SelectUI
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  select={field.value}
                  label='Тип'
                >
                  <SelectItemUI value=''>Все</SelectItemUI>
                  <SelectItemUI value='ЖК'>ЖК</SelectItemUI>
                  <SelectItemUI value='БЦ'>БЦ</SelectItemUI>
                </SelectUI>
              )}
            />
            <Controller
              name='devId'
              control={control}
              render={({ field }) => (
                <SelectAutoсompleteUI
                  label='Застройщик'
                  options={builderList}
                  getOptionsLabel={(options) => options.devName}
                  onChange={(option) => field.onChange(option)}
                  value={field.value}
                  inputChange={getBuilders}
                />
              )}
            />
            <Controller
              control={control}
              name='deadLine'
              render={({ field }) => (
                <InputUI
                  value={field.value}
                  onChange={field.onChange}
                  label='Сдача до'
                  type='month'
                />
              )}
            />
            <Controller
              name='isBuild'
              control={control}
              render={({ field }) => (
                <CheckboxUI
                  label='Дом сдан'
                  id='isBuild'
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <Controller
              name='hasVariants'
              control={control}
              render={({ field }) => (
                <CheckboxUI
                  label='Объекты в продаже'
                  id='hasVariants'
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <Controller
              name='hasComission'
              control={control}
              render={({ field }) => (
                <CheckboxUI
                  label='Платят комиссию'
                  id='hasComission'
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </>
        )}
        {modelFilter === 'КП' && (
          <>
            {schema?.bankSchema && (
              <Controller
                name='hasAccreditation'
                control={control}
                render={({ field }) => (
                  <SelectMultipleUI
                    onChange={(newValue) => field.onChange(newValue)}
                    value={field.value || []}
                    multiple
                    fullWidth
                    label='Аккредитация'
                  >
                    {schema.bankSchema.map((bank) => (
                      <SelectMultipleItemUI
                        key={bank.UID}
                        value={bank.bankName}
                      >
                        {bank.bankName}
                      </SelectMultipleItemUI>
                    ))}
                  </SelectMultipleUI>
                )}
              />
            )}
            <Controller
              name='hasHouse'
              control={control}
              render={({ field }) => (
                <CheckboxUI
                  label='Есть дома'
                  id='hasHouse'
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <Controller
              name='hasLand'
              control={control}
              render={({ field }) => (
                <CheckboxUI
                  label='Есть участки'
                  id='hasLand'
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <Controller
              name='hasWater'
              control={control}
              render={({ field }) => (
                <CheckboxUI
                  label='Есть вода'
                  id='hasWater'
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <Controller
              name='hasElectricity'
              control={control}
              render={({ field }) => (
                <CheckboxUI
                  label='Есть электричество'
                  id='hasElectricity'
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <Controller
              name='hasGas'
              control={control}
              render={({ field }) => (
                <CheckboxUI
                  label='Есть газ'
                  id='hasGas'
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <Controller
              name='hasComission'
              control={control}
              render={({ field }) => (
                <CheckboxUI
                  label='Платят комиссию'
                  id='hasComission'
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </>
        )}
      </FilterFields>
    </FilterFormStyle>
  );
};

export default ResidentialFilterForm;
