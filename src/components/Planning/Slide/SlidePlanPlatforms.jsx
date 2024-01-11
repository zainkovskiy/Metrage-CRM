import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';
import SlidePlanPlatform from './SlidePlanPlatform';
import { TextSpanStyle } from 'styles/styles';

const SlidePlanPlatforms = () => {
  const plan = useAsyncValue();
  return (
    <SliderBlock>
      {plan?.advertising?.length > 0 ? (
        plan.advertising.map((platform) => (
          <SlidePlanPlatform platform={platform} key={platform.platformName} />
        ))
      ) : (
        <TextSpanStyle>нет данных по площадкам</TextSpanStyle>
      )}
    </SliderBlock>
  );
};

export default SlidePlanPlatforms;
