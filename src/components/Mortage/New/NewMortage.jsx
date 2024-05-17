import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { SliderTitle } from '../../../styles/slider';
import { CheckboxUI } from 'ui/CheckboxUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { createNewMortage } from 'api/mortageAPI';
import { useDispatch } from 'react-redux';
import { checkOneMortage } from '../../../store/slices/mortageSlice';

const NewClientStyle = styled.form`
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  overflow: auto;
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;
const TextAreaStyle = styled.textarea`
  border-radius: 5px;
  padding: 0.3rem;
  resize: none;
  font-family: ${({ theme }) => theme.font.family};
  border: 1px solid ${({ theme }) => theme.color.primary};
  width: 100%;
  box-sizing: border-box;
  outline: 1px solid transparent;
  transition: outline 0.3s;
  &:focus {
    outline: 1px solid ${({ theme }) => theme.color.primary};
  }
`;
const NewMortage = ({ onClose }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      typeRealty: 'Вторичка',
      typeObject: 'Квартира',
    },
  });

  const onSubmit = (data) => {
    return createNewMortage(data)
      .then((newUID) => {
        if (newUID) {
          dispatch(checkOneMortage(newUID));
        }
      })
      .finally(() => {
        onClose();
      });
  };
  watch('typeRealty');
  console.log(isSubmitting);
  return (
    <NewClientStyle onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <SliderTitle>Клиент</SliderTitle>
        <Controller
          control={control}
          name='lastName'
          render={({ field }) => (
            <InputUI
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Фамилия'
            />
          )}
        />
        <Controller
          control={control}
          name='firstName'
          rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <InputUI
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Имя'
              error={errors?.firstName}
            />
          )}
        />
        <Controller
          control={control}
          name='secondName'
          render={({ field }) => (
            <InputUI
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Отчество'
            />
          )}
        />
        <Controller
          control={control}
          name='phone'
          render={({ field }) => (
            <InputUI
              type='number'
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Номер телефона'
            />
          )}
        />
        <Controller
          control={control}
          name='PV'
          render={({ field }) => (
            <InputUI
              type='number'
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Первоночальный взнос (в руб.)'
            />
          )}
        />
        <Controller
          control={control}
          name='typeRealty'
          render={({ field }) => (
            <SelectUI
              small
              onChange={(newValue) => {
                field.onChange(newValue);
                setValue('typeObject', objectsVariant[newValue][0]);
              }}
              select={field.value}
              label='Тип недвижимости'
            >
              <SelectItemUI value='Вторичка'>Вторичка</SelectItemUI>
              <SelectItemUI value='Новостройка'>Новостройка</SelectItemUI>
              <SelectItemUI value='ИЖС'>ИЖС</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          control={control}
          name='typeObject'
          render={({ field }) => (
            <SelectUI
              small
              onChange={(newValue) => field.onChange(newValue)}
              select={field.value}
              label='Тип объекта'
            >
              {getValues('typeRealty') &&
                objectsVariant[getValues('typeRealty')].map((item) => (
                  <SelectItemUI key={item} value={item}>
                    {item}
                  </SelectItemUI>
                ))}
            </SelectUI>
          )}
        />
        <Controller
          control={control}
          name='description'
          render={({ field }) => (
            <Box column ai='flex-start' gap='0.2rem'>
              <TextSpanStyle>Описание</TextSpanStyle>
              <TextAreaStyle
                value={field.value || ''}
                onChange={field.onChange}
                rows={8}
              />
            </Box>
          )}
        />
        <Controller
          name='isConsultation'
          control={control}
          render={({ field }) => (
            <CheckboxUI
              label='Для консультации со специалистом'
              id='isConsultation'
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </FormContainer>
      <ButtonUI type='submit' disabled={isSubmitting}>
        Сохранить
      </ButtonUI>
    </NewClientStyle>
  );
};
const objectsVariant = {
  Вторичка: [
    'Квартира',
    'Аппартаменты',
    'Дом',
    'Ком.недвижимость',
    'Паркинг',
    'Зем.участок',
  ],
  Новостройка: [
    'Квартира',
    'Аппартаменты',
    'Дом',
    'Ком.недвижимость',
    'Паркинг',
  ],
  ИЖС: ['Дом', 'Участок'],
};

export default NewMortage;
