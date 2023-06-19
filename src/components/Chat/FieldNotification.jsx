import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Box } from 'ui/Box';
import ChatMenu from './ChatMenu';
import NotificationItem from './NotificationItem';
import { TextSpanStyle } from 'styles/styles';

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
  const notifications = useSelector((state) => state.chat.notification.notifications);
  return (
    <>
      <FieldNotificationHeaderStyle>
        <Box>
          <TextSpanStyle size={24}>Уведомление</TextSpanStyle>
        </Box>
        <ChatMenu />
      </FieldNotificationHeaderStyle>
      <Field>
        {
          notifications &&
          notifications.map((notice, idx) => {
            return <NotificationItem notice={notice} key={notice.UID}/>
          })
        }
      </Field>
    </>
  );
};

export default FieldNotification;