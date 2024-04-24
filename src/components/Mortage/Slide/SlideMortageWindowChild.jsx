import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { InputUI } from 'ui/InputUI';
import { useAsyncValue } from 'react-router-dom';
import { setNewChild, updateChild } from '../../../api/mortageAPI';

const WindowChild = styled.form`
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
const SlideMortageWindowChild = ({ child, onClose }) => {
  const mortage = useAsyncValue();
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: child?.child !== 'new' ? child?.child : {},
  });
  const onSubmit = (data) => {
    if (child.child === 'new') {
      setNewChild({
        ...data,
        loanerId: mortage.loaners[child.idx].UID,
      }).then((newChild) => {
        mortage.loaners[child.idx].children.push(newChild);
        onClose();
      });
      return;
    }
    if (isDirty) {
      updateChild(data).then(() => {
        const childFind = mortage.loaners[child.idx].children.find(
          (curChild) => curChild.UID === data.UID
        );
        mortage.loaners[child.idx].children.splice(
          mortage.loaners[child.idx].children.indexOf(childFind),
          1,
          data
        );
        onClose();
      });
    }
  };
  return (
    <WindowChild
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SliderTitle>Добавить детей</SliderTitle>
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
        name='fullName'
        control={control}
        render={({ field }) => (
          <InputUI
            onChange={field.onChange}
            value={field.value || ''}
            label='Полное имя'
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
    </WindowChild>
  );
};

export default SlideMortageWindowChild;
