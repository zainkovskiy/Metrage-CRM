import React, { useEffect, useState } from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';
import { sendHistoryMessage, getHistoryList } from 'api/storyAPI';
import { useAsyncValue } from 'react-router-dom';

const SlideUsersStory = () => {
  const user = useAsyncValue();
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = () => {
    setLoader(true);
    getHistoryList(user.UID, 'users')
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
      sendHistoryMessage('users', user.UID, messageObj).then((data) => {
        setHistory([...history, data]);
      });
    }
  };
  return (
    <SliderStory
      loader={loader}
      history={history}
      onChange={sendMessage}
      source='user'
      sourceId={user.UID}
      // fullWidth={fullWidth}
      // height={height}
    />
  );
};

export default SlideUsersStory;
