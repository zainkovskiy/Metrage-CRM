import React, { useRef, useEffect, useState, Suspense } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useLoaderData, defer, Await, useAsyncValue } from 'react-router-dom';
import { setNewTask } from 'store/taskSlice';
import { getDetailForNewApp } from 'api/application';

import { TitleFormStyle } from 'styles/styles';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle/ButtonToggle';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import Loader from "components/Main/Loader";
import SlideWindow from "components/Main/SlideWindow";
import BuyComponent from './BuyComponent';
import SellComponent from './SellComponent';


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
const LoaderContainer = styled.div`
  display: flex;
  height: 100%;
`
const getComponent = (key) => {
  switch (key) {
    case 'buy':
      return BuyComponent;
    default:
      return SellComponent;
  }
}
const NewTask = () => {
  const [open, setOpen] = useState(true);

  const { detailData } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const loadingNewTask = useSelector((state) => state.task.loadingNewTask);
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
    dispatch(setNewTask(data));
  }
  const handleClose = () => {
    setTimeout(() => {
      navigate('/');
    }, 300)
    setOpen(false);
  }
  const getResolveValue = (key, data) => {
    if (!data) {
      return ''
    };
    return data[key][0];
  }
  const getLoacationValue = (name) => {
    const { state } = location;
    if (!state) { return }

    const { author } = state;
    if (!author) { return }
    return author[name]
  }
  const ActiveComponent = getComponent(getValues('type'));
  watch('type');
  return (
    <SlideWindow open={open} onClose={handleClose} width='30%'>
      {
        loadingNewTask ?
          <LoaderContainer><Loader fill='#fff' /></LoaderContainer> :
          <Suspense fallback={<LoaderContainer><Loader fill='#fff' /></LoaderContainer>}>
            <Await resolve={detailData}>
              {
                (resolveData) => (
                  <>
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
                          defaultValue={getLoacationValue('firstName')}
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
                          defaultValue={getResolveValue('phones', resolveData)}
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
                          defaultValue={getResolveValue('mails', resolveData)}
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
                  </>
                )
              }
            </Await>
          </Suspense>
      }
    </SlideWindow>
  );
};

export const newTaskLoader = async ({ request, params }) => {
  const { chatId } = params;
  if (!chatId) {
    return { detailData: null }
  }
  return defer({ detailData: getDetailForNewApp(chatId), })
}

export default NewTask;