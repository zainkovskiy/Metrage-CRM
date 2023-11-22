import React, { useEffect, useState } from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';
import { sendHistoryMessage, getHistoryList } from 'api/storyAPI';
import { useAsyncValue } from 'react-router-dom';

const SlideTaskStory = () => {
  const task = useAsyncValue();
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = () => {
    setLoader(true);
    getHistoryList(task.UID, 'tasks')
      .then((data) => {
        setHistory(data || []);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const sendMessage = (messamessageObje) => {
    messageObj.message = messageObj.message.trim();
    if (messageObj.message) {
      sendHistoryMessage('tasks', task.UID, messageObj).then((data) => {
        setHistory([...history, data]);
      });
    }
  };
  return (
    <SliderStory
      loader={loader}
      history={history}
      onChange={sendMessage}
      fullWidth
      height={300}
      source='task'
      sourceId={task.UID}
    />
  );
};

export default SlideTaskStory;
