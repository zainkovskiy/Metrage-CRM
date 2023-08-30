import React from 'react';
import { useWindowSize } from 'hooks/windowSize';
import SlideClientMeta from './SlideClientMeta';
import { SliderStyle, SliderContext } from '../../../styles/slider';
import SlideClientStory from './SlideClientStory';
import SliderClientContact from './SliderClientContact';
import SliderClientResponsible from './SliderClientResponsible';
import SliderClientAplications from './SliderClientAplications';
import SliderClientCalls from './SliderClientCalls';

const SlideClient = () => {
  const windowSize = useWindowSize();
  return (
    <SliderStyle>
      <SliderContext>
        <SlideClientMeta />
        <SliderClientContact />
        <SliderClientResponsible />
        <SliderClientAplications />
        <SliderClientCalls />
      </SliderContext>
      {windowSize > 768 && <SlideClientStory />}
    </SliderStyle>
  );
};

export default SlideClient;
