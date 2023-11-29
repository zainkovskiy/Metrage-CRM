import React, { useState } from 'react';
import SlideDealMeta from './SlideDealMeta';
import SlideDealStatus from './SlideDealStatus';
import SlideDealParticipants from './SlideDealParticipants';
import SlideDealSide from './SlideDealSide';
import SlideDealInfo from './SlideDealInfo';
import SlidePreliminaryAgreement from './SlidePreliminaryAgreement';
import SliderFiles from './SliderFiles';
import { useFormState } from 'react-hook-form';
import { ButtonUI } from 'ui/ButtonUI';
import { SliderFormButtonGroup } from '../../../styles/SliderFormButtonGroup';
import { AnimatePresence } from 'framer-motion';
import { useAsyncValue } from 'react-router-dom';

const SlideFromContainer = ({ clearChangeForm }) => {
  const deal = useAsyncValue();
  const [isDisgraced, setIsDisgraced] = useState(
    deal?.dealStatusId >= 5 || false
  );
  const { isDirty } = useFormState();
  const handlerIsDisgraced = (status) => {
    if (status !== 5) {
      setIsDisgraced(false);
      return;
    }
    setIsDisgraced(true);
  };
  return (
    <>
      <SlideDealMeta />
      <SlideDealStatus
        status={deal?.dealStatusId}
        UID={deal.UID}
        handlerIsDisgraced={handlerIsDisgraced}
      />
      <SlideDealInfo isDisgraced={isDisgraced} />
      <SlidePreliminaryAgreement />
      <SlideDealParticipants />
      <SlideDealSide />
      <SliderFiles />
      <AnimatePresence>
        {isDirty && (
          <SliderFormButtonGroup>
            <ButtonUI type='submit'>Сохранить</ButtonUI>
            <ButtonUI variant='outline' onClick={clearChangeForm}>
              Отменить
            </ButtonUI>
          </SliderFormButtonGroup>
        )}
      </AnimatePresence>
    </>
  );
};

export default SlideFromContainer;
