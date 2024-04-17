import React, { useState, useRef, useEffect } from 'react';
import SliderStory from 'components/Main/SliderStory/SliderStory';
import { sendHistoryMessage, getHistoryList } from 'api/storyAPI';
import { useAsyncValue } from 'react-router-dom';

const SlideMortageStory = ({ height, fullWidth }) => {
  // const client = useAsyncValue();
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = () => {
    // setLoader(true);
    // getHistoryList(client.UID, 'contact')
    //   .then((data) => {
    //     setHistory(data || []);
    //   })
    //   .finally(() => {
    //     setLoader(false);
    //   });
  };
  const sendMessage = (messageObj) => {
    messageObj.message = messageObj.message.trim();
    if (messageObj.message) {
      sendHistoryMessage('contact', client.UID, messageObj).then((data) => {
        setHistory([...history, data]);
      });
    }
  };
  return (
    <SliderStory
      loader={loader}
      history={history}
      // onChange={sendMessage}
      source='client'
      // sourceId={client.UID}
      fullWidth={fullWidth}
      height={height}
    />
  );
};

export default SlideMortageStory;
