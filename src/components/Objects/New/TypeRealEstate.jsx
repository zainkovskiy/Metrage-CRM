import React from 'react';
import { ObjectSliderBox } from '../ObjectsStyle';
import { TextSpanStyle } from 'styles/styles';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle';
import { Controller, useFormContext } from 'react-hook-form';

const TypeRealEstate = () => {
  const { control, setValue, getValues } = useFormContext();
  const toggleType = (onChange, id) => {
    if (getValues('typeEstate') === id) { return };
    onChange(id);
    setValue('Category', '');
  }
  return (
    <ObjectSliderBox
      $column
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
    >
      <TextSpanStyle>Тип недвижимости</TextSpanStyle>
      <Controller
        control={control}
        name='typeEstate'
        rules={{ required: true }}
        render={({ field }) => (
          <ButtonToggleGroup fullWidth>
            <ButtonToggleItem onClick={(e) => toggleType(field.onChange, e.target.id)} id='residential' active={field.value}>Жилая</ButtonToggleItem>
            <ButtonToggleItem onClick={(e) => toggleType(field.onChange, e.target.id)} id='commercial' active={field.value}>Коммерческая</ButtonToggleItem>
          </ButtonToggleGroup>
        )}
      />
    </ObjectSliderBox>
  );
};

export default TypeRealEstate;