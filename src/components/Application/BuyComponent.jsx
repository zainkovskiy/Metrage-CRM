import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Controller } from 'react-hook-form';
import MapCircle from 'components/Main/MapCircle';
import { InputUI } from 'ui/InputUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';

const variants = {
  initial: {
    x: '100%',
  },
  open: {
    x: 0,
  },
  close: {
    x: '-100%',
  },
};
const BuyComponentStyle = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const BuyComponent = ({ firstMout, control, errors, type }) => {
  return (
    <BuyComponentStyle
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
      {type === 'buy' && (
        <Controller
          control={control}
          name='buyType'
          rules={{ required: 'Выберете тип' }}
          render={({ field }) => (
            <SelectUI
              small
              select={field.value || ''}
              onChange={field.onChange}
              inputRef={field.ref}
              label='Причина покупки'
              error={errors?.buyType}
            >
              <SelectItemUI value='forMyself'>Покупает себе</SelectItemUI>
              <SelectItemUI value='forBusiness'>Для заработка</SelectItemUI>
            </SelectUI>
          )}
        />
      )}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Controller
          name='costStart'
          rules={{ required: 'Поле обязательное' }}
          control={control}
          render={({ field }) => (
            <InputUI
              small
              {...field}
              label='Цена от'
              error={errors?.costStart}
              type='number'
              fullWidth
            />
          )}
        />
        <Controller
          name='costEnd'
          rules={{ required: 'Поле обязательное' }}
          control={control}
          render={({ field }) => (
            <InputUI
              small
              {...field}
              label='Цена до'
              error={errors?.costEnd}
              type='number'
              fullWidth
            />
          )}
        />
      </div>
      <Controller
        control={control}
        name='cords'
        // rules={{ required: 'Укажите область на карте' }}
        render={({ field }) => (
          <MapCircle
            circle={field.value}
            onChange={field.onChange}
            error={errors?.cords}
            ref={field.ref}
          />
        )}
      />
    </BuyComponentStyle>
  );
};
export default BuyComponent;
