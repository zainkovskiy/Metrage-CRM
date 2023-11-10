import React from 'react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { ObjectSliderBox, FormWrapper } from '../ObjectsStyle';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { InputUI } from 'ui/InputUI';

const FormRent = () => {
  const { control, getValues, watch } = useFormContext();
  const { errors } = useFormState();
  watch('otherUtilities');
  return (
    <ObjectSliderBox
      $column
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormWrapper>
        <Controller
          name='PrepayMonths'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={field.onChange}
              select={field.value}
              label='Предоплата, месяцев'
            >
              <SelectItemUI value={0}>0</SelectItemUI>
              <SelectItemUI value={1}>1</SelectItemUI>
              <SelectItemUI value={2}>2</SelectItemUI>
              <SelectItemUI value={3}>3</SelectItemUI>
              <SelectItemUI value={4}>4</SelectItemUI>
              <SelectItemUI value={5}>5</SelectItemUI>
              <SelectItemUI value={6}>6</SelectItemUI>
              <SelectItemUI value={7}>7</SelectItemUI>
              <SelectItemUI value={8}>8</SelectItemUI>
              <SelectItemUI value={9}>9</SelectItemUI>
              <SelectItemUI value={10}>10</SelectItemUI>
              <SelectItemUI value={11}>11</SelectItemUI>
              <SelectItemUI value={12}>12</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          name='Deposit'
          control={control}
          render={({ field }) => (
            <InputUI
              onChange={(e) => field.onChange(parseInt(e.target.value))}
              value={field.value || ''}
              label='Залог, руб'
              fullWidth
              type='number'
            />
          )}
        />
        <Controller
          name='utilityMeters'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={field.onChange}
              select={field.value}
              label='Оплата по счетчикам'
            >
              <SelectItemUI value='0'>Арендатором</SelectItemUI>
              <SelectItemUI value='1'>Собственником</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          name='otherUtilities'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={field.onChange}
              select={field.value}
              label='Другие ЖКУ'
            >
              <SelectItemUI value='0'>Арендатором</SelectItemUI>
              <SelectItemUI value='1'>Собственником</SelectItemUI>
            </SelectUI>
          )}
        />
        <Controller
          name='otherUtilitiesPayment'
          control={control}
          render={({ field }) => (
            <InputUI
              onChange={(e) => field.onChange(parseInt(e.target.value))}
              value={field.value}
              label='Cумма за другие ЖКУ'
              fullWidth
              type='number'
              disabled={getValues('otherUtilities') !== '0'}
            />
          )}
        />
      </FormWrapper>
      <FormWrapper>
        <Controller
          name='ClientFee'
          control={control}
          rules={{
            min: {
              value: 0,
              message: 'Минимальное значение 0',
            },
            max: {
              value: 100,
              message: 'Максимальное значение 100',
            },
          }}
          render={({ field }) => (
            <InputUI
              onChange={(e) => field.onChange(parseInt(e.target.value))}
              value={field.value || ''}
              label='Комиссия от клиента, %'
              fullWidth
              type='number'
              error={errors?.ClientFee}
            />
          )}
        />
        <Controller
          name='AgentFee'
          control={control}
          rules={{
            min: {
              value: 0,
              message: 'Минимальное значение 0',
            },
            max: {
              value: 100,
              message: 'Максимальное значение 100',
            },
          }}
          render={({ field }) => (
            <InputUI
              onChange={(e) => field.onChange(parseInt(e.target.value))}
              value={field.value || ''}
              label='Комиссия от агента, %'
              fullWidth
              type='number'
              error={errors?.AgentFee}
            />
          )}
        />
      </FormWrapper>
    </ObjectSliderBox>
  );
};

export default FormRent;
