import React from 'react';
import styled from 'styled-components';
import { SlideBlockStyle, SlideGridWrapper } from '../DealStyle';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { InputUI } from 'ui/InputUI';
import { CheckboxUI } from 'ui/CheckboxUI';
import { useDateFormat } from '../../../hooks/DateFormat';

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
  return (
    <SlideBlockStyle $column>
      <FeatureTitle>Предварительный договор</FeatureTitle>
      <SlideGridWrapper $fullWidth>
        <SlideSide>
          <InputUI
            small
            label='Сумма задатка'
            labelSize={12}
            defaultValue={deal?.depositAmount || ''}
            type='number'
          />
          <CheckboxUI
            disabled={!deal?.isLawyer || false}
            label='Задаток принят'
            // onChange={(e) => {
            //   field.onChange(e.target.checked);
            // }}
            defaultChecked={deal?.depositAccepted || false}
            id='depositAccepted'
            size='small'
            labelSize={12}
          />
          <CheckboxUI
            disabled={!deal?.isСashier || false}
            label='Задаток сдан в кассу'
            // onChange={(e) => {
            //   field.onChange(e.target.checked);
            // }}
            defaultChecked={deal?.depositDelivered || false}
            id='depositDelivered'
            size='small'
            labelSize={12}
          />
          <CheckboxUI
            disabled={!deal?.isСashier || false}
            label='Задаток возвращен клиенту'
            // onChange={(e) => {
            //   field.onChange(e.target.checked);
            // }}
            defaultChecked={deal?.depositReturned || false}
            id='depositReturned'
            size='small'
            labelSize={12}
          />
          <TextSpanStyle size={12}>
            Дата принятия задатка:{' '}
            {deal?.depositDate ? useDateFormat(deal.depositDate) : ''}
          </TextSpanStyle>
        </SlideSide>
        <SlideSide>
          <InputUI
            small
            label='Дата заключения ПДКП'
            labelSize={12}
            defaultValue={deal?.preAgreementDateStart || ''}
            type='date'
          />
          <InputUI
            small
            label='Дата окончания ПДКП'
            labelSize={12}
            defaultValue={deal?.preAgreementDateEnd || ''}
            type='date'
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
