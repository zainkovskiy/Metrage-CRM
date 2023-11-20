import React from 'react';
import styled from 'styled-components';
import { SlideBlockStyle, SlideGridWrapper } from '../DealStyle';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { InputUI } from 'ui/InputUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { useDateFormat } from '../../../hooks/DateFormat';
import { Controller, useFormContext } from 'react-hook-form';
import { useNumberTriad } from 'hooks/StringHook';

const FeatureTitle = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SlideSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const SlidePreliminaryAgreement = () => {
  const deal = useAsyncValue();
  const { control } = useFormContext();
  return (
    <SlideBlockStyle $column>
      <FeatureTitle>
        {deal.dealType === 'developer' ? 'Бронь' : 'Предварительный договор'}
      </FeatureTitle>
      <SlideGridWrapper $fullWidth>
        <SlideSide>
          <Controller
            name='depositAmount'
            control={control}
            render={({ field }) => (
              <InputUI
                small
                label='Сумма задатка'
                labelSize={12}
                value={field.value ? useNumberTriad(field.value || 0) : ''}
                onChange={(e) =>
                  field.onChange(parseInt(e.target.value.split(' ').join('')))
                }
              />
            )}
          />
          <Controller
            name='depositAccepted'
            control={control}
            render={({ field }) => (
              <CheckboxUI
                disabled={!deal?.isСashier || false}
                label='Задаток принят в АН'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                checked={field.value || false}
                id='depositAccepted'
                size='small'
                labelSize={12}
              />
            )}
          />
          <Controller
            name='depositReturned'
            control={control}
            render={({ field }) => (
              <CheckboxUI
                disabled={!deal?.isСashier || false}
                label='Задаток выдан на руки'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                defaultChecked={field.value || false}
                id='depositReturned'
                size='small'
                labelSize={12}
              />
            )}
          />
          <Controller
            name='depositDelivered'
            control={control}
            render={({ field }) => (
              <CheckboxUI
                disabled={!deal?.isСashier || false}
                label='Задаток в другом АН'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                checked={field.value || false}
                id='depositDelivered'
                size='small'
                labelSize={12}
              />
            )}
          />
        </SlideSide>
        <SlideSide>
          <Controller
            name='depositDate'
            control={control}
            render={({ field }) => (
              <InputUI
                small
                label='Дата принятия задатка:'
                labelSize={12}
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value)}
                type='date'
              />
            )}
          />
          <Controller
            name='preAgreementDateStart'
            control={control}
            render={({ field }) => (
              <InputUI
                small
                label={
                  deal.dealType === 'developer'
                    ? 'Дата брони'
                    : 'Дата заключения ПДКП'
                }
                labelSize={12}
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value)}
                type='date'
              />
            )}
          />
          <Controller
            name='preAgreementDateEnd'
            control={control}
            render={({ field }) => (
              <InputUI
                small
                label={
                  deal.dealType === 'developer'
                    ? 'Дата окончания брони'
                    : 'Дата окончания ПДКП'
                }
                labelSize={12}
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value)}
                type='date'
              />
            )}
          />
        </SlideSide>
      </SlideGridWrapper>
    </SlideBlockStyle>
  );
};

export default SlidePreliminaryAgreement;

// public Int $depositAmount;      //Сумма задатка
// public Bool $depositAccepted;   //Задаток принят (Риелтор(Юрист))
// public Bool $depositDelivered;  //Задаток сдан в кассу (Кассир)
// public Bool $depositReturned;   //Задаток возвращен клиенту (Кассир)

// public $preAgreementDateStart;  //Дата заключения ПДКП
// public $preAgreementDateEnd;    //Дата окончания ПДКП
