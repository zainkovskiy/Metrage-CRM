import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { ButtonLink } from 'ui/ButtonLink';
import SlideMortageLoaner from './SlideMortageLoaner';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

const MortageLoaners = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SlideMortageLoaners = () => {
  const { loaners } = useAsyncValue();
  const { watch } = useFormContext();
  watch('loaners');
  return (
    <MortageLoaners>
      <SliderTitle>
        Заемщики/Созаемщики
        <ButtonLink size={12} color='rgb(133, 0, 158)'>
          Добавить
        </ButtonLink>
      </SliderTitle>
      {loaners.map((loaner) => (
        <SlideMortageLoaner key={loaner.UID} loaner={loaner} />
      ))}
    </MortageLoaners>
  );
};

export default SlideMortageLoaners;