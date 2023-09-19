import React from 'react';
import { ApplicationBlockStyle } from '../applicationStyle';
import AudioPlayerCard from 'ui/AudioPlayerCard/AudioPlayerCard';
import { SliderTitle } from 'styles/slider';

const SlideApplicationCalls = ({ calls }) => {
  if (!calls || calls.length === 0) {
    return;
  }
  return (
    <ApplicationBlockStyle $column>
      <SliderTitle>Звонки</SliderTitle>
      {calls.map((call) => (
        <AudioPlayerCard key={call.UID} call={call} />
      ))}
    </ApplicationBlockStyle>
  );
};

export default SlideApplicationCalls;
