import React, { useState, useRef } from 'react';
import { useFormState, Controller, useFormContext } from 'react-hook-form';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';

import * as S from './styleNew';
import { InputUI } from 'ui/InputUI';
import { getJKByReq } from '../../../api/search';

const NewBuildingFields = () => {
  const { getValues, watch } = useFormContext();
  const { control } = useFormState();
  const [jkList, setJKList] = useState([]);
  const jkRequest = useRef(false);

  const reqJKList = (value) => {
    if (value.length < 2) {
      setJKList([]);
      return;
    }
    if (jkRequest.current) {
      return;
    }
    jkRequest.current = true;
    getJKByReq(value)
      .then((data) => {
        setJKList(data);
      })
      .finally(() => {
        jkRequest.current = false;
      });
  };
  watch('jk');
  watch('fixationType');
  return (
    <S.FormGrid>
      <Controller
        name='jk'
        control={control}
        render={({ field }) => (
          <SelectAutoсompleteUI
            small
            label='ЖК'
            options={jkList}
            getOptionsLabel={(options) => options.name}
            getOptionsSubtitle={(options) => options.addrStr}
            onChange={(option) => field.onChange(option)}
            value={field.value}
            inputChange={reqJKList}
            helperText='* при отсутствии укажите “Нет в списке”'
            ignoreRegExp={true}
          />
        )}
      />
      <Controller
        control={control}
        name='corpus'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label={
              getValues('jk') && getValues('jk').name === 'Нет в списке'
                ? 'Название ЖК и адрес корпуса'
                : 'Корпус'
            }
            disabled={!getValues('jk')}
          />
        )}
      />
      <Controller
        control={control}
        name='apparmentNumber'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Номер квартиры*'
            helperText='* если известен'
          />
        )}
      />
      <Controller
        control={control}
        name='floor'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Этаж'
          />
        )}
      />
      {getValues('fixationType') === '1' && (
        <>
          <Controller
            control={control}
            name='roomsCount'
            render={({ field }) => (
              <InputUI
                small
                type='number'
                value={field.value || ''}
                onChange={field.onChange}
                label='Кол-во комнат'
              />
            )}
          />
          <Controller
            control={control}
            name='totalArea'
            render={({ field }) => (
              <InputUI
                small
                type='number'
                value={field.value || ''}
                onChange={field.onChange}
                label='Общая площадь'
              />
            )}
          />
          <Controller
            name='typeCalculation'
            control={control}
            render={({ field }) => (
              <SelectUI
                small
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                select={field.value || 'all'}
                label='Тип расчета'
              >
                <SelectItemUI value='Наличные'>Наличные</SelectItemUI>
                <SelectItemUI value='Ипотека'>Ипотека</SelectItemUI>
                <SelectItemUI value='Рассрочка'>Рассрочка</SelectItemUI>
              </SelectUI>
            )}
          />
        </>
      )}
      <Controller
        control={control}
        name='price'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Цена объекта'
          />
        )}
      />
      <Controller
        control={control}
        name='devManager'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Ваш менеджер'
          />
        )}
      />
    </S.FormGrid>
  );
};

export default NewBuildingFields;
