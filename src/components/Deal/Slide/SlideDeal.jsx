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
    TotalArea: deal?.TotalArea || '',
    Appartment: deal?.Appartment || '',
    FlatRoomsCount: deal?.FlatRoomsCount ? parseInt(deal?.FlatRoomsCount) : '',
    DDUNumber: deal?.DDUNumber || '',
    DDUDate: deal?.DDUDate || '',
    actDeliveredDate: deal?.actDeliveredDate || '',
    actAcceptedDate: deal?.actAcceptedDate || '',
    cashDate: deal?.cashDate || '',
    plannedDate: deal?.plannedDate || '',
    actualDate: deal?.actualDate || '',
    preAgreementDateEnd: deal?.preAgreementDateEnd || '',
    objectCost: deal?.objectCost || '',
    agencyComission: deal?.agencyComission || '',
    ownFunds: deal?.ownFunds || '',
    mortgageFunds: deal?.mortgageFunds || '',
    bank: deal?.bank || '',
    hasInsurance: deal?.hasInsurance || false,
    needInsurance: deal?.needInsurance || false,
    needMortgage: deal?.needMortgage || false,
    depositAmount: deal?.depositAmount || '',
    depositDate: deal?.depositDate || '',
    dealTitle: deal?.dealTitle || '',
    depositStatus: deal?.depositStatus || '',
    alwaysBroker: deal?.alwaysBroker || false,
    alwaysBrand: deal?.alwaysBrand || false,
    isRent: deal?.isRent || false,
    isSuburban: deal?.isSuburban || false,
    devName: deal?.newbParams || '',
  });
  const methods = useForm({
    defaultValues: {
      TotalArea: deal?.TotalArea || '',
      Appartment: deal?.Appartment || '',
      FlatRoomsCount: deal?.FlatRoomsCount
        ? parseInt(deal?.FlatRoomsCount)
        : '',
      DDUNumber: deal?.DDUNumber || '',
      DDUDate: deal?.DDUDate || '',
      actDeliveredDate: deal?.actDeliveredDate || '',
      actAcceptedDate: deal?.actAcceptedDate || '',
      cashDate: deal?.cashDate || '',
      plannedDate: deal?.plannedDate || '',
      actualDate: deal?.actualDate || '',
      preAgreementDateEnd: deal?.preAgreementDateEnd || '',
      objectCost: deal?.objectCost || '',
      agencyComission: deal?.agencyComission || '',
      ownFunds: deal?.ownFunds || '',
      mortgageFunds: deal?.mortgageFunds || '',
      bank: deal?.bank || '',
      hasInsurance: deal?.hasInsurance || false,
      needInsurance: deal?.needInsurance || false,
      needMortgage: deal?.needMortgage || false,
      depositAmount: deal?.depositAmount || '',
      depositDate: deal?.depositDate || '',
      dealTitle: deal?.dealTitle || '',
      depositStatus: deal?.depositStatus || '',
      alwaysBroker: deal?.alwaysBroker || false,
      alwaysBrand: deal?.alwaysBrand || false,
      isSuburban: deal?.isSuburban || false,
      isRent: deal?.isRent || false,
      devName: deal?.newbParams || '',
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
        deal.isSuburban = data.isSuburban;
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
