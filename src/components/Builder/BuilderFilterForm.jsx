import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import {
  FilterFormStyle,
  FilterTitle,
  FilterFields,
} from '../../styles/filter';
import {
  getBuilderList,
  defaultBuilderFilter,
  resetFilter,
} from '../../store/slices/builderSlice';

const BuilderFilterForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.builder.filter);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: filter,
  });
  const onSubmit = (data) => {
    dispatch(getBuilderList(data));
    localStorage.setItem('filterBuilder', JSON.stringify(data));
    onClose();
  };
  const setResetFilter = () => {
    reset(defaultBuilderFilter);
    dispatch(resetFilter());
    localStorage.removeItem('filterBuilder');
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
          name='devType'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              select={field.value}
              label='Тип застройщика'
            >
              <SelectItemUI value='МКД'>МКД</SelectItemUI>
              <SelectItemUI value='ИЖС'>ИЖС</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          name='region'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              select={field.value}
              label='Регион'
            >
              <SelectItemUI value='Новосибирск'>Новосибирск</SelectItemUI>
              <SelectItemUI value='Москва'>Москва</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          control={control}
          name='comissionSize'
          render={({ field }) => (
            <InputUI
              value={field.value}
              onChange={field.onChange}
              label='Коммисия от'
              type='number'
            />
          )}
        />
        <Controller
          name='onProcessHouses'
          control={control}
          render={({ field }) => (
            <CheckboxUI
              label='Есть сданные дома'
              id='onProcessHouses'
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </FilterFields>
    </FilterFormStyle>
  );
};

export default BuilderFilterForm;
