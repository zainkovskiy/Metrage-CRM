import React, { useState } from 'react';
import { SliderBlock } from '../../../styles/slider';
import { InputUI } from 'ui/InputUI';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import SliderAvatar from './SliderAvatar';
import { useAsyncValue } from 'react-router-dom';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle';
import DialogWindow from 'components/Main/DialogWindow';
import UserFinder from 'components/Main/UserFinder';
import { LabelStyle } from '../../../ui/InputUI/InputUIStyled';

const FieldsLine = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
  ${({ $notGapRow }) => $notGapRow && 'row-gap: 0;'};
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
          control={control}
          name='ddsType'
          rules={{ required: true }}
          render={({ field }) => (
            <ButtonToggleGroup fullWidth>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='0'
                active={field.value}
              >
                Нал
              </ButtonToggleItem>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='1'
                active={field.value}
              >
                Безнал
              </ButtonToggleItem>
            </ButtonToggleGroup>
          )}
        />
      </FieldsLine>
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
        <Controller
          name='subCategory'
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              select={field.value || 'all'}
              label='Подкатегория'
              small
            >
              {dds.subCategoryList.map((item) => (
                <SelectItemUI key={item} value={item}>
                  {item}
                </SelectItemUI>
              ))}
            </SelectUI>
          )}
        />
      </FieldsLine>
      <div style={{ marginTop: '0.5rem' }}>
        <Controller
          control={control}
          name='comment'
          render={({ field }) => (
            <LabelStyle>
              Описание
              <TextAreaStyle
                value={field.value || ''}
                onChange={field.onChange}
                rows={6}
              />
            </LabelStyle>
          )}
        />
      </div>
      <FieldsLine $notGapRow>
        {dds?.salaryResipient ? (
          <SliderAvatar
            role='Получатель (для выплат ЗП):'
            avatarData={dds.salaryResipient}
            keySubtitle='office'
            isChangeButton={openChangeWindow}
          />
        ) : (
          <div />
        )}
        <InputUI
          value={dds.onCash}
          label='В кассе, руб'
          fullWidth
          small
          readOnly
        />
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
