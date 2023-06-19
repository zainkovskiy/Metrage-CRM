import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat'; 

const NotificationItemStyle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  &:last-child{
    border-bottom: none;
  }
`
const NotificationItem = ({ notice }) => {
  return (
    <NotificationItemStyle>
      <TextSpanStyle color='#a5a5a5' size={10}>{useDateFormat(notice?.created)}</TextSpanStyle>
      <TextSpanStyle>{notice?.content}</TextSpanStyle>
    </NotificationItemStyle>
  );
};

export default NotificationItem;