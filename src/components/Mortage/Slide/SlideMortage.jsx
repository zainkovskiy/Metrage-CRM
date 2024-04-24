import React, { useState } from 'react';
import { useWindowSize } from 'hooks/windowSize';
import { SliderStyle, SliderContext } from '../../../styles/slider';
import SlideMortageStory from './SlideMortageStory';
import SlideMortageMeta from './SlideMortageMeta';
import SlideMortageStatus from './SlideMortageStatus';
import SlideMortageMain from './SlideMortageMain';
import { FormProvider, useForm } from 'react-hook-form';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import SlideMortageCredit from './SlideMortageCredit';
import SlideMortageLoaners from './SlideMortageLoaners';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { SliderFormButtonGroup } from '../../../styles/SliderFormButtonGroup';
import { useDispatch } from 'react-redux';
import { saveMortageSlide } from '../../../store/slices/mortageSlice';
import DialogWindow from 'components/Main/DialogWindow';
import SlideMortageWindowBid from './SlideMortageWindowBid';
import SlideMortageWindowLoaner from './SlideMortageWindowLoaner';
import SlideMortageWindowChild from './SlideMortageWindowChild';

const SliderMortageForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SlideMortage = () => {
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  const mortage = useAsyncValue();
  const [openBid, setOpenBid] = useState(null);
  const [openLoaner, setOpenLoaner] = useState(null);
  const [openChild, setOpenChild] = useState(null);
  const method = useForm({
    defaultValues: mortage,
  });
  const onSubmit = (data) => {
    dispatch(saveMortageSlide(data));
    method.reset(data);
  };
  const openWindowBid = (bid) => {
    setOpenBid(bid);
  };
  const closeWindowBid = () => {
    setOpenBid(null);
  };
  const setBid = () => {
    method.setValue('credit.bids', mortage.credit.bids, {
      shouldDirty: true,
    });
    closeWindowBid();
  };
  const openWindowLoaner = (loaner) => {
    setOpenLoaner(loaner);
  };
  const closeWindowLoaner = () => {
    setOpenLoaner(null);
  };
  const setLoaner = () => {
    method.setValue('loaners', mortage.loaners, {
      shouldDirty: true,
    });
    closeWindowLoaner();
  };
  const openWindowChild = (child) => {
    setOpenChild(child);
  };
  const closeWindowChild = () => {
    setOpenChild(null);
  };
  return (
    <SliderStyle>
      <SliderContext>
        <SlideMortageMeta />
        <SlideMortageStatus />
        <SlideMortageMain />
        <FormProvider {...method}>
          <SliderMortageForm onSubmit={method.handleSubmit(onSubmit)}>
            <SlideMortageLoaners
              openWindowLoaner={openWindowLoaner}
              openWindowChild={openWindowChild}
            />
            <SlideMortageCredit openWindowBid={openWindowBid} />
            {method.formState.isDirty && (
              <SliderFormButtonGroup>
                <TextSpanStyle>Сохранить изменения?</TextSpanStyle>
                <ButtonUI type='submit' size='small'>
                  Сохранить
                </ButtonUI>
              </SliderFormButtonGroup>
            )}
          </SliderMortageForm>
        </FormProvider>
        {windowSize < 768 && <SlideMortageStory fullWidth height={500} />}
      </SliderContext>
      {windowSize > 768 && <SlideMortageStory />}
      <DialogWindow open={openBid} onClose={closeWindowBid}>
        <SlideMortageWindowBid
          onClose={closeWindowBid}
          bid={openBid}
          setBid={setBid}
        />
      </DialogWindow>
      <DialogWindow open={openLoaner} onClose={closeWindowLoaner} disabledClose>
        <SlideMortageWindowLoaner
          onClose={closeWindowLoaner}
          loaner={openLoaner}
          setLoaner={setLoaner}
        />
      </DialogWindow>
      <DialogWindow open={openChild} onClose={closeWindowChild}>
        <SlideMortageWindowChild onClose={closeWindowChild} child={openChild} />
      </DialogWindow>
    </SliderStyle>
  );
};

export default SlideMortage;
