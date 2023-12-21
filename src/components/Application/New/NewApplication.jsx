import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useAsyncValue } from 'react-router-dom';
import { setNewApplication } from 'store/applicationSlice';

import { TitleFormStyle } from 'styles/styles';
import {
  ButtonToggleGroup,
  ButtonToggleItem,
} from 'ui/ButtonToggle/ButtonToggle';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import Loader from 'components/Main/Loader';
import BuyComponent from '../BuyComponent';
import SellComponent from '../SellComponent';

const LoaderContainer = styled.div`
  display: flex;
  height: 100%;
`;

const NewApplicationStyle = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
  overflow: auto;
`;
const NewApplicationBlockStyle = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
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
const NewApplication = ({ slideClose }) => {
  const detailData = useAsyncValue();
  const location = useLocation();
  const dispatch = useDispatch();
  const loadingNewApplication = useSelector(
    (state) => state.application.loadingNewApplication
  );
  const method = useForm({
    defaultValues: {
      type: 'sell',
      addressList: [],
      cordsList: [],
      featureList: [],
    },
  });
  const firstMout = useRef(true);

  useEffect(() => {
    if (firstMout.current) {
      firstMout.current = false;
      return;
    }
  }, []);
  const onSubmit = (data) => {
    dispatch(setNewApplication(data))
      .unwrap()
      .then(() => {
        slideClose();
      });
  };
  const getResolveValue = (key, data) => {
    if (!data) {
      return '';
    }
    return data[key][0];
  };
  const getLoacationValue = (name) => {
    const { state } = location;
    if (!state) {
      return '';
    }

    const { author } = state;
    if (!author) {
      return '';
    }
    return author[name];
  };
  const ActiveComponent = getComponent(method.getValues('type'));
  method.watch('type');
  return (
    <>
      {loadingNewApplication ? (
        <LoaderContainer>
          <Loader fill='#fff' />
        </LoaderContainer>
      ) : (
        <FormProvider {...method}>
          <NewApplicationStyle onSubmit={method.handleSubmit(onSubmit)}>
            <NewApplicationBlockStyle>
              <TitleFormStyle>ФИО</TitleFormStyle>
              <InputUI
                small
                label='Фамилия'
                register={method.register('lastName')}
                error={method.formState.errors?.lastName}
                defaultValue={getLoacationValue('lastName')}
              />
              <InputUI
                small
                label='Имя'
                register={method.register('firstName', {
                  required: 'Поле обязательное',
                })}
                error={method.formState.errors?.firstName}
              />
              <InputUI
                small
                label='Отчество'
                register={method.register('secondName')}
                error={method.formState.errors?.secondName}
                defaultValue={getLoacationValue('secondName')}
              />
            </NewApplicationBlockStyle>
            <NewApplicationBlockStyle>
              <TitleFormStyle>Контакты</TitleFormStyle>
              <InputUI
                small
                label='Телефон'
                type='phone'
                defaultValue={getResolveValue('phones', detailData)}
                register={method.register('phone', {
                  required: 'Поле обязательное',
                  pattern: {
                    value: /^89\d{9}/,
                    message: 'Не соответствует формату 8XXXXXXXXXX',
                  },
                })}
                error={method.formState.errors?.phone}
              />
              <InputUI
                small
                label='Почта'
                type='email'
                defaultValue={getResolveValue('mails', detailData)}
              />
            </NewApplicationBlockStyle>
            <NewApplicationBlockStyle>
              <TitleFormStyle>Купить-продать</TitleFormStyle>
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
                <ActiveComponent
                  // control={control}
                  // errors={errors}
                  firstMout={firstMout.current}
                  // type={getValues('type')}
                />
              </AnimatePresence>
            </NewApplicationBlockStyle>
            <NewApplicationBlockStyle>
              <ButtonUI type='submit' variant='outline'>
                Создать
              </ButtonUI>
            </NewApplicationBlockStyle>
          </NewApplicationStyle>
        </FormProvider>
      )}
    </>
  );
};

export default NewApplication;
