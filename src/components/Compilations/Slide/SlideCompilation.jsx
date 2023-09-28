import React from 'react';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import SliderCompilationMeta from './SliderCompilationMeta';
import SliderCompilationLink from './SliderCompilationLink';
import SliderCompilationObjects from './SliderCompilationObjects';
import SliderCompilationResponsible from './SliderCompilationResponsible';

const SlideCompilation = ({ onClose }) => {
  return (
    <SliderStyle>
      <SliderContext>
        <SliderCompilationMeta />
        <SliderCompilationLink />
        <SliderCompilationObjects onClose={onClose} />
        <SliderCompilationResponsible />
      </SliderContext>
    </SliderStyle>
  );
};

export default SlideCompilation;
