import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import SlideStoryItemSkeleton from './SlideStoryItemSkeleton';
import SlideStoryItem from './SlideStoryItem';
import NestedMenu from '../../../ui/NestedMenu';
import { ReactComponent as Pin } from 'images/pin.svg';
import { setIsPinned } from '../../../api/storyAPI';
import { TextSpanStyle } from '../../../styles/styles';

const SlideStoryContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.color.secondary};
  flex-grow: 1;
  border-radius: 5px;
  /* padding: 0.5rem; */
  display: flex;
  flex-direction: column;
  /* gap: 0.5rem; */
  overflow: auto;
  position: relative;
`;
const SlideStoryFieldStyle = styled.div`
  /* background-color: ${({ theme }) => theme.color.secondary}; */
  flex-grow: 1;
  /* border-radius: 5px; */
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  /* position: relative; */
`;
const IconPin = styled(Pin)`
  width: 14px;
  height: 14px;
  fill: ${({ theme }) => theme.color.primary};
`;
const SlidePinnedBlock = styled(motion.div)`
  position: sticky;
  top: 0px;
  background-color: rgb(114 114 114);
  min-height: 80px;
  max-height: 80px;
  z-index: 999;
  border-radius: 5px;
  border-radius: 5px 5px 0 0;
  border-bottom: 1px solid #84019e;
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 0.5rem;
  box-sizing: border-box;
  transform: none;
  display: flex;
  flex-direction: column;
`;
const SlidePinnedField = styled(motion.div)`
  overflow: auto;
`;
const SlidePinnedItem = styled.div`
  padding: 0.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: transparent;
  @media (hover: hover) {
    &:hover {
      background-color: #e2e2e2;
    }
    &:active {
      background-color: transparent;
    }
  }
`;
const TextDots = styled(TextSpanStyle)`
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SlideStoryField = ({
  history,
  loader,
  type,
  changeIsPinned,
  pinnedCount,
}) => {
  const fieldRef = useRef(null);
  const firstUpdate = useRef(true);
  const [selectMessage, setSelectMessage] = useState(null);
  const [eventMessage, setEventMessage] = useState(null);

  const scrollField = () => {
    if (fieldRef.current) {
      fieldRef.current.scrollTop = fieldRef.current.scrollHeight;
      firstUpdate.current = false;
    }
  };
  const isCheckedOpen = (e) => {
    const curUID = e.target.offsetParent.id;
    if (curUID) {
      const foundMessage = history.find(
        (message) => message.UID.toString() === curUID
      );
      if (foundMessage) {
        e.target.offsetParent.style.background = '#ccc';
        setSelectMessage(foundMessage);
        cleareBack();
        setEventMessage(e);
        return true;
      }
      setSelectMessage(null);
      return false;
    }
    setSelectMessage(null);
    return false;
  };
  const handlerClose = (isClose) => {
    if (isClose) {
      return;
    }
    cleareBack();
  };
  const cleareBack = () => {
    if (eventMessage) {
      eventMessage.target.offsetParent.style.background = '';
      setEventMessage(null);
    }
  };
  const setNewIsPinned = () => {
    setIsPinned({
      UID: selectMessage.UID,
      position: !selectMessage.isPinned,
      type: type,
    });
    changeIsPinned(selectMessage);
    setSelectMessage(null);
  };
  const getMessage = (story) => {
    const details = story?.details[0];
    if (details?.type === 'message') {
      return (
        <TextDots nowrap size={12}>
          {details?.new}
        </TextDots>
      );
    }
    return (
      <TextDots nowrap size={12} color='#8d8d8d'>
        <em>{details?.title}</em>
      </TextDots>
    );
  };
  const scrollToMessage = (UID) => {
    const messageElem = document.getElementById(`${UID}`);
    if (!messageElem) return;
    const messagePosition = messageElem.getBoundingClientRect().top;
    const fieldClientHeight = fieldRef.current.clientHeight;
    if (messagePosition < 0 || messagePosition > fieldClientHeight) {
      const handler = () => {
        blinkElem(messageElem);
      };
      fieldRef.current.addEventListener('scrollend', handler, false);
      messageElem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      setTimeout(() => {
        fieldRef.current.removeEventListener('scrollend', handler, false);
      }, 1000);
      return;
    }
    blinkElem(messageElem);
  };
  const blinkElem = (elem) => {
    elem.style.background = '#e0bfe6';
    setTimeout(() => {
      elem.style.background = '';
    }, 1000);
  };
  //TODO: вынести закреп в отджельный компонент
  return (
    <SlideStoryContainer>
      <AnimatePresence>
        {pinnedCount > 0 && (
          <SlidePinnedBlock
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <TextSpanStyle size={12} color='rgb(132 1 158)' bold>
              Закрепленные сообщения
            </TextSpanStyle>
            <SlidePinnedField>
              {history.map((story, idx) => {
                if (story.isPinned) {
                  return (
                    <SlidePinnedItem
                      key={story.UID}
                      onClick={() => scrollToMessage(story.UID)}
                    >
                      {getMessage(story)}
                    </SlidePinnedItem>
                  );
                }
              })}
            </SlidePinnedField>
          </SlidePinnedBlock>
        )}
      </AnimatePresence>
      <SlideStoryFieldStyle ref={fieldRef}>
        <NestedMenu
          items={(close) => [
            {
              key: 'pin',
              text: selectMessage?.isPinned ? 'Открепить' : 'Закрепить',
              icon: <IconPin />,
              onClick: (e) => {
                close();
                setNewIsPinned();
              },
            },
          ]}
          isCheckedOpen={isCheckedOpen}
          handlerClose={handlerClose}
        >
          <AnimatePresence>
            {loader ? (
              <SlideStoryItemSkeleton />
            ) : (
              <>
                {history.map((story, idx) => {
                  return (
                    <SlideStoryItem
                      key={story.UID}
                      story={story}
                      last={idx === history?.length - 1}
                      scrollField={scrollField}
                      firstUpdate={firstUpdate.current}
                    />
                  );
                })}
              </>
            )}
          </AnimatePresence>
        </NestedMenu>
      </SlideStoryFieldStyle>
    </SlideStoryContainer>
  );
};

export default SlideStoryField;
