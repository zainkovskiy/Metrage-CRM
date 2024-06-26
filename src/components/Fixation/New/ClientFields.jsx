import React from 'react';
import { useFormContext, useFormState, Controller } from 'react-hook-form';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { InputUI } from 'ui/InputUI';
import { SliderTitle } from '../../../styles/slider';
import * as S from './styleNew';
import PhoneTextBlock from './PhoneTextBlock';

const ClientFields = ({ phoneRight, isCheckedPhone }) => {
  const { getValues } = useFormContext();
  const { control } = useFormState();
  return (
    <>
      <SliderTitle>Клиент</SliderTitle>
      <S.FormGrid>
        <Controller
          control={control}
          name='phone'
          render={({ field }) => (
            <InputUI
              small
              value={field.value || ''}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
              label='Номер телефона*'
              type='number'
            />
          )}
        />
        <Box ai='flex-end'>
          <ButtonUI
            size='small'
            fullWidth
            disabled={!getValues('phone')}
            onClick={isCheckedPhone}
          >
            Проверить
          </ButtonUI>
        </Box>
        <TextSpanStyle size={10}>
          * производиться проверка внутри агентства на уникальность номера.
          Уникальность Клиента у Застройщика производиться уже после отправки
          фиксации в его адрес
        </TextSpanStyle>
        <PhoneTextBlock
          success={phoneRight?.success || null}
          reason={phoneRight?.reason || ''}
        />
        {phoneRight?.nextStep && (
          <>
            <Controller
              control={control}
              name='lastName'
              render={({ field }) => (
                <InputUI
                  small
                  value={field.value || ''}
                  onChange={field.onChange}
                  label='Фамилия'
                />
              )}
            />
            <Controller
              control={control}
              name='firstName'
              render={({ field }) => (
                <InputUI
                  small
                  value={field.value || ''}
                  onChange={field.onChange}
                  label='Имя'
                />
              )}
            />
            <Controller
              control={control}
              name='secondName'
              render={({ field }) => (
                <InputUI
                  small
                  value={field.value || ''}
                  onChange={field.onChange}
                  label='Отчество*'
                  helperText='* при наличии'
                />
              )}
            />
            {getValues('fixationType') === '1' && (
              <Controller
                control={control}
                name='passData'
                render={({ field }) => (
                  <InputUI
                    small
                    value={field.value || ''}
                    onChange={field.onChange}
                    label='Паспорт*'
                    helperText='* при наличии'
                  />
                )}
              />
            )}
          </>
        )}
      </S.FormGrid>
    </>
  );
};

export default ClientFields;
