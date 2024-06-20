import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { InputUI } from 'ui/InputUI';
import { LabelStyle } from '../../../ui/InputUI/InputUIStyled';
import { setUpdateBuilding } from '../../../api/residential';
import { CheckboxUI } from 'ui/CheckboxUI';
import { getBusinessСenters } from 'api/objectAPI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';

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
const DialogEditBusiness = ({ onClose, building, updateBusiness }) => {
  const [businessСenters, setBusinessСenters] = useState([]);
  const [businessLoading, setBusinessLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: building,
  });
  const onSubmit = (data) => {
    setUpdateBuilding({
      ...building,
      ...data,
    }).then(() => {
      updateBusiness(data);
    });
  };
  const handleChangeBusinessCenters = async (value) => {
    if (businessLoading) {
      return;
    }
    setBusinessLoading(true);
    try {
      const res = await getBusinessСenters(value);
      setBusinessСenters(res);
    } catch (error) {
      console.log(error);
    } finally {
      setBusinessLoading(false);
    }
  };
  return (
    <EditBuilding
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SliderTitle>Редактировать блок</SliderTitle>
      <Controller
        name='cianBid'
        control={control}
        render={({ field }) => (
          <SelectAutoсompleteUI
            label='ТЦ/БЦ'
            options={businessСenters}
            loading={businessLoading}
            getOptionsLabel={(options) => options.bcName}
            getOptionsSubtitle={(options) => options.bcAddress}
            inputChange={handleChangeBusinessCenters}
            onChange={(option) => field.onChange(option)}
            value={field.value}
          />
        )}
      />
      <Controller
        control={control}
        name='notificationText'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Коммиссия'
            ref={field.ref}
          />
        )}
      />
      <Controller
        control={control}
        name='reservationText'
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label='Срок договора'
          />
        )}
      />
      <Controller
        control={control}
        name='addText'
        render={({ field }) => (
          <LabelStyle>
            Примечания
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
        name='hasTaboo'
        control={control}
        render={({ field }) => (
          <CheckboxUI
            label='Запрет рекламы собственником'
            id='hasTaboo'
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

export default DialogEditBusiness;
