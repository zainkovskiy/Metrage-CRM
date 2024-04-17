import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useDateFormat } from 'hooks/DateFormat';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import SliderAvatar from './SliderAvatar';
import styled from 'styled-components';

const MortageMain = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
`;
const MortageMainTextField = styled.div`
  align-self: center;
`;

const SlideMortageMain = () => {
  const mortage = useAsyncValue();
  return (
    <SliderBlock>
      <SliderTitle>Общее</SliderTitle>
      <MortageMain>
        <SliderAvatar
          role='Клиент'
          avatarData={mortage.client}
          keySubtitle='phone'
        />
        <MortageMainTextField>
          <TextSpanStyle size={12} nowrap>
            Начало сбора документов:{' '}
            {mortage?.dateStartDocs
              ? useDateFormat(mortage.dateStartDocs, 'DD.MM.YYYY')
              : ''}
          </TextSpanStyle>
          <TextSpanStyle size={12} nowrap>
            Дата одобрения клиента:{' '}
            {mortage?.dateApproveClient
              ? useDateFormat(mortage.dateApproveClient, 'DD.MM.YYYY')
              : ''}
          </TextSpanStyle>
          <TextSpanStyle size={12} nowrap>
            Дата выдачи кредита:{' '}
            {mortage?.dateIssueCredit
              ? useDateFormat(mortage.dateIssueCredit, 'DD.MM.YYYY')
              : ''}
          </TextSpanStyle>
        </MortageMainTextField>
        <SliderAvatar
          role='Агент'
          avatarData={mortage.realtor}
          keySubtitle='office'
        />
        <SliderAvatar
          role='Брокер:'
          avatarData={mortage.broker}
          keySubtitle='office'
        />
      </MortageMain>
    </SliderBlock>
  );
};

export default SlideMortageMain;
