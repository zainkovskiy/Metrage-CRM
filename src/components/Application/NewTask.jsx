import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useAsyncValue } from 'react-router-dom';
import { setNewApplication } from 'store/applicationSlice';

import { TitleFormStyle } from 'styles/styles';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle/ButtonToggle';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import Loader from "components/Main/Loader";
import BuyComponent from './BuyComponent';
import SellComponent from './SellComponent';

const LoaderContainer = styled.div`
  display: flex;
  height: 100%;
`

const NewTaskStyle = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
  overflow: auto;
`
const NewTaskBlockStyle = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
`
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
}
const NewTask = ({ slideClose }) => {
  const detailData = useAsyncValue();
  const location = useLocation();
  const dispatch = useDispatch();
  const loadingNewApplication = useSelector((state) => state.application.loadingNewApplication);
  const { register, handleSubmit, getValues, watch, control, formState: { errors } } = useForm({
    defaultValues: {
      costStart: '',
      costEnd: '',
      type: 'sell'
    }
  });
  const firstMout = useRef(true);

  useEffect(() => {
    if (firstMout.current) {
      firstMout.current = false;
      return
    }
  }, [])
  const onSubmit = (data) => {
    dispatch(setNewApplication(data)).unwrap().then(() => {
      slideClose();
    })
  }
  const getResolveValue = (key, data) => {
    if (!data) {
      return ''
    };
    return data[key][0];
  }
  const getLoacationValue = (name) => {
    const { state } = location;
    if (!state) { return '' }

    const { author } = state;
    if (!author) { return '' }
    return author[name]
  }
  const ActiveComponent = getComponent(getValues('type'));
  watch('type');
  return (
    <>
      {
        loadingNewApplication ?
          <LoaderContainer><Loader fill='#fff' /></LoaderContainer> :
          <NewTaskStyle onSubmit={handleSubmit(onSubmit)}>
            <NewTaskBlockStyle>
              <TitleFormStyle>ФИО</TitleFormStyle>
              <InputUI label='Фамилия'
                register={register('lastName')}
                error={errors?.lastName}
                defaultValue={getLoacationValue('lastName')}
              />
              <InputUI label='Имя'
                register={register('firstName', {
                  required: 'Поле обязательное'
                })}
                error={errors?.firstName}
              />
              <InputUI label='Отчество'
                register={register('secondName')}
                error={errors?.secondName}
                defaultValue={getLoacationValue('secondName')}
              />
            </NewTaskBlockStyle>
            <NewTaskBlockStyle>
              <TitleFormStyle>Контакты</TitleFormStyle>
              <InputUI
                label='Телефон'
                type='phone'
                defaultValue={getResolveValue('phones', detailData)}
                register={register('phone', {
                  required: 'Поле обязательное',
                  pattern: {
                    value: /^89\d{9}/,
                    message: 'Не соответствует формату 8XXXXXXXXXX'
                  }
                })}
                error={errors?.phone}
              />
              <InputUI
                label='Почта'
                type='email'
                defaultValue={getResolveValue('mails', detailData)}
              />
            </NewTaskBlockStyle>
            <NewTaskBlockStyle>
              <TitleFormStyle>Купить-продать</TitleFormStyle>
              <div>
                <Controller
                  control={control}
                  name='type'
                  rules={{ required: 'Выберет тип' }}
                  render={({ field }) => (
                    <ButtonToggleGroup>
                      <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='sell' active={field.value}>Продать</ButtonToggleItem>
                      <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='buy' active={field.value}>Купить</ButtonToggleItem>
                      <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='rent' active={field.value}>Сдать</ButtonToggleItem>
                      <ButtonToggleItem onClick={(e) => field.onChange(e.target.id)} id='take' active={field.value}>Снять</ButtonToggleItem>
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
            </NewTaskBlockStyle>
            <NewTaskBlockStyle>
              <ButtonUI type='submit' variant='outline'>Передать</ButtonUI>
            </NewTaskBlockStyle>
          </NewTaskStyle>
      }
    </>
  )
};

export default NewTask;