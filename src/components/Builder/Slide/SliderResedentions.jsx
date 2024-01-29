import React from 'react';
import { SliderBlock } from '../../../styles/slider';
import { useAsyncValue } from 'react-router-dom';
import SliderResedentionItem from './SliderResedentionItem';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Resedentions = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
`;

const SliderResedentions = () => {
  const builder = useAsyncValue();
  if (!builder?.JK || builder?.JK?.lenght === 0) {
    return;
  }
  return (
    <Resedentions
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      exit={{ scale: 0 }}
    >
      {builder.JK.map((jk) => (
        <SliderResedentionItem key={jk.UID} resedention={jk} />
      ))}
    </Resedentions>
  );
};

export default SliderResedentions;
