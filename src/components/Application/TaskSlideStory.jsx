import React from 'react';
import styled from 'styled-components';
import { TitleFormStyle } from 'styles/styles';
import TaskSlideStoryField from './TaskSlideStoryField';
import { InputChatUI } from 'ui/InputChatUI/InputChatUI';
import { useDispatch, useSelector } from 'react-redux';
import { sendTaskMessage } from 'store/taskSlice';

const TaskSlideStoryStyle = styled.div`
  background-color: #fff;
  border-radius: 5px;
  width: 25%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
`
const TaskSlideStory = () => {
  const dispatch = useDispatch();
  const openTask = useSelector((state) => state.task.openTask);

  const sendMessage = (message) => {
    const newMessage = message.trim();
    if (newMessage) {
      dispatch(sendTaskMessage({ uid: openTask.UID, message: newMessage }));
    };
  }
  return (
    <TaskSlideStoryStyle>
      <TitleFormStyle ta='center'>История</TitleFormStyle>
      <TaskSlideStoryField />
      <InputChatUI onClick={sendMessage} />
    </TaskSlideStoryStyle>
  );
};

export default TaskSlideStory;