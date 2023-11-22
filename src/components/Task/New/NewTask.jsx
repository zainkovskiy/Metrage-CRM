import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { SliderTitle } from '../../../styles/slider';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../../api/search';
import { createNewTask, updateTask } from '../../../api/taskApi';
import { useAsyncValue } from 'react-router-dom';
import { updateTaskCard } from '../../../store/taskSlice';

const NewUserStyle = styled.form`
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
const NewTask = ({ onClose }) => {
  const userId = useSelector((state) => state.user.UID);
  const task = useAsyncValue();
  const dispatch = useDispatch();
  const [userList, setUserList] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      responsibleId: task?.responsibleId || '',
      title: task?.title || '',
      description: task?.description || '',
      duedate: task?.duedate || '',
    },
  });

  const onSubmit = (data) => {
    if (task) {
      updateTask({
        ...task,
        ...data,
      }).then((answer) => {
        if (answer === 'OK') {
          dispatch(updateTaskCard(task.UID));
          onClose();
        }
      });
      return;
    }
    createNewTask({
      creatorId: userId,
      ...data,
    }).then((data) => {
      onClose(data?.UID || null);
    });
  };
  const getUserListValue = (value) => {
    if (value.length < 2) {
      setUserList([]);
      return;
    }
    getUserList(value).then((list) => {
      setUserList(list);
    });
  };
  return (
    <NewUserStyle onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <SliderTitle>
          {task ? 'Редактировать задачу' : 'Новый задача'}
        </SliderTitle>
        <Controller
          name='responsibleId'
          control={control}
          // rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <SelectAutoсompleteUI
              small
              label='Исполнитель'
              options={userList}
              getOptionsLabel={(options) =>
                `${options.firstName} ${options.lastName}`
              }
              onChange={(option) => field.onChange(option)}
              value={field.value}
              inputChange={getUserListValue}
              // error={errors?.office}
              // inputRef={field.ref}
            />
          )}
        />
        <Controller
          control={control}
          name='title'
          // rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <InputUI
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Название'
            />
          )}
        />
        <Controller
          control={control}
          name='description'
          // rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <Box column ai='flex-start' gap='0.2rem'>
              <TextSpanStyle>Описание</TextSpanStyle>
              <TextAreaStyle
                type='date'
                small
                value={field.value || ''}
                onChange={field.onChange}
                rows={8}
                // error={errors?.birthDate}
                // ref={field.ref}
              />
            </Box>
          )}
        />
        <Controller
          control={control}
          name='duedate'
          // rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <InputUI
              type='date'
              small
              value={field.value || ''}
              onChange={field.onChange}
              label='Срок до'
              // error={errors?.birthDate}
              // ref={field.ref}
            />
          )}
        />
      </FormContainer>
      <ButtonUI type='submit'>Сохранить</ButtonUI>
    </NewUserStyle>
  );
};

export default NewTask;
