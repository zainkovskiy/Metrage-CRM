import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import ChatMenu from 'components/Chat/ChatMenu';
import ChatMenuItem from 'components/Chat/ChatMenuItem';
import ButtonBack from 'ui/ButtonBack/ButtonBack';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentChat } from 'store/chatSlice';
import {
  forwardOpenLineChat,
  closeOpenLineChat,
  toggleShowChat,
} from 'store/chatSlice';
import UserFinder from 'components/Main/UserFinder';
import DialogWindow from 'components/Main/DialogWindow';
import { LinkUI } from 'ui/LinkUI/LinkUI';

const FieldHeaderChatStyle = styled.div`
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 5px;
`;
const ChatAvatar = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
  border-radius: 40px;
`;
const SourceLink = styled(TextSpanStyle)`
  overflow: hidden;
  text-overflow: ellipsis;
`;
const FieldHeaderLine = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const targetAuthor = useSelector((state) => state.chat.targetAuthor);
  const currentChat = useSelector((state) => state.chat.currentChat);
  const [open, setOpen] = useState(false);
  const backToList = () => {
    dispatch(clearCurrentChat());
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
  const closecChat = () => {
    dispatch(closeOpenLineChat());
  };
  const transferApplication = () => {
    navigate(`/application/new/${currentChat.chatId}`, {
      state: { author: targetAuthor },
    });
    dispatch(toggleShowChat());
  };
  const openUserFinder = () => {
    setOpen(!open);
  };
  const forwardingApplication = (user) => {
    dispatch(forwardOpenLineChat(user.UID));
    openUserFinder();
  };
  return (
    <>
      <FieldHeaderChatStyle>
        <Box fullWidth jc='flex-start'>
          <ButtonBack onClick={backToList} />
        </Box>
        <Box fullWidth>
          <ChatAvatar src={getSource()} alt='avatar' />
          <TextSpanStyle nowrap size={16}>
            {targetAuthor?.lastName} {targetAuthor?.firstName}
          </TextSpanStyle>
        </Box>
        <Box fullWidth jc='flex-end'>
          <ChatMenu>
            <ChatMenuItem color='red' onClick={openUserFinder}>
              Переадресовать
            </ChatMenuItem>
            <ChatMenuItem onClick={transferApplication}>
              Перенести в заявку
            </ChatMenuItem>
            <ChatMenuItem onClick={closecChat}>Закрыть диалог</ChatMenuItem>
          </ChatMenu>
        </Box>
      </FieldHeaderChatStyle>
      <FieldHeaderChatStyle>
        <SourceLink size={12} nowrap>
          По объекту:{' '}
          <LinkUI size={12} href={currentChat?.itemUrl} target='_blank'>
            {currentChat?.itemAddress}
          </LinkUI>
        </SourceLink>
      </FieldHeaderChatStyle>
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

export default FieldHeaderLine;
