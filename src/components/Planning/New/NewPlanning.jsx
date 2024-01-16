import React, { useState } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';

import { getLocalOfficeList } from '../../../api/search';

import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { SliderContext, SliderTitle } from '../../../styles/slider';
import { createPlan } from '../../../api/planApi';

const SliderContextWhite = styled(SliderContext)`
  background-color: #fff;
  border-radius: 5px;
  padding: 0.5em;
  height: 100%;
  box-sizing: border-box;
`;
const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
  justify-content: space-between;
`;

const NewPlanning = () => {
  const { control, handleSubmit } = useForm();
  const [officeList, setOfficeList] = useState([]);
  const onSubmit = (data) => {
    //TODO: прорабоатть апи
    createPlan(data);
  };
  const getOfficeList = (value) => {
    if (value.length < 2) {
      setOfficeList([]);
      return;
    }
    getLocalOfficeList(value).then((data) => {
      setOfficeList(data);
    });
  };
  return (
    <SliderContextWhite>
      <SliderTitle>Создать план</SliderTitle>
      <FormStyle onSubmit={handleSubmit(onSubmit)}>
        <Box column fullWidth ai='normal'>
          <Controller
            name='office'
            control={control}
            // rules={{ required: { value: true, message: 'Поле обязательно' } }}
            render={({ field }) => (
              <SelectAutoсompleteUI
                small
                label='Офис'
                options={officeList}
                getOptionsLabel={(options) => options.name}
                onChange={(option) => field.onChange(option)}
                value={field.value}
                inputChange={getOfficeList}
                // error={errors?.office}
                inputRef={field.ref}
              />
            )}
          />
          <Controller
            name='planDate'
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <InputUI
                value={field.value}
                onChange={field.onChange}
                small
                type='month'
                label='Дата плана'
              />
            )}
          />
        </Box>
        <ButtonUI size='small' type='submit'>
          Создать
        </ButtonUI>
      </FormStyle>
    </SliderContextWhite>
  );
};

export default NewPlanning;
