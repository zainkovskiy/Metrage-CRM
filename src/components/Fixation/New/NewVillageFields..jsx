import React from 'react';
import { useFormState, Controller, useFormContext } from 'react-hook-form';
import * as S from './styleNew';
import { TextSpanStyle } from 'styles/styles';
import { LabelStyle } from '../../../ui/InputUI/InputUIStyled';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle';
import NewVillageDeveloper from './NewVillageDeveloper';
import NewVillageSuburban from './NewVillageSuburban';

const NewVillageFields = () => {
  const { getValues, watch } = useFormContext();
  const { control } = useFormState();
  watch('suburbanType');
  return (
    <>
      <Controller
        control={control}
        name='suburbanType'
        rules={{ required: true }}
        render={({ field }) => (
          <LabelStyle>
            Тип объекта:
            <ButtonToggleGroup fullWidth>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='1'
                active={field.value}
              >
                Участок с подрядом
              </ButtonToggleItem>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='2'
                active={field.value}
              >
                Участок
              </ButtonToggleItem>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='3'
                active={field.value}
              >
                Подряд
              </ButtonToggleItem>
            </ButtonToggleGroup>
            <TextSpanStyle size={10}>
              {getValues('suburbanType') === '1' &&
                '*Применяется когда строительство ведёт Подрядчик, являющийся представителем Коттеджного посёлка.'}
              {getValues('suburbanType') === '2' &&
                '*Применяется для фиксации клиента в коттеджном посёлке, без уведомления Подрядчика.'}
              {getValues('suburbanType') === '3' &&
                '*Применяется для фиксации клиента у Подрядчика.'}
            </TextSpanStyle>
          </LabelStyle>
        )}
      />
      <S.FormGrid>
        {getValues('suburbanType') !== '3' && <NewVillageSuburban />}
        {getValues('suburbanType') !== '2' && <NewVillageDeveloper />}
      </S.FormGrid>
    </>
  );
};

export default NewVillageFields;
