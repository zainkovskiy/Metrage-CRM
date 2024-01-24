import React from 'react';
import { SliderBlock } from '../../../styles/slider';
import { useAsyncValue } from 'react-router-dom';
import SliderResedentionItem from './SliderResedentionItem';
import styled from 'styled-components';

const Resedentions = styled(SliderBlock)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 0.5rem;
`;

const SliderResedentions = () => {
  const builder = useAsyncValue();
  if (!builder?.JK || builder?.JK?.lenght === 0) {
    return;
  }
  return (
    <Resedentions>
      {builder.JK.map((jk) => (
        <SliderResedentionItem key={jk.UID} resedention={jk} />
      ))}
    </Resedentions>
  );
};

export default SliderResedentions;
