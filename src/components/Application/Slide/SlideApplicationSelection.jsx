import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import styled from 'styled-components';
import ApplicationSelectionItem from './ApplicationSelectionItem';

const ApplicationSelection = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SlideApplicationSelection = () => {
  const application = useAsyncValue();
  return (
    <ApplicationSelection>
      <SliderTitle>Подборки</SliderTitle>
      {application.selections.map((selection) => (
        <ApplicationSelectionItem key={selection.UID} selection={selection} />
      ))}
    </ApplicationSelection>
  );
};

export default SlideApplicationSelection;
