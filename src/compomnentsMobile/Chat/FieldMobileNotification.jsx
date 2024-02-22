import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'ui/Box';
import ChatMenu from 'components/Chat/ChatMenu';
import ChatMenuItem from 'components/Chat/ChatMenuItem';
import NotificationItem from 'components/Chat/NotificationItem';
import { TextSpanStyle } from 'styles/styles';
import { setReadAllNotice } from 'store/chatSlice';

const FieldNotificationHeaderStyle = styled.div`
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 5px;
`;
const Field = styled.div`
  overflow: auto;
  flex-grow: 1;
  border-radius: 5px;
`;
const FieldMobileNotification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.chat.notification.notifications
  );
  const readAll = () => {
    dispatch(setReadAllNotice());
  };
  return (
    <>
      <FieldNotificationHeaderStyle>
        <Box>
          <TextSpanStyle size={16}>Уведомления</TextSpanStyle>
        </Box>
        <ChatMenu>
          <ChatMenuItem onClick={readAll}>Прочитать все</ChatMenuItem>
        </ChatMenu>
      </FieldNotificationHeaderStyle>
      <Field>
        {notifications &&
          notifications.map((notice, idx) => {
            return <NotificationItem notice={notice} key={notice.UID} />;
          })}
      </Field>
    </>
  );
};
export default FieldMobileNotification;
