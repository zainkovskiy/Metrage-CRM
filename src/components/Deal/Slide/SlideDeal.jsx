import React, { useRef } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useWindowSize } from 'hooks/windowSize';
import SlideDealStory from './SlideDealStory';
import SlideFromContainer from './SlideFromContainer';
import { SliderStyle, SliderContext } from '../../../styles/slider';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { updateDeal } from '../../../api/dealAPI';

const SlideDealStyle = styled.form`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  @media (min-width > 768) {
    min-width: 450px;
  }
`;

const SlideDeal = () => {
  const deal = useAsyncValue();
  const windowSize = useWindowSize();
  const resetValues = useRef({
    depositAmount: deal?.depositAmount || '',
    depositAccepted: deal?.depositAccepted || false,
    depositDelivered: deal?.depositDelivered || false,
    depositReturned: deal?.depositReturned || false,
    depositDate: deal?.depositDate || '',
    preAgreementDateStart: deal?.preAgreementDateStart || '',
    preAgreementDateEnd: deal?.preAgreementDateEnd || '',
    plannedDate: deal?.plannedDate || '',
    actualDate: deal?.actualDate || '',
    objectCost: deal?.objectCost || '',
    agencyComission: deal?.agencyComission || '',
    agentsCalculated: deal?.agentsCalculated || false,
    lawyerCalculated: deal?.lawyerCalculated || false,
    lawyerCalculatedType: deal?.lawyerCalculatedType || 'cash',
  });
  const methods = useForm({
    defaultValues: {
      depositAmount: deal?.depositAmount || '',
      depositAccepted: deal?.depositAccepted || false,
      depositDelivered: deal?.depositDelivered || false,
      depositReturned: deal?.depositReturned || false,
      depositDate: deal?.depositDate || '',
      preAgreementDateStart: deal?.preAgreementDateStart || '',
      preAgreementDateEnd: deal?.preAgreementDateEnd || '',
      plannedDate: deal?.plannedDate || '',
      actualDate: deal?.actualDate || '',
      objectCost: deal?.objectCost || '',
      agencyComission: deal?.agencyComission || '',
      dealTitle: deal?.dealTitle || '',
      agentsCalculated: deal?.agentsCalculated || false,
      lawyerCalculated: deal?.lawyerCalculated || false,
      lawyerCalculatedType: deal?.lawyerCalculatedType || 'cash',
    },
  });
  const onSubmit = (data) => {
    updateDeal({
      ...data,
      UID: deal.UID,
    }).then((answer) => {
      if (answer === 'OK') {
        methods.reset(data);
        resetValues.current = data;
      }
    });
  };
  const clearChangeForm = () => {
    methods.reset(resetValues.current);
  };
  return (
    <SliderStyle>
      <FormProvider {...methods}>
        <SlideDealStyle onSubmit={methods.handleSubmit(onSubmit)}>
          <SlideFromContainer clearChangeForm={clearChangeForm} />
          {/* {
            windowSize <= 768 && object?.isEditor &&
            <SlideObjectStory type={object?.typeEstate} id={object?.UID} fullWidth height={500}/>
          } */}
        </SlideDealStyle>
      </FormProvider>
      {windowSize > 768 && <SlideDealStory />}
    </SliderStyle>
  );
};

export default SlideDeal;
