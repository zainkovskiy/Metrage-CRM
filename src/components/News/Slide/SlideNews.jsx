import React from 'react';
import { useWindowSize } from 'hooks/windowSize';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import SlideNewsStory from './SlideNewsStory';
import SlideNewsMeta from './SlideNewsMeta';
import SlideNewsContent from './SlideNewsContent';

const SlideNews = ({ onCloseSlide }) => {
  const windowSize = useWindowSize();
  return (
    <SliderStyle>
      <SliderContext>
        <SlideNewsMeta />
        <SlideNewsContent onCloseSlide={onCloseSlide} />
        {windowSize <= 768 && <SlideNewsStory fullWidth height={500} />}
      </SliderContext>
      {windowSize > 768 && <SlideNewsStory />}
    </SliderStyle>
  );
};

export default SlideNews;
