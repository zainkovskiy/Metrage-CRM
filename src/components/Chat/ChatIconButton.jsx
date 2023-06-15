import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ChatIconButtonStyle = styled.div`
  cursor: pointer;
  &:hover > svg{
    fill: ${({ theme }) => theme.color.primary};
  }
  & > svg {
    pointer-events: none;
    stroke: ${({ theme }) => theme.color.primary};
    fill: ${({ $select, theme }) => $select && theme.color.primary};
    width: 20px;
    height: 20px;
    transition: fill .3s;
  }
`
const ChatIconButton = ({ onClick, id, children }) => {
  const selectButton = useSelector((state) => state.chat.selectButton);
  return (
    <ChatIconButtonStyle onClick={onClick} id={id} $select={selectButton === id}>
      {children}
    </ChatIconButtonStyle>
  );
};

export default ChatIconButton; 