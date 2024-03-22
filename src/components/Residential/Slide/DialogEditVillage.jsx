import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { InputUI } from 'ui/InputUI';
import { useSelector } from 'react-redux';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import {
  SelectMultipleUI,
  SelectMultipleItemUI,
} from 'ui/SelectMultipleUI/SelectMultipleUI';
import { setUpdateBuilding } from '../../../api/residential';
import { useAsyncValue } from 'react-router-dom';

const EditBuilding = styled.form`
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
const DialogEditVillage = ({ onClose, building, updateVillage }) => {
  const residential = useAsyncValue();
  const { schema } = useSelector((state) => state.residential);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...building.suburbanParams },
  });
  const onSubmit = (data) => {
    setUpdateBuilding({
      ...building,
      ...data,
    }).then(() => {
      updateVillage(data);
    });
  };
  return (
    <EditBuilding
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SliderTitle>Редактировать КП</SliderTitle>
      {residential?.landSchema && (
        <Controller
          name='landCategory'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              select={field.value || ''}
              label='Категория земель'
              small
            >
              {residential.landSchema.map((land) => (
                <SelectItemUI key={land} value={land}>
                  {land}
                </SelectItemUI>
              ))}
            </SelectUI>
          )}
        />
      )}
      <Controller
        name='onLandHas'
        control={control}
        render={({ field }) => (
          <SelectMultipleUI
            onChange={(newValue) => field.onChange(newValue)}
            value={field.value}
            multiple
            fullWidth
            small
            label='На участке'
          >
            <SelectMultipleItemUI value={'Электричество'}>
              Электричество
            </SelectMultipleItemUI>
            <SelectMultipleItemUI value={'Вода'}>Вода</SelectMultipleItemUI>
            <SelectMultipleItemUI value={'Газ'}>Газ</SelectMultipleItemUI>
            <SelectMultipleItemUI value={'Канализация'}>
              Канализация
            </SelectMultipleItemUI>
          </SelectMultipleUI>
        )}
      />
      {schema?.bankSchema && (
        <>
          <Controller
            name='includeAccreditation'
            control={control}
            render={({ field }) => (
              <SelectMultipleUI
                onChange={(newValue) => field.onChange(newValue)}
                value={field.value}
                multiple
                fullWidth
                small
                label='Есть аккредитация'
              >
                {schema.bankSchema.map((bank) => (
                  <SelectMultipleItemUI key={bank.UID} value={bank.bankName}>
                    {bank.bankName}
                  </SelectMultipleItemUI>
                ))}
              </SelectMultipleUI>
            )}
          />
          <Controller
            name='excludeAccreditation'
            control={control}
            render={({ field }) => (
              <SelectMultipleUI
                onChange={(newValue) => field.onChange(newValue)}
                value={field.value}
                multiple
                fullWidth
                small
                label='Исключения в аккредитации'
              >
                {schema.bankSchema.map((bank) => (
                  <SelectMultipleItemUI key={bank.UID} value={bank.bankName}>
                    {bank.bankName}
                  </SelectMultipleItemUI>
                ))}
              </SelectMultipleUI>
            )}
          />
        </>
      )}

      <Controller
        name='whoDeveloper'
        control={control}
        render={({ field }) => (
          <SelectUI
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            select={field.value || ''}
            label='Выступить застройщиком может'
            small
          >
            <SelectItemUI value='Любой'>Любой</SelectItemUI>
            <SelectItemUI value='только представитель КП'>
              только представитель КП
            </SelectItemUI>
          </SelectUI>
        )}
      />
      <Controller
        control={control}
        name='comissionStart'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Комиссия от'
          />
        )}
      />
      <Controller
        control={control}
        name='comissionEnd'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Комиссия до'
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
    </EditBuilding>
  );
};

export default DialogEditVillage;
