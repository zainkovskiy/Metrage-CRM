import React, { useState } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import styled from 'styled-components';
import SlideUserMain from './SlideUserMain';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { SliderFormButtonGroup } from '../../../styles/SliderFormButtonGroup';
import SlideUserAddition from './SlideUserAddition';
import { setNewUserValue } from '../../../api/usersApi';
import { AnimatePresence } from 'framer-motion';
import SlideUserSpeciality from './SlideUserSpeciality';

const SlideFormContainerStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SlideFormContainer = () => {
  const [changeIsFire, setChangeIsFire] = useState(false);
  const { handleSubmit, reset } = useFormContext();
  const { isDirty } = useFormState();
  const onSubmit = (data) => {
    setNewUserValue(data);
    reset(data);
  };
  const toggleChangeIsFire = () => {
    setChangeIsFire(!changeIsFire);
  };
  return (
    <SlideFormContainerStyle onSubmit={handleSubmit(onSubmit)}>
      <SlideUserMain />
      <SlideUserSpeciality />
      <SlideUserAddition toggleChangeIsFire={toggleChangeIsFire} />
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
