import React, { useState, useRef } from 'react';
import { useFormState, Controller, useFormContext } from 'react-hook-form';
import { InputUI } from 'ui/InputUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { getDeveloperByReq } from '../../../api/search';

const NewVillageDeveloper = () => {
  const { getValues, watch } = useFormContext();
  const { control } = useFormState();
  const [devList, setDevList] = useState([]);
  const devRequest = useRef(false);
  const reqDevList = (value) => {
    if (value.length < 2) {
      setDevList([]);
      return;
    }
    if (devRequest.current) {
      return;
    }
    devRequest.current = true;
    getDeveloperByReq(value)
      .then((data) => {
        setDevList(data);
      })
      .finally(() => {
        devRequest.current = false;
      });
  };
  watch('developer');
  return (
    <>
      <Controller
        name='developer'
        control={control}
        render={({ field }) => (
          <SelectAutoсompleteUI
            small
            label='Подрядчик'
            options={devList}
            getOptionsLabel={(options) => options.devName}
            onChange={(option) => field.onChange(option)}
            value={field.value}
            inputChange={reqDevList}
            helperText='* при отсутствии укажите “Нет в списке”'
          />
        )}
      />
      {getValues('developer') &&
        getValues('developer').devName === 'Нет в списке' && (
          <Controller
            control={control}
            name='developerName'
            render={({ field }) => (
              <InputUI
                small
                value={field.value || ''}
                onChange={field.onChange}
                label='Наименование подрядчика'
              />
            )}
          />
        )}
    </>
  );
};

export default NewVillageDeveloper;
