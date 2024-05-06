import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

const SlideMortageLoaners = ({ openWindowLoaner, openWindowChild }) => {
  const { loaners } = useAsyncValue();
  const { mortgageCreate } = useSelector((state) => state.user);
  const { watch } = useFormContext();
  watch('loaners');
  const openNewLoaner = () => {
    openWindowLoaner('new');
  };
  return (
    <MortageLoaners>
      <SliderTitle>
        Заемщики/Созаемщики
        {mortgageCreate && (
          <ButtonLink
            size={12}
            color='rgb(133, 0, 158)'
            onClick={openNewLoaner}
          >
            Добавить
          </ButtonLink>
        )}
      </SliderTitle>
      {loaners.map((loaner, idx) => (
        <SlideMortageLoaner
          key={loaner.UID}
          loaner={loaner}
          openWindowLoaner={openWindowLoaner}
          openWindowChild={openWindowChild}
          idx={idx}
        />
      ))}
    </MortageLoaners>
  );
};

export default SlideMortageLoaners;
