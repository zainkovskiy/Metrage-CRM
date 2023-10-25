import React, { useEffect, useRef } from 'react';
import BuyComponent from '../BuyComponent';
import SellComponent from '../SellComponent';
import {
  ButtonToggleGroup,
  ButtonToggleItem,
} from 'ui/ButtonToggle/ButtonToggle';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ButtonUI } from 'ui/ButtonUI';
import { AnimatePresence } from 'framer-motion';
import { changeType } from 'store/applicationSlice';
import { useAsyncValue } from 'react-router-dom';
import { SliderTitle } from 'styles/slider';
import { SliderFormButtonGroup } from '../../../styles/SliderFormButtonGroup';

const BuySellEditFormStyle = styled.form`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  flex-direction: column;
  gap: 0.5rem;
  display: flex;
  flex-grow: 1;
`;
const getComponent = (key) => {
  switch (key) {
    case 'sell':
      return SellComponent;
    case 'buy':
      return BuyComponent;
    case 'rent':
      return SellComponent;
    case 'take':
      return BuyComponent;
    default:
      return SellComponent;
  }
};
const BuySellEditForm = () => {
  const application = useAsyncValue();
  const dispatch = useDispatch();
  const demand = application?.demand;
  const firstMout = useRef(true);
  useEffect(() => {
    if (firstMout.current) {
      firstMout.current = false;
    }
  }, []);
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      type: demand?.type,
      typePlace: demand?.typePlace,
      address: demand?.address,
      cords: demand?.cords,
      costStart: demand?.costStart || '',
      costEnd: demand?.costEnd || '',
      buyType: application?.buyType || '',
    },
  });

  const onSubmit = (data) => {
    dispatch(
      changeType({
        uid: application.UID,
        form: data,
      })
    ).then((res) => {
      reset(data);
    });
  };
  const clearAnyChange = () => {
    reset();
  };
  const ActiveComponent = getComponent(getValues('type'));
  watch('type');
  return (
    <BuySellEditFormStyle onSubmit={handleSubmit(onSubmit)}>
      <SliderTitle>Потребность</SliderTitle>
      <div>
        <Controller
          control={control}
          name='type'
          rules={{ required: 'Выберет тип' }}
          render={({ field }) => (
            <ButtonToggleGroup>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='sell'
                active={field.value}
              >
                Продать
              </ButtonToggleItem>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='buy'
                active={field.value}
              >
                Купить
              </ButtonToggleItem>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='rent'
                active={field.value}
              >
                Сдать
              </ButtonToggleItem>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='take'
                active={field.value}
              >
                Снять
              </ButtonToggleItem>
            </ButtonToggleGroup>
          )}
        />
        {errors?.type && (
          <TextSpanStyle color='red' size={12}>
            {errors?.type?.message}
          </TextSpanStyle>
        )}
      </div>
      <AnimatePresence mode='wait'>
        <ActiveComponent
          control={control}
          errors={errors}
          firstMout={firstMout.current}
          type={getValues('type')}
        />
      </AnimatePresence>
      <AnimatePresence>
        {isDirty && (
          <SliderFormButtonGroup>
            <ButtonUI type='submit'>Сохранить</ButtonUI>
            <ButtonUI variant='outline' onClick={clearAnyChange}>
              Отменить
            </ButtonUI>
          </SliderFormButtonGroup>
        )}
      </AnimatePresence>
    </BuySellEditFormStyle>
  );
};

export default BuySellEditForm;
