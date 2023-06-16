import { motion } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const FieldMessageStyle = styled(motion.div)`
  border: 1px solid ${({ theme }) => theme.color.primary};
  align-self: ${({ $target }) => $target ? 'flex-start' : 'flex-end'};
  padding: 0.5rem;
  border-radius: 5px;
  background-color: ${({ $target }) => $target ? '#fff' : '#fbe6ff'};;
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.family};
  max-width: 80%;
`

const FieldMessage = ({ message, target, last, firstUpdate, scrollField }) => {
  const messageRef = useRef(null);
  useEffect(() => {
    if (firstUpdate) {
      scrollField();
      return
    }
    if (messageRef?.current && last) {
      messageRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [])
  return (
    <FieldMessageStyle $target={target} ref={messageRef} initial={{ scale: 0 }} animate={{ scale: 1 }}>
      {message.text}
    </FieldMessageStyle>
  );
};

export default FieldMessage;