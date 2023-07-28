import React from 'react';
import styled from 'styled-components';
import { TitleFormStyle } from 'styles/styles';
import { InputChatUI } from 'ui/InputChatUI/InputChatUI';

const SlideObjectStoryStyle = styled.div`
  background-color: #fff;
  border-radius: 5px;
  width: 25%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
`
const SlideObjectStoryFieldStyle = styled.div`
  background-color: ${({ theme }) => theme.color.secondary};
  flex-grow: 1;
  border-radius: 5px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
`

const SlideObjectStory = () => {
  return (
    <SlideObjectStoryStyle>
      <TitleFormStyle ta='center'>История</TitleFormStyle>
      <SlideObjectStoryFieldStyle/>
      <InputChatUI onClick={(value) => console.log(value)} placeholder='Напишите комментарий' />
    </SlideObjectStoryStyle>
  );
};

export default SlideObjectStory;