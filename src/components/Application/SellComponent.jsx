import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import Dadata from 'components/Main/Dadata';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
const variants = {
  initial: {
    x: '-100%',
  },
  open: {
    x: 0,
  },
  close: {
    x: '100%',
  },
};
const SellComponentStyle = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const SellComponent = ({ firstMout }) => {
  const { control } = useFormContext();
  const { errors } = useFormState();
  return (
    <SellComponentStyle
      variants={variants}
      initial={firstMout ? { x: 0 } : 'initial'}
      animate='open'
      exit='close'
      transition={'linear'}
    >
      <Controller
        control={control}
        name='typePlace'
        rules={{ required: 'Выберете тип' }}
        render={({ field }) => (
          <SelectUI
            small
            select={field.value || ''}
            onChange={field.onChange}
            inputRef={field.ref}
            label='Тип объекта'
            error={errors?.typePlace}
          >
            <SelectItemUI value='Квартира'>Квартира</SelectItemUI>
            <SelectItemUI value='Комната'>Комната</SelectItemUI>
            <SelectItemUI value='Коммерческая недвижимость'>
              Коммерческая недвижимость
            </SelectItemUI>
            <SelectItemUI value='Дом'>Дом</SelectItemUI>
            <SelectItemUI value='Земельный участок'>
              Земельный участок
            </SelectItemUI>
            <SelectItemUI value='Гараж'>Гараж</SelectItemUI>
          </SelectUI>
        )}
      />
      <Controller
        control={control}
        name='address'
        rules={{ required: 'Укажите адрес' }}
        render={({ field }) => (
          <Dadata
            small
            value={field.value}
            onChange={field.onChange}
            inputRef={field.ref}
            label='Адрес'
            error={errors?.address}
          />
        )}
      />
    </SellComponentStyle>
  );
};
export default SellComponent;
