import React, { useEffect, useRef, useState } from 'react';
import { sendHistoryMessage, getHistoryList } from 'api/storyAPI';
import { useAsyncValue, useLocation } from 'react-router-dom';
import SliderStory from 'components/Main/SliderStory/SliderStory';

const SlideApplicationStory = ({ UID, fullWidth, height }) => {
  const application = useAsyncValue();
  const locationRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (!locationRef.current) {
      locationRef.current = location;
      return;
    }
    if (locationRef?.current?.key === location?.current?.key) {
      return;
    }
    getHistory();
  }, [location]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = () => {
    setLoader(true);
    getHistoryList(UID, 'demands')
      .then((data) => {
        setHistory(data || []);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const sendMessage = (messageObj) => {
    if (messageObj.message) {
      sendHistoryMessage('demands', UID, messageObj).then((data) => {
        setHistory([...history, data]);
      });
    }
  };
  return (
    <SliderStory
      history={history}
      loader={loader}
      onChange={sendMessage}
      fullWidth={fullWidth}
      height={height}
      source='application'
      sourceId={application.UID}
    />
  );
};

export default SlideApplicationStory;
