import React, { useState } from 'react';
import styled from 'styled-components';
import { device } from 'styles/device';
import { useAsyncValue } from 'react-router-dom';
import {
  getCalculation,
  setCalculationAuto,
  setCalculationManual,
} from '../../../api/dealAPI';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import SlideDialogRealtorForm1 from './SlideDialogRealtorForm1';
import SlideDialogRealtorForm2 from './SlideDialogRealtorForm2';

const Title = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
`;
const SlideDialogStyle = styled(motion.div)`
  background-color: #fff;
  width: 40vw;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
  @media ${device.tablet} {
    width: 80vw;
  }
`;

const SlideDialogRealtor = ({ onClose, user }) => {
  const deal = useAsyncValue();
  const [formNumber, setFormNumber] = useState(2);
  const {
    control,
    watch,
    getValues,
    formState: { isLoading },
  } = useForm({
    defaultValues: async () =>
      await getCalculation({
        dealId: deal.UID,
        agentId: user.UID,
      }),
  });
  const onSubmit = () => {
    getValues('hasDdsRecord') && formNumber === 2
      ? calculationAuto()
      : calculationManual();
  };
  const calculationAuto = () => {
    setCalculationAuto(getValues()).finally(() => {
      onClose();
    });
  };
  const calculationManual = () => {
    setCalculationManual(getValues()).finally(() => {
      onClose();
    });
  };
  const setManualForm = () => {
    setFormNumber(1);
  };
  return (
    <SlideDialogStyle onClick={(e) => e.stopPropagation()} layout>
      <Title>Рассчёт</Title>
      {getValues('hasDdsRecord') && formNumber === 2 ? (
        <SlideDialogRealtorForm2
          getValues={getValues}
          onSubmit={onSubmit}
          setManualForm={setManualForm}
        />
      ) : (
        <SlideDialogRealtorForm1
          control={control}
          watch={watch}
          getValues={getValues}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
    </SlideDialogStyle>
  );
};

export default SlideDialogRealtor;
