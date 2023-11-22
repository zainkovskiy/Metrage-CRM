import React, { useEffect, useState } from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';
import { sendHistoryMessage, getHistoryList } from 'api/storyAPI';
import { useAsyncValue } from 'react-router-dom';

const SlideDealStory = () => {
  const deal = useAsyncValue();
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = () => {
    setLoader(true);
    getHistoryList(deal.UID, 'deal')
      .then((data) => {
        setHistory(data || []);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const sendMessage = (messageObj) => {
    messageObj.message = messageObj.message.trim();
    if (messageObj.message) {
      sendHistoryMessage('deal', deal.UID, messageObj).then((data) => {
        setHistory([...history, data]);
      });
    }
  };
  return (
    <SliderStory
      loader={loader}
      history={history}
      onChange={sendMessage}
      source='deal'
      sourceId={deal.UID}
    />
  );
};

export default SlideDealStory;
