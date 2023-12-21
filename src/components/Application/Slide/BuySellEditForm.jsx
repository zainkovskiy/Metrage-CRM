import React, { useEffect, useRef } from 'react';
import BuyComponent from '../BuyComponent';
import SellComponent from '../SellComponent';
import {
  ButtonToggleGroup,
  ButtonToggleItem,
} from 'ui/ButtonToggle/ButtonToggle';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ButtonUI } from 'ui/ButtonUI';
import { AnimatePresence } from 'framer-motion';
import { changeType } from 'store/applicationSlice';
import { useAsyncValue } from 'react-router-dom';
import { SliderFormButtonGroup } from '../../../styles/SliderFormButtonGroup';

const BuySellEditFormStyle = styled.form`
  flex-direction: column;
  gap: 0.5rem;
  display: flex;
  flex-grow: 1;
  overflow: auto;
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
  const method = useForm({
    defaultValues: {
      type: demand?.type,
      typePlace: demand?.typePlace,
      address: demand?.address || '',
      addressList: application?.addressList || [],
      cords: demand?.cords || null,
      cordsList: application?.cordsList || [],
      costStart: demand?.costStart || '',
      costEnd: demand?.costEnd || '',
      buyType: application?.buyType || '',
      priceFrom: application?.featureValues?.priceFrom || '',
      priceTo: application?.featureValues?.priceTo || '',
      TotalAreaFrom: application?.featureValues?.TotalAreaFrom || '',
      TotalAreaTo: application?.featureValues?.TotalAreaTo || '',
      TotalAreaLandFrom: application?.featureValues?.TotalAreaLandFrom || '',
      TotalAreaLandTo: application?.featureValues?.TotalAreaLandTo || '',
      featureList: application?.featureList || [],
    },
  });
  const onSubmit = (data) => {
    dispatch(
      changeType({
        uid: application.UID,
        form: data,
      })
    ).then((res) => {
      method.reset(data);
    });
  };
  const clearAnyChange = () => {
    method.reset();
  };
  const ActiveComponent = getComponent(method.getValues('type'));
  method.watch('type');
  return (
    <FormProvider {...method}>
      <BuySellEditFormStyle onSubmit={method.handleSubmit(onSubmit)}>
        <div>
          <Controller
            control={method.control}
            name='type'
            rules={{ required: 'Выберет тип' }}
            render={({ field }) => (
              <ButtonToggleGroup>
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='sell'
                  active={field.value}
                >
                  Продать/Сдать
                </ButtonToggleItem>
                {/* <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='rent'
                active={field.value}
                >
                Сдать
              </ButtonToggleItem> */}
                <ButtonToggleItem
                  onClick={(e) => field.onChange(e.target.id)}
                  id='buy'
                  active={field.value}
                >
                  Купить
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
          {method.formState.errors?.type && (
            <TextSpanStyle color='red' size={12}>
              {method.formState.errors?.type?.message}
            </TextSpanStyle>
          )}
        </div>
        <AnimatePresence mode='wait'>
          <ActiveComponent firstMout={firstMout.current} />
        </AnimatePresence>
        <AnimatePresence>
          {method.formState.isDirty && (
            <SliderFormButtonGroup>
              <ButtonUI type='submit'>Сохранить</ButtonUI>
              <ButtonUI variant='outline' onClick={clearAnyChange}>
                Отменить
              </ButtonUI>
            </SliderFormButtonGroup>
          )}
        </AnimatePresence>
      </BuySellEditFormStyle>
    </FormProvider>
  );
};

export default BuySellEditForm;
