import React from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import AudioPlayerCard from 'ui/AudioPlayerCard/AudioPlayerCard';
import styled from 'styled-components';

const Calls = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  max-height: 300px;
  gap: 0.5rem;
`;
const SliderUserCallsStyle = styled(SliderBlock)`
  flex-grow: 1;
`;

const SliderUserCalls = () => {
  return (
    <SliderUserCallsStyle>
      <Box column>
        <SliderTitle>Звонки</SliderTitle>
        <Calls>
          <AudioPlayerCard />
          <AudioPlayerCard />
          <AudioPlayerCard />
          <AudioPlayerCard />
          <AudioPlayerCard />
        </Calls>
      </Box>
    </SliderUserCallsStyle>
  );
};

export default SliderUserCalls;
