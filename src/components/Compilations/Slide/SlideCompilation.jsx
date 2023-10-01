import React from 'react';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import SliderCompilationMeta from './SliderCompilationMeta';
import SliderCompilationLink from './SliderCompilationLink';
import SliderCompilationObjects from './SliderCompilationObjects';
import SliderCompilationResponsible from './SliderCompilationResponsible';
import SliderCompilationDescription from './SliderCompilationDescription';

const SlideCompilation = ({ onClose }) => {
  return (
    <SliderStyle>
      <SliderContext>
        <SliderCompilationMeta />
        <SliderCompilationLink />
        <SliderCompilationObjects onClose={onClose} />
        <SliderCompilationDescription />
        <SliderCompilationResponsible />
      </SliderContext>
    </SliderStyle>
  );
};

export default SlideCompilation;
