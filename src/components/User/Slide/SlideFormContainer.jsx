import React from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import styled from 'styled-components';
import SlideUserMain from './SlideUserMain';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { SliderFormButtonGroup } from '../../../styles/SliderFormButtonGroup';
import SlideUserAddition from './SlideUserAddition';
import { setNewUserValue } from '../../../api/usersApi';
import { AnimatePresence } from 'framer-motion';

const SlideFormContainerStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SlideFormContainer = () => {
  const { handleSubmit, reset } = useFormContext();
  const { isDirty } = useFormState();
  const onSubmit = (data) => {
    setNewUserValue(data);
    reset(data);
  };
  return (
    <SlideFormContainerStyle onSubmit={handleSubmit(onSubmit)}>
      <SlideUserMain />
      <SlideUserAddition />
      <AnimatePresence>
        {isDirty && (
          <SliderFormButtonGroup>
            <TextSpanStyle>Сохранить изменения?</TextSpanStyle>
            <ButtonUI type='submit' size='small'>
              Сохранить
            </ButtonUI>
          </SliderFormButtonGroup>
        )}
      </AnimatePresence>
    </SlideFormContainerStyle>
  );
};

export default SlideFormContainer;
