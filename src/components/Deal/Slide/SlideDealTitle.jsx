import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputText from 'ui/InputText/InputText';

const SlideDealTitle = () => {
  const { control } = useFormContext();
  return (
    <Controller
      name='dealTitle'
      control={control}
      render={({ field }) => (
        <InputText
          align='start'
          size={18}
          value={field.value}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
        />
      )}
    />
  );
};

export default SlideDealTitle;
