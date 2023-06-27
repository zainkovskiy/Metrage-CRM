import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TitleFormStyle } from 'styles/styles';
import TaskSlideStoryField from './TaskSlideStoryField';
import { InputChatUI } from 'ui/InputChatUI/InputChatUI';
import { sendHistoryMessage } from 'api/storyAPI';
import { getApplicationHistory } from 'api/application';

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
const TaskSlideStory = ({ UID }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistoryList();
  }, [])

  const getHistoryList = () => {
    getApplicationHistory(UID).then((data) => {
      setHistory(data || [])
    })
  }

  const sendMessage = (message) => {
    const newMessage = message.trim();
    if (newMessage) {
      sendHistoryMessage('demands', UID, newMessage).then((data) => {
        setHistory([...history, data]);
      })
    };
  }
  return (
    <TaskSlideStoryStyle>
      <TitleFormStyle ta='center'>История</TitleFormStyle>
      <TaskSlideStoryField history={history} />
      <InputChatUI onClick={sendMessage} />
    </TaskSlideStoryStyle>
  );
};

export default TaskSlideStory;
