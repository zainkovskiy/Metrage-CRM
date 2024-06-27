import React, { useState, useRef } from 'react';
import { useFormState, Controller, useFormContext } from 'react-hook-form';
import { InputUI } from 'ui/InputUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { getJKByReq } from '../../../api/search';

const NewVillageSuburban = () => {
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
  return (
    <>
      <Controller
        name='jk'
        control={control}
        render={({ field }) => (
          <SelectAutoсompleteUI
            small
            label='КП'
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
      {getValues('jk') && getValues('jk').name === 'Нет в списке' ? (
        <Controller
          control={control}
          name='corpus'
          render={({ field }) => (
            <InputUI
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Название КП и адрес'
            />
          )}
        />
      ) : (
        <div></div>
      )}
      <Controller
        control={control}
        name='apparmentNumber'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Номер участка*'
            helperText='* если известен'
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
    </>
  );
};

export default NewVillageSuburban;
