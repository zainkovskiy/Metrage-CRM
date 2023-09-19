import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import {
  ApplicationBlockStyle,
  ApplicationSlideSide,
} from '../applicationStyle';
import { SliderTitle } from 'styles/slider';

const ApplicationSlideAgentInfoStyle = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

const SlideApplicationAgentInfo = ({ responsible, recommender, children }) => {
  return (
    <ApplicationBlockStyle>
      <ApplicationSlideAgentInfoStyle>
        <ApplicationSlideSide>
          <SliderTitle>Агент:</SliderTitle>
          <div>
            <TextSpanStyle size={16}>{responsible?.title}</TextSpanStyle>
            <TextSpanStyle size={12} color='#ccc'>
              {responsible?.officeName}
            </TextSpanStyle>
          </div>
          {children}
        </ApplicationSlideSide>
        <ApplicationSlideSide>
          <SliderTitle>Рекомендатель:</SliderTitle>
          <div>
            <TextSpanStyle size={16}>{recommender?.title}</TextSpanStyle>
            <TextSpanStyle size={12} color='#ccc'>
              {recommender?.officeName}
            </TextSpanStyle>
          </div>
        </ApplicationSlideSide>
      </ApplicationSlideAgentInfoStyle>
    </ApplicationBlockStyle>
  );
};

export default SlideApplicationAgentInfo;
