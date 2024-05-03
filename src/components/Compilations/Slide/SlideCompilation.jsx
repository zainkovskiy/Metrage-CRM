import React from 'react';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import SliderCompilationMeta from './SliderCompilationMeta';
import SliderCompilationLink from './SliderCompilationLink';
import SliderCompilationObjects from './SliderCompilationObjects';
import SliderCompilationResponsible from './SliderCompilationResponsible';
import SliderCompilationDescription from './SliderCompilationDescription';
import { useAsyncValue } from 'react-router-dom';
import SlideCompilationDemads from './SlideCompilationDemads';

const SlideCompilation = ({ onClose }) => {
  const compilation = useAsyncValue();
  return (
    <SliderStyle>
      <SliderContext>
        <SliderCompilationMeta />
        <SliderCompilationLink />
        <SliderCompilationObjects onClose={onClose} />
        <SliderCompilationDescription />
        <SliderCompilationResponsible />
        {compilation?.demandId?.length > 0 && <SlideCompilationDemads />}
      </SliderContext>
    </SliderStyle>
  );
};

export default SlideCompilation;
