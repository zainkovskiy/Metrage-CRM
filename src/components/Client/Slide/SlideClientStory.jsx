import React, { useState, useRef, useEffect } from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';
import { sendHistoryMessage, getHistoryList } from 'api/storyAPI';
import { useAsyncValue } from 'react-router-dom';

const SlideClientStory = () => {
  const client = useAsyncValue();
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = () => {
    setLoader(true);
    getHistoryList(client.UID, 'contact')
      .then((data) => {
        setHistory(data || []);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const sendMessage = (message) => {
    const newMessage = message.trim();
    if (newMessage) {
      sendHistoryMessage('contact', client.UID, newMessage).then((data) => {
        setHistory([...history, data]);
      });
    }
  };
  return (
    <SliderStory
      loader={loader}
      history={history}
      onChange={sendMessage}
      // fullWidth={fullWidth}
      // height={height}
    />
  );
};

export default SlideClientStory;
