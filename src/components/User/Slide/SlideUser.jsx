import React from 'react';
import { useWindowSize } from 'hooks/windowSize';
import { SliderStyle, SliderContext } from '../../../styles/slider';
import SlideUserMeta from './SlideUserMeta';
import SlideClientStory from './SlideClientStory';
import SliderUserContact from './SliderUserContact';
import SliderUserResponsible from './SliderUserResponsible';
import SliderUserAplications from './SliderUserAplications';
import SliderUserCalls from './SliderUserCalls';

const SlideUser = () => {
  const windowSize = useWindowSize();
  return (
    <SliderStyle>
      <SliderContext>
        <SlideUserMeta />
        <SliderUserContact />
        <SliderUserResponsible />
        <SliderUserAplications />
        <SliderUserCalls />
      </SliderContext>
      {windowSize > 768 && <SlideClientStory />}
    </SliderStyle>
  );
};

export default SlideUser;
