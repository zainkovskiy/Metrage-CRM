import { motion } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { device } from 'styles/device';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';

const MessageItemStyle = styled(motion.div)`
  border: 1px solid ${({ theme }) => theme.color.primary};
  align-self: ${({ $target }) => ($target ? 'flex-start' : 'flex-end')};
  padding: 0.5rem;
  border-radius: 5px;
  /* background-color: ${({ $target }) => ($target ? '#fff' : '#fbe6ff')}; */
  background-color: ${({ $color }) => ($color ? $color : '#fff')};
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.family};
  max-width: 80%;
  @media ${device.tablet} {
    padding: 0.2rem;
  }
`;

const MessageItem = ({ message, target, last, firstUpdate, scrollField }) => {
  const messageRef = useRef(null);
  useEffect(() => {
    if (firstUpdate && last) {
      scrollField();
      return;
    }
    if (messageRef?.current && last) {
      messageRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, []);
  return (
    <MessageItemStyle
      // $target={target}
      ref={messageRef}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      $color={message?.color}
    >
      {message.text}
      <TextSpanStyle color='#aaa' size={8} align={target ? 'start' : 'end'}>
        {useDateFormat(message.created, 'DD.MM.YYYY HH:mm')}
      </TextSpanStyle>
    </MessageItemStyle>
  );
};

export default MessageItem;
