import React, { useState } from 'react';
import { SliderBlock } from '../../../styles/slider';
import { InputUI } from 'ui/InputUI';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import SliderAvatar from './SliderAvatar';
import { useAsyncValue } from 'react-router-dom';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import DialogWindow from 'components/Main/DialogWindow';
import UserFinder from 'components/Main/UserFinder';

const FieldsLine = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
  ${({ $notGapRow }) => $notGapRow && 'row-gap: 0;'};
`;

const SlideDDSInfo = () => {
  const dds = useAsyncValue();
  const { control, setValue } = useFormContext();
  const [open, setOpen] = useState(false);
  const openChangeWindow = () => {
    setOpen(true);
  };
  const closeChangeWindow = () => {
    setOpen(false);
  };
  const changeTargetUser = (user) => {
    dds.salaryResipient = user;
    setValue('salaryResipient', user, {
      shouldDirty: true,
    });
    closeChangeWindow();
  };
  return (
    <SliderBlock>
      <FieldsLine>
        <Controller
          name='coming'
          control={control}
          render={({ field }) => (
            <InputUI {...field} label='Приход' fullWidth small type='number' />
          )}
        />
        <Controller
          name='expense'
          control={control}
          render={({ field }) => (
            <InputUI {...field} label='Расход' fullWidth small type='number' />
          )}
        />
      </FieldsLine>
      <FieldsLine>
        <Controller
          name='category'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              select={field.value || 'all'}
              label='Категория'
              small
            >
              {dds.categoryList.map((item) => (
                <SelectItemUI key={item} value={item}>
                  {item}
                </SelectItemUI>
              ))}
            </SelectUI>
          )}
        />
        <InputUI
          value={dds.onCash}
          label='В кассе, руб'
          fullWidth
          small
          readOnly
        />
      </FieldsLine>
      <FieldsLine $notGapRow>
        <SliderAvatar
          role='Получатель (для выплат ЗП):'
          avatarData={dds.salaryResipient}
          keySubtitle='office'
          isChangeButton={openChangeWindow}
        />
        <div></div>
      </FieldsLine>
      <DialogWindow open={open} onClose={closeChangeWindow}>
        <div onClick={(e) => e.stopPropagation()}>
          <UserFinder onClose={closeChangeWindow} onChange={changeTargetUser} />
        </div>
      </DialogWindow>
    </SliderBlock>
  );
};

export default SlideDDSInfo;
