import React, { useEffect, useState } from 'react';
import { getHistoryList, sendHistoryMessage } from 'api/storyAPI';
import SliderStory from 'components/Main/SliderStory/SliderStory';

const SlideObjectStory = ({ id, type, fullWidth, height }) => {
  const [history, setHistory] = useState();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getHistory();
  }, [])
  const getHistory = () => {
    getHistoryList(id, type === 'live' ? 'LivingObjects' : 'BusinessObjects').then((data) => {
      setHistory(data || [])
    }).finally(() => {
      setLoader(false);
    })
  }
  const sendMessage = (message) => {
    const newMessage = message.trim();
    if (newMessage) {
      sendHistoryMessage(type === 'live' ? 'LivingObjects' : 'BusinessObjects', id, newMessage).then((data) => {
        setHistory([...history, data]);
      })
    };
  }
  return (
    <SliderStory loader={loader} history={history} onChange={sendMessage} fullWidth={fullWidth} height={height}/>
  );
};

export default SlideObjectStory;