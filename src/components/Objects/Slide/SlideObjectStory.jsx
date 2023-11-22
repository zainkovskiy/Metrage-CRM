import React, { useEffect, useState } from 'react';
import { getHistoryList, sendHistoryMessage } from 'api/storyAPI';
import SliderStory from 'components/Main/SliderStory/SliderStory';
import { useAsyncValue } from 'react-router-dom';

const SlideObjectStory = ({ id, type, fullWidth, height }) => {
  const object = useAsyncValue();
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = () => {
    getHistoryList(id, type === 'live' ? 'LivingObjects' : 'BusinessObjects')
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
      sendHistoryMessage(
        type === 'live' ? 'LivingObjects' : 'BusinessObjects',
        id,
        messageObj
      ).then((data) => {
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
      source='object'
      sourceId={object.UID}
    />
  );
};

export default SlideObjectStory;
