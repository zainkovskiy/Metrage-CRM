import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleShowChat } from 'store/chatSlice';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import { Box } from 'ui/Box';
import styled from 'styled-components';

const CloseButton = styled(Close)`
  height: 20px;
  width: 20px;
  fill: #fff;
`

const ChatMobileHeader = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleShowChat());
  }
  return (
    <Box jc='flex-end'>
      <CloseButton onClick={handleClose} />
    </Box>
  );
};

export default ChatMobileHeader;