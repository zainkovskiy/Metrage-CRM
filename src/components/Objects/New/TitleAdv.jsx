import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { InputUI } from 'ui/InputUI';
import { ObjectSliderBox } from '../ObjectsStyle';

const TitleAdv = () => {
  const { control } = useFormContext();

  return (
    <ObjectSliderBox>
      <Controller
        name='AdvTitle'
        control={control}
        render={({ field }) => (
          <InputUI
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
            value={field.value}
            label='Заголовок для рекламы'
            fullWidth
          />
        )}
      />
    </ObjectSliderBox>
  );
};

export default TitleAdv;
