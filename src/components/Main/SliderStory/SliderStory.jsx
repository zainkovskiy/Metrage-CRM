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
  min-width: 200px;
`
const SliderStory = ({ onChange, history, loader }) => {
  return (
    <SliderStoryStyle>
      <TitleFormStyle ta='center'>История</TitleFormStyle>
      <SlideStoryField history={history} loader={loader}/>
      <InputChatUI onClick={onChange} placeholder='Напишите комментарий' />
    </SliderStoryStyle>
  );
};

export default SliderStory;