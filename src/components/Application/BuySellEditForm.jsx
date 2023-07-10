import React, { useEffect, useRef } from 'react';
import BuyComponent from './BuyComponent';
import SellComponent from './SellComponent';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle/ButtonToggle';
import { useForm, Controller, set } from 'react-hook-form';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonUI } from 'ui/ButtonUI';
import { AnimatePresence, motion } from 'framer-motion';
import { changeType, getTask } from 'store/applicationSlice';
import { TaskSlideTitleStyle } from './TaskStyle';
import { useAsyncValue } from 'react-router-dom';

const BuySellEditFormStyle = styled.form`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  flex-direction: column;
  gap: 0.5rem;
  display: flex;
  flex-grow: 1;
`
const EditButtonGroupStyle = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  position: fixed;
  top: 0;
  padding: 0.5rem;
  background-color: #fff;
  left: 0;
  right: 0;
  justify-content: center;
  box-shadow: 0px 2px 10px 1px rgba(128,128,128,1);
  overflow: hidden;
`
const getComponent = (key) => {
  switch (key) {
    case 'buy':
      return BuyComponent;
    default:
      return SellComponent;
  }
}
const BuySellEditForm = () => {
  const application = useAsyncValue();
  const dispatch = useDispatch();
  const demand = application?.demand;
  const firstMout = useRef(true);
  useEffect(() => {
    if (firstMout.current) {
      firstMout.current = false;
    }
  }, [])
  const { control, handleSubmit, watch, getValues, reset, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      type: demand?.type,
      typePlace: demand?.typePlace,
      address: demand?.address,
      cords: demand?.cords,
      costStart: demand?.costStart || '',
      costEnd: demand?.costEnd || '',
    }
  });

  const onSubmit = (data) => {
    dispatch(changeType({
      uid: application.UID,
      form: data
    })).then((res) => {
      reset(data);
    });
  }
  const clearAnyChange = () => {
    reset()
  }
  const ActiveComponent = getComponent(getValues('type'));
  watch('type');
  return (
    <BuySellEditFormStyle onSubmit={handleSubmit(onSubmit)}>
      <TaskSlideTitleStyle>Потребность</TaskSlideTitleStyle>
      <div>
        <Controller
          control={control}
          name='type'
          rules={{ required: 'Выберет тип' }}
          render={({ field }) => (
            <ButtonToggleGroup>
              <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='sell' active={field.value}>Продать</ButtonToggleItem>
              <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='buy' active={field.value}>Купить</ButtonToggleItem>
            </ButtonToggleGroup>
          )}
        />
        {
          errors?.type && <TextSpanStyle color='red' size={12}>{errors?.type?.message}</TextSpanStyle>
        }
      </div>
      <AnimatePresence mode='wait'>
        <ActiveComponent
          control={control}
          errors={errors}
          firstMout={firstMout.current}
        />
      </AnimatePresence>
      <AnimatePresence>
        {
          isDirty &&
          <EditButtonGroupStyle
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{
              duration: 0.3,
            }}
          >
            <ButtonUI type='submit'>Сохранить</ButtonUI>
            <ButtonUI variant='outline' onClick={clearAnyChange}>Отменить</ButtonUI>
          </EditButtonGroupStyle>
        }
      </AnimatePresence>
    </BuySellEditFormStyle>

  );
};

export default BuySellEditForm;