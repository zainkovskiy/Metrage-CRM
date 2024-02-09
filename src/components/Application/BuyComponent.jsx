import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Controller, get, useFormContext, useFormState } from 'react-hook-form';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { SliderTitle } from '../../styles/slider';
import { ButtonLink } from 'ui/ButtonLink';
import { InputUI } from 'ui/InputUI';
import DialogWindow from 'components/Main/DialogWindow';
import DialogAddFeature from './Slide/DialogAddFeature';
import DialogAddPlace from './Slide/DialogAddPlace';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useNumberTriad } from 'hooks/StringHook';

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
const InputsField = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.5rem;
`;

const BuyComponent = ({ firstMout }) => {
  const { control, setValue, getValues, watch } = useFormContext();
  const { errors } = useFormState();
  const [addFeature, setAddFeature] = useState(false);
  const [openPlace, setOpenPlace] = useState(false);
  const toggleFeature = () => {
    setAddFeature(!addFeature);
  };
  const togglePlace = () => {
    setOpenPlace(!openPlace);
  };
  const removePlace = (source, idx) => {
    let array = getValues(source);
    array.splice(idx, 1);
    setValue(source, array, {
      shouldDirty: true,
    });
  };
  const getCorrectValue = (field) => {
    if (field.name === 'priceFrom' || field.name === 'priceTo') {
      return field.value ? useNumberTriad(field.value) : '';
    }
    return field.value || '';
  };
  const correctOnChangeField = (e, field) => {
    if (field.name === 'priceFrom' || field.name === 'priceTo') {
      return field.onChange(parseInt(e.target.value.split(' ').join('')));
    }
    return field.onChange(e.target.value);
  };
  const getTypeInput = (name) => {
    if (name === 'priceFrom' || name === 'priceTo') {
      return 'text';
    }
    return 'number';
  };
  watch('cordsList');
  watch('addressList');
  return (
    <>
      <SellComponentStyle
        variants={variants}
        initial={firstMout ? { x: 0 } : 'initial'}
        animate='open'
        exit='close'
        transition={'linear'}
      >
        <InputsField>
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
          {getValues('type') === 'buy' && (
            <Controller
              control={control}
              name='buyType'
              rules={{ required: 'Выберете причину' }}
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
        </InputsField>
        <SliderTitle ai='flex-end' size={14}>
          Характеристики
          <ButtonLink size={12} color='#84019e' onClick={toggleFeature}>
            Добавить/Удалить
          </ButtonLink>
        </SliderTitle>
        <InputsField>
          {getValues('featureList').map((input) => (
            <Controller
              key={input}
              control={control}
              name={input}
              render={({ field }) => (
                <InputUI
                  small
                  value={getCorrectValue(field)}
                  onChange={(e) => {
                    correctOnChangeField(e, field);
                  }}
                  inputRef={field.ref}
                  label={featureInputList[input].label}
                  type={getTypeInput(field.name)}
                />
              )}
            />
          ))}
        </InputsField>
        <SliderTitle ai='flex-end' size={14}>
          Местоположение
          <ButtonLink size={12} color='#84019e' onClick={togglePlace}>
            Добавить
          </ButtonLink>
        </SliderTitle>
        <div>
          {getValues('cordsList').map((cords, idx) => (
            <Box jc='space-between' key={idx}>
              <TextSpanStyle size={12}>Область на карте</TextSpanStyle>
              <ButtonLink
                size={10}
                color='#ef4242'
                onClick={() => removePlace('cordsList', idx)}
              >
                Удалить
              </ButtonLink>
            </Box>
          ))}
          {getValues('addressList').map((address, idx) => (
            <Box jc='space-between' key={idx}>
              <TextSpanStyle size={12}>
                {address?.value || 'Адрес'}
              </TextSpanStyle>
              <ButtonLink
                size={10}
                color='#ef4242'
                onClick={() => removePlace('addressList', idx)}
              >
                Удалить
              </ButtonLink>
            </Box>
          ))}
        </div>
      </SellComponentStyle>
      <DialogWindow open={addFeature} onClose={toggleFeature}>
        <DialogAddFeature onClose={toggleFeature} />
      </DialogWindow>
      <DialogWindow open={openPlace} onClose={togglePlace}>
        <DialogAddPlace onClose={togglePlace} />
      </DialogWindow>
    </>
  );
};

const featureInputList = {
  priceFrom: {
    name: 'priceFrom',
    label: 'Цена, от',
  },
  priceTo: {
    name: 'priceTo',
    label: 'Цена, до',
  },
  TotalAreaFrom: {
    name: 'TotalAreaFrom',
    label: 'Площадь общая, от',
  },
  TotalAreaTo: {
    name: 'TotalAreaTo',
    label: 'Площадь общая, до',
  },
  TotalAreaLandFrom: {
    name: 'TotalAreaLand',
    label: 'Площадь участка, от',
  },
  TotalAreaLandTo: {
    name: 'TotalAreaLand',
    label: 'Площадь участка, до',
  },
};

export default BuyComponent;
