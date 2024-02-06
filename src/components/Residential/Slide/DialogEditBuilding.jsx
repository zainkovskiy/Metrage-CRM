import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { InputUI } from 'ui/InputUI';
import { LabelStyle } from '../../../ui/InputUI/InputUIStyled';
import { setUpdateBuilding } from '../../../api/residential';
import { CheckboxUI } from 'ui/CheckboxUI';

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
const DialogEditBuilding = ({ onClose, building, updateBuilding }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: building?.name || '',
      deadline: building?.deadline || '',
      notificationExp: building?.notificationExp || '',
      notificationText: building?.notificationText || '',
      reservationExp: building?.reservationExp || '',
      reservationText: building?.reservationText || '',
      hasSubsidy: building?.hasSubsidy || false,
      hasTransh: building?.hasTransh || false,
    },
  });
  const onSubmit = (data) => {
    setUpdateBuilding({
      ...building,
      ...data,
    }).then(() => {
      updateBuilding(data);
    });
  };
  return (
    <EditBuilding
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SliderTitle>Редактировать корпус</SliderTitle>
      <Controller
        control={control}
        name='name'
        // rules={{ required: { value: true, message: 'Поле обязательно' } }}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Название'
            // error={errors?.secondName}
            ref={field.ref}
          />
        )}
      />
      <Controller
        control={control}
        name='deadline'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Срок сдачи'
            type='month'
          />
        )}
      />
      <Controller
        control={control}
        name='notificationExp'
        // rules={{ required: { value: true, message: 'Поле обязательно' } }}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Уведомление, дней'
            // error={errors?.secondName}
            ref={field.ref}
            type='number'
          />
        )}
      />
      <Controller
        control={control}
        name='notificationText'
        render={({ field }) => (
          <LabelStyle>
            Уведомление, описание
            <FormTextArea
              value={field.value || ''}
              onChange={field.onChange}
              ref={field.ref}
              rows={5}
            />
          </LabelStyle>
        )}
      />
      <Controller
        control={control}
        name='reservationExp'
        // rules={{ required: { value: true, message: 'Поле обязательно' } }}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Бронь, дней'
            // error={errors?.secondName}
            ref={field.ref}
            type='number'
          />
        )}
      />
      <Controller
        control={control}
        name='reservationText'
        render={({ field }) => (
          <LabelStyle>
            Бронь, описание
            <FormTextArea
              value={field.value || ''}
              onChange={field.onChange}
              ref={field.ref}
              rows={5}
            />
          </LabelStyle>
        )}
      />
      <Controller
        name='hasSubsidy'
        control={control}
        render={({ field }) => (
          <CheckboxUI
            label='Субсидированная ипотека'
            id='hasSubsidy'
            checked={field.value || false}
            onChange={(e) => field.onChange(e.target.checked)}
          />
        )}
      />
      <Controller
        name='hasTransh'
        control={control}
        render={({ field }) => (
          <CheckboxUI
            label='Траншевая ипотека'
            id='hasTransh'
            checked={field.value || false}
            onChange={(e) => field.onChange(e.target.checked)}
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

export default DialogEditBuilding;
