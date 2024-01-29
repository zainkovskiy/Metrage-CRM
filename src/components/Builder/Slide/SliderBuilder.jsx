import React, { useState } from 'react';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import SliderInfo from './SliderInfo';
import SliderResedentions from './SliderResedentions';
import SliderAddition from './SliderAddition';
import { useAsyncValue } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const SliderBuilder = () => {
  const builder = useAsyncValue();
  const [isChange, setIsChange] = useState(false);
  const toggleChnage = () => {
    setIsChange(!isChange);
  };
  return (
    <SliderStyle>
      <SliderContext>
        <SliderInfo toggleChnage={toggleChnage} />
        <SliderAddition />
        <AnimatePresence initial={false}>
          {builder.devType === 'МКД' && <SliderResedentions />}
        </AnimatePresence>
      </SliderContext>
    </SliderStyle>
  );
};

export default SliderBuilder;
