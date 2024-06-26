import React from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { LabelStyle } from '../../../ui/InputUI/InputUIStyled';
import { SliderTitle } from '../../../styles/slider';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle';
import * as S from './styleNew';
import NewBuildingFields from './NewBuildingFields';
import NewVillageFields from './NewVillageFields.';

const ObjectFields = () => {
  const { getValues, watch } = useFormContext();
  const { control } = useFormState();
  watch('typeObject');
  return (
    <>
      <SliderTitle>Предмет</SliderTitle>
      <Controller
        control={control}
        name='typeObject'
        rules={{ required: true }}
        render={({ field }) => (
          <LabelStyle>
            Тип объекта:
            <ButtonToggleGroup fullWidth>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='0'
                active={field.value}
              >
                Новостройка
              </ButtonToggleItem>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='1'
                active={field.value}
              >
                Загородка
              </ButtonToggleItem>
            </ButtonToggleGroup>
          </LabelStyle>
        )}
      />

      {getValues('typeObject') === '0' && <NewBuildingFields />}
      {getValues('typeObject') === '1' && <NewVillageFields />}
      <Controller
        control={control}
        name='comment'
        render={({ field }) => (
          <LabelStyle>
            Комментарии для менеджера:
            <S.TextAreaStyle rows={4} onChange={field.onChange} />
          </LabelStyle>
        )}
      />
    </>
  );
};

export default ObjectFields;
