import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { InputUI } from 'ui/InputUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { useAsyncValue } from 'react-router-dom';
import { LabelStyle } from '../../../ui/InputUI/InputUIStyled';
import { v4 as uuidv4 } from 'uuid';

const WindowLoaner = styled.form`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
  box-sizing: border-box;
  max-height: 80vh;
  width: 60vw;
`;
const WindowLoanerContent = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Line = styled.div`
  min-height: 10px;
  width: 100%;
  background-color: rgb(229 229 229);
  border-radius: 5px;
`;
const FieldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.5rem;
`;
const FormTextArea = styled.textarea`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.primary};
  resize: none;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 5px;
  &:focus {
    outline: 1px solid ${({ theme }) => theme.color.primary};
  }
`;
const SlideMortageWindowLoaner = ({ onClose, loaner, setLoaner }) => {
  const mortage = useAsyncValue();
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: loaner !== 'new' ? loaner : {},
  });
  const onSubmit = (data) => {
    if (loaner === 'new') {
      mortage.loaners.push({ ...data, UID: uuidv4().split('-')[0] });
      setLoaner();
      return;
    }
    if (isDirty) {
      const findLoaners = mortage.loaners.find(
        (curLoaner) => curLoaner.UID === loaner.UID
      );
      mortage.loaners.splice(mortage.loaners.indexOf(findLoaners), 1, data);
      setLoaner();
      return;
    }
    onClose();
  };
  const handleKeyDown = (e) => {
    if (e.target.tagName === 'TEXTAREA') {
      return;
    }
    if (e.code === 'Enter') {
      e.preventDefault();
    }
  };
  return (
    <WindowLoaner
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
    >
      <SliderTitle>Добавить заемщика/созаемщика</SliderTitle>
      <WindowLoanerContent>
        <FieldsContainer>
          <Controller
            name='loanerType'
            control={control}
            render={({ field }) => (
              <SelectUI
                small
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                select={field.value || 'all'}
                label='Тип заемщика'
              >
                <SelectItemUI value='Заемщик'>Заемщик</SelectItemUI>
                <SelectItemUI value='Созаемщик'>Созаемщик</SelectItemUI>
              </SelectUI>
            )}
          />
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={field.onChange}
                value={field.value || ''}
                label='Фамилия'
                small
              />
            )}
          />
        </FieldsContainer>
        <FieldsContainer>
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={field.onChange}
                value={field.value || ''}
                label='Имя'
                small
              />
            )}
          />
          <Controller
            name='secondName'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={field.onChange}
                value={field.value || ''}
                label='Отчество'
                small
              />
            )}
          />
        </FieldsContainer>
        <FieldsContainer>
          <Controller
            name='bornDate'
            control={control}
            render={({ field }) => (
              <InputUI
                type='date'
                onChange={field.onChange}
                value={field.value || ''}
                label='Дата рождения'
                small
              />
            )}
          />
          <Controller
            name='maritalStatus'
            control={control}
            render={({ field }) => (
              <SelectUI
                small
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                select={field.value || 'all'}
                label='Семейное положение'
              >
                <SelectItemUI value='Холост/не замужем'>
                  Холост/не замужем
                </SelectItemUI>
                <SelectItemUI value='Женат/замужем'>Женат/замужем</SelectItemUI>
                <SelectItemUI value='Отдельное проживание'>
                  Отдельное проживание
                </SelectItemUI>
                <SelectItemUI value='Раведен/а'>Раведен/а</SelectItemUI>
                <SelectItemUI value='Вдовец/вдова'>Вдовец/вдова</SelectItemUI>
              </SelectUI>
            )}
          />
        </FieldsContainer>
        <FieldsContainer>
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={field.onChange}
                value={field.value || ''}
                label='Телефон для связи'
                small
              />
            )}
          />
          <Controller
            control={control}
            name='address'
            render={({ field }) => (
              <LabelStyle>
                Адрес факт. Проживания
                <FormTextArea
                  value={field.value || ''}
                  onChange={field.onChange}
                  ref={field.ref}
                  rows={2}
                />
              </LabelStyle>
            )}
          />
        </FieldsContainer>
        <Line />
        <FieldsContainer>
          <Controller
            control={control}
            name='work.nameAndAddress'
            render={({ field }) => (
              <LabelStyle>
                Основное место работы
                <FormTextArea
                  value={field.value || ''}
                  onChange={field.onChange}
                  ref={field.ref}
                  rows={2}
                />
              </LabelStyle>
            )}
          />
          <Controller
            name='work.termOfOperations'
            control={control}
            render={({ field }) => (
              <SelectUI
                small
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                select={field.value || 'all'}
                label='Срок существования'
              >
                <SelectItemUI value='Менее года'>Менее года</SelectItemUI>
                <SelectItemUI value='От года до 3-х лет'>
                  От года до 3-х лет
                </SelectItemUI>
                <SelectItemUI value='От 3 до 5 лет'>От 3 до 5 лет</SelectItemUI>
                <SelectItemUI value='От 5 до 10 лет'>
                  От 5 до 10 лет
                </SelectItemUI>
                <SelectItemUI value='Более 10 лет'>Более 10 лет</SelectItemUI>
              </SelectUI>
            )}
          />
        </FieldsContainer>
        <FieldsContainer>
          <Controller
            name='work.chiefPhone'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={field.onChange}
                value={field.value || ''}
                label='Телефон руководителя'
                small
              />
            )}
          />
          <Controller
            name='work.INN'
            control={control}
            render={({ field }) => (
              <InputUI
                type='number'
                onChange={field.onChange}
                value={field.value || ''}
                label='ИНН'
                small
              />
            )}
          />
        </FieldsContainer>
        <FieldsContainer>
          <Controller
            name='work.areaOfActivity'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={field.onChange}
                value={field.value || ''}
                label='Сфера деятельности'
                small
              />
            )}
          />
          <Controller
            name='work.size'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={field.onChange}
                value={field.value || ''}
                label='Численность персонала'
                small
              />
            )}
          />
        </FieldsContainer>
        <FieldsContainer>
          <Controller
            name='work.chiefName'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={field.onChange}
                value={field.value || ''}
                label='Имя руководителя'
                small
              />
            )}
          />
        </FieldsContainer>
        <Line />
        <FieldsContainer>
          <Controller
            name='aboutJobStatus.income'
            control={control}
            render={({ field }) => (
              <InputUI
                onChange={field.onChange}
                value={field.value || ''}
                label='Среднемесячный доход'
                small
              />
            )}
          />
          <Controller
            name='aboutJobStatus.experienceLast'
            control={control}
            render={({ field }) => (
              <InputUI
                type='number'
                onChange={field.onChange}
                value={field.value || ''}
                label='Стаж на последнем месте работы (Мес)'
                small
              />
            )}
          />
        </FieldsContainer>
        <FieldsContainer>
          <Controller
            control={control}
            name='aboutJobStatus.hasCreditInfo'
            render={({ field }) => (
              <LabelStyle>
                Имющиеся кредиты
                <FormTextArea
                  value={field.value || ''}
                  onChange={field.onChange}
                  ref={field.ref}
                  rows={2}
                />
              </LabelStyle>
            )}
          />
          <Controller
            name='aboutJobStatus.salaryProject'
            control={control}
            render={({ field }) => (
              <SelectUI
                small
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                select={field.value || 'all'}
                label='Зарплатный проект'
              >
                {mortage.bankSchema.map((bank) => (
                  <SelectItemUI key={bank.UID} value={bank.bankName}>
                    {bank.bankName}
                  </SelectItemUI>
                ))}
              </SelectUI>
            )}
          />
        </FieldsContainer>
        <FieldsContainer>
          <Controller
            name='aboutJobStatus.experienceFull'
            control={control}
            render={({ field }) => (
              <InputUI
                type='number'
                onChange={field.onChange}
                value={field.value || ''}
                label='Общий трудовой стаж (Лет)'
                small
              />
            )}
          />

          <Controller
            control={control}
            name='aboutJobStatus.fsspAbout'
            render={({ field }) => (
              <LabelStyle>
                ФССП
                <FormTextArea
                  value={field.value || ''}
                  onChange={field.onChange}
                  ref={field.ref}
                  rows={2}
                />
              </LabelStyle>
            )}
          />
        </FieldsContainer>
      </WindowLoanerContent>
      <Box jc='flex-start'>
        <ButtonUI variant='outline' size='small' onClick={onClose}>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' type='submit'>
          Сохранить
        </ButtonUI>
      </Box>
    </WindowLoaner>
  );
};

export default SlideMortageWindowLoaner;
