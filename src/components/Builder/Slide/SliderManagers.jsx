import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';

const SliderManagersStyle = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SliderManagers = () => {
  const builder = useAsyncValue();
  return (
    <SliderManagersStyle>
      <SliderTitle>Менеджеры</SliderTitle>
      <Box>
        <Box fullWidth column ai='flex-start' jc='flex-start'>
          {builder?.managers?.length > 0 &&
            builder.managers.map((manager, idx) => (
              <Box key={manager.UID + idx} jc='flex-start'>
                <TextSpanStyle>{manager.name}</TextSpanStyle>
                <TextSpanStyle>{manager.phone}</TextSpanStyle>
              </Box>
            ))}
        </Box>
        <Box fullWidth column ai='flex-start' jc='flex-start'>
          <TextSpanStyle>booking : {builder?.booking}%</TextSpanStyle>
          <TextSpanStyle>notificationи: {builder?.notification}%</TextSpanStyle>
        </Box>
      </Box>
    </SliderManagersStyle>
  );
};

export default SliderManagers;
