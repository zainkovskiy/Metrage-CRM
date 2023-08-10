import React from 'react';
import styled from 'styled-components';
import { TitleFormStyle } from 'styles/styles';
import { InputChatUI } from 'ui/InputChatUI/InputChatUI';
import SlideStoryField from './SlideStoryField';

const SliderStoryStyle = styled.div`
  background-color: #fff;
  border-radius: 5px;
  width: 25%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ${({$fullWidth}) => $fullWidth ? 'width: 100%;' : 'min-width: 200px;'};
  ${({$height}) => $height && `height: ${$height}px;`};
  box-sizing: border-box;
`
const SliderStory = ({ onChange, history, loader, fullWidth, height }) => {
  return (
    <SliderStoryStyle $fullWidth={fullWidth} $height={height}>
      <TitleFormStyle ta='center'>История</TitleFormStyle>
      <SlideStoryField history={history} loader={loader}/>
      <InputChatUI onClick={onChange} placeholder='Напишите комментарий' />
    </SliderStoryStyle>
  );
};

export default SliderStory;