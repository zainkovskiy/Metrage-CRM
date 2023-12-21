import React from 'react';
import { ApplicationBlockStyle } from '../applicationStyle';
import AudioPlayerCard from 'ui/AudioPlayerCard/AudioPlayerCard';
import { SliderTitle } from 'styles/slider';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonUI } from 'ui/ButtonUI';
import { Box } from 'ui/Box';

const AplicationCalls = styled(ApplicationBlockStyle)`
  width: 60vw;
  max-height: 60vh;
  overflow: auto;
`;
const AplicationCallsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
  overflow: auto;
  width: 100%;
`;

const SlideApplicationCalls = ({ onClose }) => {
  const application = useAsyncValue();
  return (
    <AplicationCalls
      $column
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Box fullWidth jc='flex-start'>
        <SliderTitle>Звонки</SliderTitle>
      </Box>
      <AplicationCallsContent>
        {application?.calls &&
          application.calls.length > 0 &&
          application.calls.map((call) => (
            <AudioPlayerCard key={call.UID} call={call} />
          ))}
      </AplicationCallsContent>
      <Box fullWidth jc='flex-start'>
        <ButtonUI onClick={onClose} size='small'>
          Закрыть
        </ButtonUI>
      </Box>
    </AplicationCalls>
  );
};

export default SlideApplicationCalls;
