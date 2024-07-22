import React, { useState } from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import { useDispatch } from 'react-redux';
import { setReadNotice } from 'store/chatSlice';
import { LinkUI } from '../../ui/LinkUI/LinkUI';
import { ButtonLink } from '../../ui/ButtonLink';
import DialogWindow from 'components/Main/DialogWindow';
import NotificationAutoaction from './NotificationAutoaction';

const NotificationItemStyle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  background-color: ${({ $readed }) => ($readed ? '#fff' : '#fbe8ff')};
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${({ $readed }) => ($readed ? '#f3f3f3' : '#f1c7fa')};
  }
  @media (max-width: 425px) {
    padding: 0.5rem;
  }
`;
const NotificationItemHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ReadButton = styled.span`
  text-decoration: underline;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.color.primary};
  font-size: 12px;
  cursor: pointer;
  visibility: ${({ $readed }) => $readed && 'hidden'};
`;
const NotificationItem = ({ notice }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const setRead = () => {
    dispatch(setReadNotice(notice));
  };
  const openWindow = () => {
    setOpen(true);
  };
  const closeWindow = () => {
    setOpen(false);
  };
  return (
    <NotificationItemStyle $readed={notice?.readed}>
      <NotificationItemHeaderStyle>
        <TextSpanStyle color='#a5a5a5' size={10}>
          {useDateFormat(notice?.created, 'DD MMMM YYYY HH:MM')}
        </TextSpanStyle>
        <ReadButton onClick={setRead} $readed={notice?.readed}>
          Прочитать
        </ReadButton>
      </NotificationItemHeaderStyle>
      <TextSpanStyle>{notice?.content}</TextSpanStyle>
      {notice.type === 'autoaction' ? (
        <ButtonLink size={12} color='rgb(133, 0, 158)' onClick={openWindow}>
          Подробнее...
        </ButtonLink>
      ) : (
        <>
          {notice?.URL && (
            <LinkUI size={12} target='_blank' href={notice.URL}>
              Подробнее...
            </LinkUI>
          )}
        </>
      )}
      <DialogWindow onClose={closeWindow} open={open} disabledClose>
        <NotificationAutoaction onClose={closeWindow} UID={notice.actionId} />
      </DialogWindow>
    </NotificationItemStyle>
  );
};

export default NotificationItem;
