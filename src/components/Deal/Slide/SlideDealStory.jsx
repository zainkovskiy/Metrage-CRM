import React, { useEffect, useState } from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';
import { sendHistoryMessage, getHistoryList } from 'api/storyAPI';

const SlideDealStory = ({ UID, fullWidth, height }) => {
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = () => {
    setLoader(true);
    getHistoryList(UID, 'deals')
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
      sendHistoryMessage('deals', UID, newMessage).then((data) => {
        setHistory([...history, data]);
      });
    }
  };
  return (
    <SliderStory
      loader={loader}
      history={history}
      onChange={sendMessage}
      fullWidth={fullWidth}
      height={height}
    />
  );
};

export default SlideDealStory;
