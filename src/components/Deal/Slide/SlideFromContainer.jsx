import React from 'react';
import SlideDealMeta from './SlideDealMeta';
import SlideDealStatus from './SlideDealStatus';
import SlideDealParticipants from './SlideDealParticipants';
import SlideDealInfo from './SlideDealInfo';
import SliderFiles from './SliderFiles';
import { useFormState } from 'react-hook-form';
import { ButtonUI } from 'ui/ButtonUI';
import { SliderFormButtonGroup } from '../../../styles/SliderFormButtonGroup';
import { AnimatePresence } from 'framer-motion';
import { useAsyncValue } from 'react-router-dom';
import SlideDealTitle from './SlideDealTitle';
import SlideDealDeveloper from './SlideDealDeveloper';
import SlideDealSimple from './SlideDealSimple';
import SlideDealFix from './SlideDealFix';

const SlideFromContainer = ({ clearChangeForm }) => {
  const deal = useAsyncValue();
  const { isDirty } = useFormState();
  const getDealTypeComponent = () => {
    switch (deal?.dealType) {
      case 'developer':
        return SlideDealDeveloper;

      default:
        return SlideDealSimple;
    }
  };
  const DealTypeComponent = getDealTypeComponent();
  return (
    <>
      <SlideDealMeta />
      <SlideDealStatus />
      <SlideDealTitle />
      <SlideDealInfo />
      <SlideDealParticipants />
      <DealTypeComponent />
      <SlideDealFix />
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
