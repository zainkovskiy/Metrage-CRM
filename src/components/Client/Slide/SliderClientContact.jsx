import React from 'react';
import styled from 'styled-components';
import { useAsyncValue } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ButtonUI } from 'ui/ButtonUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { TextSpanStyle } from 'styles/styles';
import InputText from '../../../ui/InputText/InputText';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { saveChangeContact } from '../../../store/clientsSlice';
import { useDispatch } from 'react-redux';
import { SliderFormButtonGroup } from '../../../styles/SliderFormButtonGroup';

const ContactLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;
const SliderClientContactStyle = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  width: 100%;
  column-gap: 0.5rem;
`;
const SliderClientContact = () => {
  const client = useAsyncValue();
  const dispatch = useDispatch();
  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(
      saveChangeContact({
        UID: client.UID,
        ...data,
      })
    );
    reset(data);
  };
  return (
    <SliderBlock onSubmit={handleSubmit(onSubmit)}>
      <SliderClientContactStyle>
        <SliderTitle>
          Контакт{' '}
          <Controller
            control={control}
            name='isRealtor'
            render={({ field }) => (
              <CheckboxUI
                label='Риэлтор'
                size='small'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                defaultChecked={field.value || client?.isRealtor || false}
                id='HasDrainage'
              />
            )}
          />
        </SliderTitle>
        <InputsContainer>
          <div>
            <ContactLine>
              <TextSpanStyle>Фамилия:</TextSpanStyle>
              <Controller
                name='lastName'
                defaultValue={client?.lastName || ''}
                control={control}
                render={({ field }) => {
                  return (
                    <InputText
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  );
                }}
              />
            </ContactLine>
            <ContactLine>
              <TextSpanStyle>Имя:</TextSpanStyle>
              <Controller
                name='firstName'
                defaultValue={client?.firstName || ''}
                control={control}
                render={({ field }) => {
                  return (
                    <InputText
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  );
                }}
              />
            </ContactLine>
            <ContactLine>
              <TextSpanStyle>Отчество:</TextSpanStyle>
              <Controller
                name='secondName'
                defaultValue={client?.secondName || ''}
                control={control}
                render={({ field }) => {
                  return (
                    <InputText
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  );
                }}
              />
            </ContactLine>
            <ContactLine>
              <TextSpanStyle nowrap>Дата рождения:</TextSpanStyle>
              <Controller
                name='birhdayDate'
                defaultValue={client?.birhdayDate || ''}
                control={control}
                render={({ field }) => {
                  return (
                    <InputText
                      type='date'
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  );
                }}
              />
            </ContactLine>
          </div>
          <div>
            <ContactLine>
              <TextSpanStyle>Телефон:</TextSpanStyle>
              <Controller
                name='phone[0]'
                defaultValue={client?.phone[0]?.value || ''}
                control={control}
                render={({ field }) => {
                  return (
                    <InputText
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  );
                }}
              />
            </ContactLine>
            <ContactLine>
              <TextSpanStyle nowrap>Телефон 2:</TextSpanStyle>
              <Controller
                name='phone[1]'
                defaultValue={client?.phone[1]?.value || ''}
                control={control}
                render={({ field }) => {
                  return (
                    <InputText
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  );
                }}
              />
            </ContactLine>
            <ContactLine>
              <TextSpanStyle>Почта:</TextSpanStyle>
              <Controller
                name='email'
                defaultValue={client?.email[0]?.value || ''}
                control={control}
                render={({ field }) => {
                  return (
                    <InputText
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  );
                }}
              />
            </ContactLine>
          </div>
        </InputsContainer>
        {isDirty && (
          <SliderFormButtonGroup>
            <TextSpanStyle>Сохранить изменения?</TextSpanStyle>
            <ButtonUI type='submit' size='small'>
              Сохранить
            </ButtonUI>
          </SliderFormButtonGroup>
        )}
      </SliderClientContactStyle>
    </SliderBlock>
  );
};

export default SliderClientContact;
