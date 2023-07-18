import React from 'react';
import { ObjectSliderBox } from '../ObjectsStyle';
import { TextSpanStyle } from 'styles/styles';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle';
import { Controller } from 'react-hook-form';

const TypeDeal = ({ control }) => {
  return (
    <ObjectSliderBox
      $column
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{duration: 0.3}}
    >
      <TextSpanStyle>Тип сделки</TextSpanStyle>
      <Controller
        control={control}
        name='typeDeal'
        rules={{ required: true }}
        render={({ field }) => (
          <ButtonToggleGroup fullWidth>
            <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='buy' active={field.value}>Продажа</ButtonToggleItem>
            <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='sell' active={field.value}>Аренда</ButtonToggleItem>
          </ButtonToggleGroup>
        )}
      />
    </ObjectSliderBox>
  );
};

export default TypeDeal;
