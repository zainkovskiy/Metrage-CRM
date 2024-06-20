import React, { useEffect, useState } from 'react';
import {
  getHistoryList,
  getHistoryList2,
  sendHistoryMessage,
} from 'api/storyAPI';
import styled from 'styled-components';
import { TitleFormStyle } from 'styles/styles';
import { InputChatUI } from 'ui/InputChatUI/InputChatUI';
import SlideStoryField from './SlideStoryField';
import { useSelector } from 'react-redux';

const SliderStoryStyle = styled.div`
  background-color: #fff;
  border-radius: 5px;
  width: 25%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  ${({ $fullWidth }) => ($fullWidth ? 'width: 100%;' : 'min-width: 250px;')};
  ${({ $height }) =>
    $height && `height: ${$height}px; min-height: ${$height}px`};
  box-sizing: border-box;
`;
const SliderStory = ({ fullWidth, height, type, source, sourceId }) => {
  const [history, setHistory] = useState([]);
  const [pinnedCount, setPinnedCount] = useState(0);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = () => {
    getHistoryList2(sourceId, type)
      .then((data) => {
        setHistory(data?.items || []);
        setPinnedCount(data?.pinnedCount || 0);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const userId = useSelector((state) => state.user.UID);
  const raw = {
    entityId: sourceId,
    entityType: `${source}Files`,
    author: userId,
  };
  const sendMessage = (messageObj) => {
    messageObj.message = messageObj.message.trim();
    if (messageObj.message) {
      sendHistoryMessage(type, sourceId, messageObj).then((data) => {
        setHistory([...history, data]);
      });
    }
  };
  const changeIsPinned = (message) => {
    setHistory((prevState) =>
      prevState.map((item) => {
        if (item.UID === message.UID) {
          return { ...item, isPinned: !message.isPinned };
        }
        return item;
      })
    );

    if (!message.isPinned) {
      setPinnedCount((prevState) => prevState + 1);
      return;
    }
    setPinnedCount((prevState) => prevState - 1);
  };
  return (
    <SliderStoryStyle $fullWidth={fullWidth} $height={height}>
      <TitleFormStyle ta='center'>История</TitleFormStyle>
      <SlideStoryField
        history={history}
        loader={loader}
        type={type}
        changeIsPinned={changeIsPinned}
        pinnedCount={pinnedCount}
      />
      <InputChatUI onClick={sendMessage} placeholder='Комментарий' raw={raw} />
    </SliderStoryStyle>
  );
};

export default SliderStory;
