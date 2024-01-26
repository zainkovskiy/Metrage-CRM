import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { useAsyncValue } from 'react-router-dom';
import { InputUI } from 'ui/InputUI';
import { setNewManager, updateManager } from '../../../api/builderAPI';

const DialogManager = styled.form`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
  box-sizing: border-box;
`;

const DialogAddEditManager = ({ manager, onClose }) => {
  const builder = useAsyncValue();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: manager?.name || '',
      email: manager?.email || '',
      phone: manager?.phone || '',
    },
  });
  const onSubmit = (data) => {
    if (manager === 'new') {
      createNewManager(data);
      return;
    }
    editManager(data);
  };
  const createNewManager = (newManager) => {
    setNewManager({
      UID: builder.UID,
      ...newManager,
    }).then((managerRes) => {
      builder.managers = [...builder.managers, managerRes];
      onClose();
    });
  };
  const editManager = (editManager) => {
    updateManager({
      UID: manager.UID,
      ...editManager,
    }).then((managerRes) => {
      builder.managers = builder.managers.map((item) => {
        if (item.UID === manager.UID) {
          return { ...item, ...editManager };
        }
        return item;
      });
      onClose();
    });
  };
  return (
    <DialogManager
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SliderTitle>
        {manager === 'new' ? 'Добавить' : 'Редактировать'} менеджера
      </SliderTitle>
      <Controller
        control={control}
        name='name'
        // rules={{ required: { value: true, message: 'Поле обязательно' } }}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='ФИО'
            // error={errors?.secondName}
            ref={field.ref}
          />
        )}
      />
      <Controller
        control={control}
        name='phone'
        // rules={{ required: { value: true, message: 'Поле обязательно' } }}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Телефон'
            type='number'
            // error={errors?.secondName}
            ref={field.ref}
          />
        )}
      />
      <Controller
        control={control}
        name='email'
        // rules={{ required: { value: true, message: 'Поле обязательно' } }}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='email'
            type='email'
            // error={errors?.secondName}
            ref={field.ref}
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
    </DialogManager>
  );
};

export default DialogAddEditManager;
