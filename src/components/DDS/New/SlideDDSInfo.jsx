import React, { useState } from 'react';
import { SliderBlock } from '../../../styles/slider';
import { InputUI } from 'ui/InputUI';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import styled from 'styled-components';
import SliderAvatar from './SliderAvatar';
import { useAsyncValue } from 'react-router-dom';
import { useNumberTriad } from 'hooks/StringHook';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle';
import DialogWindow from 'components/Main/DialogWindow';
import UserFinder from 'components/Main/UserFinder';
import { LabelStyle } from '../../../ui/InputUI/InputUIStyled';
import { ButtonLink } from 'ui/ButtonLink';
import { getSubCategory } from '../../../api/ddsApi';

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

const SlideDDSInfo = ({ info, idx }) => {
  const dds = useAsyncValue();
  const { control, setValue, getValues, watch } = useFormContext();
  const { errors } = useFormState();
  const [open, setOpen] = useState(false);
  const [subCategory, setSubCategory] = useState(info?.subCatList || []);
  const openChangeWindow = () => {
    setOpen(true);
  };
  const closeChangeWindow = () => {
    setOpen(false);
  };
  const changeTargetUser = (user) => {
    dds.addiction[idx].salaryResipient = user;
    setValue(`addiction[${idx}].salaryResipient`, user, {
      shouldDirty: true,
    });
    closeChangeWindow();
  };
  const getSubCategoryList = (value) => {
    getSubCategory(value).then((subList) => {
      if (Array.isArray(subList)) {
        setSubCategory(subList);
      }
    });
    setValue('subCategory', null);
  };
  watch(`addiction[${idx}].coming`);
  watch(`addiction[${idx}].expense`);
  watch(`addiction[${idx}].category`);
  return (
    <SliderBlock>
      <Controller
        control={control}
        name={`addiction[${idx}].ddsType`}
        render={({ field }) => (
          <LabelStyle>
            Укажите тип расчета по ДДС
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
          </LabelStyle>
        )}
      />
      <FieldsLine>
        <Controller
          name={`addiction[${idx}].coming`}
          control={control}
          render={({ field }) => (
            <InputUI
              label={`Приход ${
                Boolean(getValues(`addiction[${idx}].expense`))
                  ? '(Поле заблокировано)'
                  : ''
              }`}
              fullWidth
              small
              disabled={Boolean(getValues(`addiction[${idx}].expense`))}
              value={field.value ? useNumberTriad(field.value || 0) : ''}
              onChange={(e) =>
                field.onChange(parseInt(e.target.value.split(' ').join('')))
              }
            />
          )}
        />

        <Controller
          name={`addiction[${idx}].expense`}
          control={control}
          render={({ field }) => (
            <InputUI
              label={`Расход ${
                Boolean(getValues(`addiction[${idx}].coming`))
                  ? '(Поле заблокировано)'
                  : ''
              }`}
              fullWidth
              small
              disabled={Boolean(getValues(`addiction[${idx}].coming`))}
              value={field.value ? useNumberTriad(field.value || 0) : ''}
              onChange={(e) =>
                field.onChange(parseInt(e.target.value.split(' ').join('')))
              }
            />
          )}
        />
      </FieldsLine>
      <FieldsLine>
        <Controller
          name={`addiction[${idx}].category`}
          control={control}
          rules={{ required: { value: true, message: 'Поле обязательно' } }}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                getSubCategoryList(newValue);
                field.onChange(newValue);
              }}
              select={field.value || 'all'}
              label='Категория'
              small
              error={errors?.addiction?.[idx]?.category}
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
          name={`addiction[${idx}].subCategory`}
          control={control}
          render={({ field }) => (
            <SelectUI
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              select={field.value || 'all'}
              label='Подкатегория'
              disabled={subCategory.length === 0}
              small
            >
              {subCategory.map((item) => (
                <SelectItemUI key={item} value={item}>
                  {item}
                </SelectItemUI>
              ))}
            </SelectUI>
          )}
        />
      </FieldsLine>
      <FieldsLine>
        <Controller
          control={control}
          name={`addiction[${idx}].comment`}
          render={({ field }) => (
            <LabelStyle>
              Описание
              <TextAreaStyle
                value={field.value || ''}
                onChange={field.onChange}
                rows={4}
              />
            </LabelStyle>
          )}
        />
        {info?.salaryResipient ? (
          <SliderAvatar
            role='Получатель:'
            avatarData={info.salaryResipient}
            keySubtitle='office'
            isChangeButton={openChangeWindow}
          />
        ) : (
          <ButtonLink
            size={14}
            color='rgb(133, 0, 158)'
            onClick={openChangeWindow}
          >
            Получатель
          </ButtonLink>
        )}
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
