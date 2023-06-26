import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'ui/Box';
import ChatMenu from './ChatMenu';
import ChatMenuItem from './ChatMenuItem';
import NotificationItem from './NotificationItem';
import { TextSpanStyle } from 'styles/styles';
import { setReadAllNotice } from 'store/chatSlice';

const FieldNotificationHeaderStyle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};  
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`
const Field = styled.div`
  overflow: auto;
  flex-grow: 1;
  margin-bottom: 5px;
`
const FieldNotification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.chat.notification.notifications);
  const readAll = () => {
    dispatch(setReadAllNotice());
  }
  return (
    <>
      <FieldNotificationHeaderStyle>
        <Box>
          <TextSpanStyle size={24}>Уведомление</TextSpanStyle>
        </Box>
        <ChatMenu>
          <ChatMenuItem onClick={readAll}>Прочитать все</ChatMenuItem>
        </ChatMenu>
      </FieldNotificationHeaderStyle>
      <Field>
        {
          notifications &&
          notifications.map((notice, idx) => {
            return <NotificationItem notice={notice} key={notice.UID} />
          })
        }
      </Field>
    </>
  );
};
export default FieldNotification;