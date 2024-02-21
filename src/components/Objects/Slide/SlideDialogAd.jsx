import React, { useState } from 'react';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { useAsyncValue } from 'react-router-dom';
import {
  setAdAccepted,
  setAdDeclined,
  getPublication,
  setPublication,
} from '../../../api/objectAPI';

import closeUrl from 'images/close.svg';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import SlideDialogAdPlatform from './SlideDialogAdPlatform';
import { AnimatePresence, motion } from 'framer-motion';

const SlideDialogAdStyle = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 5px;
  width: 300px;
  height: 60vh;
  position: relative;
`;
const CloseButton = styled.img`
  width: 18px;
  height: 18px;
  opacity: 0.5;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;
const AddButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  padding: 0.5rem;
  box-sizing: border-box;
  background-color: #dcdcdc;
`;
const PlatformContainer = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.5rem;
  box-sizing: border-box;
  position: relative;
`;
const SliderHeader = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  border-bottom: 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;
const SliderFooter = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  border-top: 1px solid;
  display: flex;
  gap: 0.5rem;
`;
const ErrorContainer = styled(motion.div)`
  padding: 0.5rem;
  box-sizing: border-box;
  background-color: #dcdcdc;
`;
const SlideDialogAd = ({ onClose }) => {
  const [error, setError] = useState(null);
  const object = useAsyncValue();
  const method = useForm({
    defaultValues: async () =>
      await getPublication({
        UID: object?.UID,
        type: object?.subTypeEstate,
      }),
  });
  const onSubmit = (data) => {
    setPublication(data).then((res) => {
      if (res?.result === 'error') {
        setError(res?.message);
        return;
      }
      onClose();
    });
  };
  const handelAccept = () => {
    setAdAccepted(method.getValues()).then((res) => {
      if (res?.result === 'error') {
        setError(res?.message);
        return;
      }
      onClose();
    });
  };
  const handelDeclined = () => {
    setAdDeclined(method.getValues()).then((res) => {
      if (res?.result === 'error') {
        setError(res?.message);
        return;
      }
      onClose();
    });
  };
  return (
    <FormProvider {...method}>
      <SlideDialogAdStyle
        onClick={(e) => e.stopPropagation()}
        onSubmit={method.handleSubmit(onSubmit)}
      >
        <SliderHeader>
          <TextSpanStyle bold>Реклама</TextSpanStyle>
          <CloseButton src={closeUrl} onClick={onClose} />
        </SliderHeader>
        {!method.formState.isLoading && (
          <>
            <AddButtonContainer>
              {method.getValues('agreemend.isVisible') && (
                <Box fullWidth>
                  <ButtonUI
                    fullWidth
                    size='small'
                    color='accept'
                    disabled={
                      !method.getValues('rights.approver') || Boolean(error)
                    }
                    onClick={handelAccept}
                  >
                    {method.getValues('agreemend.agreeTitle')}
                  </ButtonUI>
                  <ButtonUI
                    fullWidth
                    size='small'
                    color='error'
                    disabled={
                      !method.getValues('rights.approver') || Boolean(error)
                    }
                    onClick={handelDeclined}
                  >
                    Отказать
                  </ButtonUI>
                </Box>
              )}
              <TextSpanStyle size={12}>
                {method.getValues('agreemend.agreeSubTitle')}
              </TextSpanStyle>
            </AddButtonContainer>
            <PlatformContainer>
              {method.getValues('platforms').map((platform, idx) => (
                <SlideDialogAdPlatform
                  key={platform.platform}
                  platform={platform}
                  idx={idx}
                />
              ))}
            </PlatformContainer>
            <AnimatePresence>
              {Boolean(error) && (
                <ErrorContainer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <TextSpanStyle size={12} color='red'>
                    {error}
                  </TextSpanStyle>
                </ErrorContainer>
              )}
            </AnimatePresence>
            <SliderFooter>
              <ButtonUI size='small' onClick={onClose} variant='outline'>
                Отменить
              </ButtonUI>
              <ButtonUI size='small' type='submit' disabled={Boolean(error)}>
                Сохранить
              </ButtonUI>
            </SliderFooter>
          </>
        )}
      </SlideDialogAdStyle>
    </FormProvider>
  );
};

export default SlideDialogAd;
