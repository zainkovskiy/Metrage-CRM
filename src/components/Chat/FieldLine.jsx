import React, { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Box } from 'ui/Box';
import { LinkUI } from 'ui/LinkUI/LinkUI';
import { ButtonLink } from 'ui/ButtonLink/ButtonLink';
import { TextSpanStyle } from 'styles/styles';

import ChatMenu from './ChatMenu';
import ChatMenuItem from './ChatMenuItem';
import MessageItem from './MessageItem';
import FieldSend from './FieldSend';
import UserFinder from 'components/Main/UserFinder';
import DialogWindow from 'components/Main/DialogWindow';

import back from 'images/back.png';
import {
  forwardOpenLineChat,
  closeOpenLineChat,
  toggleShowChat,
} from 'store/chatSlice';
import { sendVisit } from '../../store/chatSlice';

const FieldLineHeaderStyle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`;
const ChatAvatar = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 40px;
`;
const Field = styled.div`
  background-image: url(${back});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  overflow-y: auto;
  overflow-x: hidden;
`;
const SourceImg = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;
const FieldLine = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fieldRef = useRef(null);
  const firstUpdate = useRef(true);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const targetAuthor = useSelector((state) => state.chat.targetAuthor);
  const [open, setOpen] = useState(false);
  const getAvatar = () => {
    if (!targetAuthor) {
      return `https://ui-avatars.com/api/?name=Metrage&background=85009e&color=fff`;
    }
    if (targetAuthor?.avatar) {
      return targetAuthor.avatar;
    }
    return `https://ui-avatars.com/api/?name=${targetAuthor?.lastName}+${targetAuthor?.firstName}&background=85009e&color=fff`;
  };
  const scrollField = () => {
    if (fieldRef.current) {
      fieldRef.current.scrollTop = fieldRef.current.scrollHeight;
      firstUpdate.current = false;
    }
  };
  const getSource = () => {
    switch (currentChat?.itemSource || null) {
      case 'avito':
        return 'https://crm.metragegroup.com/uploads/contents/demands/avito-min.png';
      case 'cian':
        return 'https://crm.metragegroup.com/uploads/contents/demands/cian-min.png';
      default:
        break;
    }
  };
  const forwardingApplication = (user) => {
    dispatch(forwardOpenLineChat(user.UID));
    openUserFinder();
  };
  const openUserFinder = () => {
    setOpen(!open);
  };
  const closecChat = () => {
    dispatch(closeOpenLineChat());
  };
  const handleSendVisit = () => {
    dispatch(sendVisit(currentChat.chatId));
  };
  const transferApplication = () => {
    navigate(`/application/new/${currentChat.chatId}`, {
      state: { author: targetAuthor },
    });
    dispatch(toggleShowChat());
  };
  if (!currentChat) {
    return;
  }
  return (
    <>
      <FieldLineHeaderStyle>
        <Box fullWidth jc='flex-start'>
          <ChatAvatar src={getAvatar()} alt='avatar' />
          <Box fullWidth column ai='flex-start'>
            <Box>
              <TextSpanStyle size={16}>
                {targetAuthor?.lastName} {targetAuthor?.firstName}
              </TextSpanStyle>
              {currentChat?.itemSource && <SourceImg src={getSource()} />}
            </Box>
            <TextSpanStyle size={12}>
              По объекту:{' '}
              <LinkUI size={12} href={currentChat?.itemUrl} target='_blank'>
                {currentChat?.itemAddress}
              </LinkUI>
            </TextSpanStyle>
          </Box>
        </Box>
        <ChatMenu>
          <ChatMenuItem onClick={transferApplication}>
            Перенести в заявку
          </ChatMenuItem>
          <ChatMenuItem onClick={closecChat}>Закрыть диалог</ChatMenuItem>
          <ChatMenuItem onClick={handleSendVisit}>
            Отправить визитку
          </ChatMenuItem>
          <ChatMenuItem onClick={openUserFinder}>Переадресовать</ChatMenuItem>
        </ChatMenu>
      </FieldLineHeaderStyle>
      <Field ref={fieldRef}>
        <AnimatePresence>
          {currentChat?.messages.map((message, idx) => (
            <MessageItem
              key={idx}
              message={message}
              target={message?.author?.isOpenLines || false}
              last={idx === currentChat?.messages?.length - 1}
              scrollField={scrollField}
              firstUpdate={firstUpdate.current}
            />
          ))}
        </AnimatePresence>
      </Field>
      <FieldSend />
      <DialogWindow onClose={openUserFinder} open={open}>
        <div onClick={(e) => e.stopPropagation()}>
          <UserFinder
            title='Переадресовать чат'
            onClose={openUserFinder}
            onChange={forwardingApplication}
          />
        </div>
      </DialogWindow>
    </>
  );
};
export default FieldLine;
