import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TitleFormStyle } from 'styles/styles';
import TaskSlideStoryField from './TaskSlideStoryField';
import { InputChatUI } from 'ui/InputChatUI/InputChatUI';
import { sendHistoryMessage } from 'api/storyAPI';
import { getApplicationHistory } from 'api/application';
import { useLocation } from 'react-router-dom';

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
  const locationRef = useRef(null);
  const [history, setHistory] = useState([]);
  const location = useLocation();
  useEffect(() => {
    if(!locationRef.current){
      locationRef.current = location;
      return;
    }
    if(locationRef?.current?.key === location?.current?.key){
      return
    }
    getHistoryList();
  }, [location])
  
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
      <InputChatUI onClick={sendMessage} placeholder='Напишите комментарий' />
    </TaskSlideStoryStyle>
  );
};

export default TaskSlideStory;
