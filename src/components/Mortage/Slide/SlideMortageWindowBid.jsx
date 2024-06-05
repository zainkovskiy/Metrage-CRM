import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { InputUI } from 'ui/InputUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { useAsyncValue } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const WindowBid = styled.form`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
  box-sizing: border-box;
  max-height: 80vh;
  overflow: auto;
`;

const SlideMortageWindowBid = ({ onClose, bid, setBid }) => {
  const mortage = useAsyncValue();
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: bid !== 'new' ? bid : {},
  });
  const onSubmit = (data) => {
    if (bid === 'new') {
      mortage.credit.bids.push({ ...data, UID: uuidv4().split('-')[0] });
      setBid();
      return;
    }
    if (isDirty) {
      const findBid = mortage.credit.bids.find(
        (curBid) => curBid.UID === bid.UID
      );
      mortage.credit.bids.splice(mortage.credit.bids.indexOf(findBid), 1, data);
      setBid();
      return;
    }
    onClose();
  };
  return (
    <WindowBid
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SliderTitle>Добавить заявку</SliderTitle>
      <Controller
        name='bank'
        control={control}
        render={({ field }) => (
          <SelectUI
            small
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            select={field.value || 'all'}
            label='Банк'
          >
            {mortage.bankSchema.map((bank) => (
              <SelectItemUI key={bank.UID} value={bank.bankName}>
                {bank.bankName}
              </SelectItemUI>
            ))}
          </SelectUI>
        )}
      />
      <Controller
        name='stage'
        control={control}
        render={({ field }) => (
          <SelectUI
            small
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            select={field.value || 'all'}
            label='Статус'
          >
            <SelectItemUI value='Новая'>Новая</SelectItemUI>
            <SelectItemUI value='Отправлена'>Отправлена</SelectItemUI>
            <SelectItemUI value='Клиент одобрен'>Клиент одобрен</SelectItemUI>
            <SelectItemUI value='Согласование объекта'>
              Согласование объекта
            </SelectItemUI>
            <SelectItemUI value='Объект одобрен'>Объект одобрен</SelectItemUI>
            <SelectItemUI value='КД - подписан'>КД - подписан</SelectItemUI>
            <SelectItemUI value='Кредит выдан'>Кредит выдан</SelectItemUI>
            <SelectItemUI value='Срыв'>Срыв</SelectItemUI>
            <SelectItemUI value='Отказ банка'>Отказ банка</SelectItemUI>
          </SelectUI>
        )}
      />
      <Controller
        name='summ'
        control={control}
        render={({ field }) => (
          <InputUI
            type='number'
            onChange={field.onChange}
            value={field.value || ''}
            label='Сумма кредита'
            small
          />
        )}
      />
      <Controller
        name='PV'
        control={control}
        render={({ field }) => (
          <InputUI
            type='number'
            onChange={field.onChange}
            value={field.value || ''}
            label='ПВ'
            small
          />
        )}
      />
      <Controller
        name='precent'
        control={control}
        render={({ field }) => (
          <InputUI
            type='number'
            onChange={field.onChange}
            value={field.value || ''}
            label='Процентная ставка'
            small
          />
        )}
      />
      <Controller
        name='loanTerm'
        control={control}
        render={({ field }) => (
          <InputUI
            type='date'
            onChange={field.onChange}
            value={field.value || ''}
            label='Срок (Мес)'
            small
          />
        )}
      />
      <Box jc='flex-start'>
        <ButtonUI variant='outline' size='small' onClick={onClose}>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' type='submit'>
          Сохранить
        </ButtonUI>
      </Box>
    </WindowBid>
  );
};

export default SlideMortageWindowBid;
