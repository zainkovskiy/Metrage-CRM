import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { InputUI } from 'ui/InputUI';
import {
  createNewManagerResidential,
  editManagerResidential,
} from '../../../api/residential';

const DialogManagerStyle = styled.form`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 300px;
  box-sizing: border-box;
`;

const DialogManager = ({
  manager,
  onClose,
  buildingUID,
  addNewManager,
  updateManager,
}) => {
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
  const createNewManager = (data) => {
    createNewManagerResidential({
      UID: buildingUID,
      ...data,
    }).then((newManager) => {
      if (newManager) {
        addNewManager(newManager);
      }
    });
  };
  const editManager = (data) => {
    const updManager = {
      UID: manager.UID,
      ...data,
    };
    editManagerResidential(updManager).then(() => {
      updateManager(updManager);
    });
  };
  const onSubmit = (data) => {
    if (manager === 'new') {
      createNewManager(data);
      return;
    }
    editManager(data);
  };
  return (
    <DialogManagerStyle
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
    </DialogManagerStyle>
  );
};

export default DialogManager;
