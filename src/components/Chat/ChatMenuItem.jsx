import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';

const ChatMenuItemStyle = styled(TextSpanStyle)`
  padding: 0.5rem;
  cursor: pointer;
  white-space: nowrap;
  ${({$color}) => $color && `color: ${$color};`}
  &:hover{
    background-color: ${({ theme }) => theme.color.secondary};
  }
`
const ChatMenuItem = (props) => {
  const { children, onClick, toggleIsShow, color } = props;
  const handleClick = () => {
    onClick();
    toggleIsShow();
  }
  return (
    <ChatMenuItemStyle onClick={handleClick} $color={color}>{children}</ChatMenuItemStyle>
  );
};

export default ChatMenuItem;