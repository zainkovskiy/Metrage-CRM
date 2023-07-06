import React, { useState } from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import phoneUrl, { ReactComponent as Phone } from 'images/phone2.svg';
import whatsappUrl, { ReactComponent as WhatsApp } from 'images/whatsapp.svg';
import telegramUrl, { ReactComponent as Telegram } from 'images/telegram.svg';
import celendarUrl, { ReactComponent as Celendar } from 'images/calendar2.svg';
import editUrl, { ReactComponent as Edit } from 'images/edit.svg';
import { TaskBlockStyle, TaskSlideTitleStyle, TaskSlideSide } from './TaskStyle';
import { Box } from 'ui/Box';
import { IconButton } from 'ui/IconButton';
import DialogWindow from 'components/Main/DialogWindow';
import ApplicationNextContact from './ApplicationNextContact';
import ApplicationEditName from './ApplicationEditName ';
import { CheckboxUI } from 'ui/CheckboxUI';
import { useDispatch, useSelector } from 'react-redux';
import { checkApplication } from '../../store/taskSlice';


const TaskSlideClientInfoStyle = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
`
const TextSpanStyleLink = styled(TextSpanStyle)`
  cursor: pointer;
  transition: color .3s, text-decoration .3s;
  &:hover{
    color: ${({ theme }) => theme.color.primary};
    text-decoration: underline;
  }
`
const TaskSlideClientInfo = ({ client, demand, children, UID }) => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user?.isAdmin || ''); 
  const [isShowPhone, setIsShowPhone] = useState(false);
  const [isShowNextContact, setIsShowNextContact] = useState(false);
  const [isShowEditName, setIsShowEditName] = useState(false);
  const phone = client?.phones[0]?.value ? client?.phones[0]?.value.toString() : null;
  const getPhone = () => {
    if (phone) {
      if (isShowPhone) {
        return <TextSpanStyle>{phone}</TextSpanStyle>
      }
      return <TextSpanStyleLink onClick={() => setIsShowPhone(true)}>{phone.slice(0, 4).concat('*******')}</TextSpanStyleLink>
    }
    return <TextSpanStyle>Нет номера</TextSpanStyle>
  }
  const toggleShowNextContact = () => {
    setIsShowNextContact(!isShowNextContact);
  }
  const toggleEditName = () => {
    setIsShowEditName(!isShowEditName);
  }
  const isCheckedApplication = (e) => {
    dispatch(checkApplication({
      position: e.target.checked,
      UID: UID,
    }))
  }
  return (
    <>
      <TaskBlockStyle $column>
        <TaskSlideTitleStyle>Клиент:
          <CheckboxUI
            size='small'
            position='left'
            label='Проверено'
            defaultChecked={demand?.isChecked === '1'}
            onChange={isCheckedApplication}
            disabled={isAdmin !== '1'}
          />
        </TaskSlideTitleStyle>
        <TaskSlideClientInfoStyle>
          <TaskSlideSide gap='1rem'>
            <TaskSlideSide>
              <Box jc='flex-start'>
                <TextSpanStyle size={16}>{client?.lastName} {client?.firstName}</TextSpanStyle>
                <IconButton onClick={toggleEditName}>
                  <Edit />
                </IconButton>
              </Box>
              {
                getPhone()
              }
              {
                phone &&
                <Box sp={{ marginTop: '0.5rem' }} jc='flex-start'>
                  <LinkButtonStyle
                    href={`tel:${'+7'.concat(phone.slice(1, phone.length))}`}
                    target='__blank'
                    fill='#fff'
                    iSize={20}
                    color='primary'
                  >
                    <Phone />
                  </LinkButtonStyle>
                  <LinkButtonStyle
                    href={`https://wa.me/${'+7'.concat(phone.slice(1, phone.length))}`}
                    target='__blank'
                    bg='#25D366'
                    fill='#fff'
                    iSize={20}
                  >
                    <WhatsApp />
                  </LinkButtonStyle>
                  <LinkButtonStyle
                    href={`https://t.me/${'+7'.concat(phone.slice(1, phone.length))}`}
                    target='__blank'
                    bg='#2bb6f6;'
                  >
                    <Telegram />
                  </LinkButtonStyle>
                </Box>
              }
            </TaskSlideSide>
            {children}
          </TaskSlideSide>
          <TaskSlideSide>
            <TextSpanStyle nowrap size={12}>Дата сделки: {useDateFormat(demand?.winDate)}</TextSpanStyle>
            <TextSpanStyle nowrap size={12} color='#ccc'>Последний контакт: {useDateFormat(demand?.lastContact)}</TextSpanStyle>
            <Box jc='flex-start' wrap gap='0'>
              <TextSpanStyle nowrap size={12}>Следующий контакт: &nbsp;</TextSpanStyle>
              <Box>
                <TextSpanStyle nowrap size={12}>{useDateFormat(demand?.nextContact)}</TextSpanStyle>
                <IconButton onClick={toggleShowNextContact}>
                  <Celendar />
                </IconButton>
              </Box>
            </Box>
            <TaskSlideTitleStyle size={12} color='#ccc'>Комментарий:</TaskSlideTitleStyle>
            <TextSpanStyle size={11}>{demand?.comment}</TextSpanStyle>
          </TaskSlideSide>
        </TaskSlideClientInfoStyle>
      </TaskBlockStyle>
      <DialogWindow open={isShowNextContact} onClose={toggleShowNextContact}>
        <ApplicationNextContact onClose={toggleShowNextContact} />
      </DialogWindow>
      <DialogWindow open={isShowEditName} onClose={toggleEditName}>
        <ApplicationEditName onClose={toggleEditName} client={client} />
      </DialogWindow>
    </>
  );
};

const LinkButtonStyle = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ bg }) => bg && `background-color: ${bg}`};
  ${({ color, theme }) => color && `background-color: ${theme.color[color]}`};
  border-radius: 40px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform .3s;
  &:hover{
    transform: scale(1.1);
  }
  & > svg{
    fill: ${({ fill }) => fill && fill};
    width: ${({ iSize }) => iSize && iSize + 'px'};
    height: ${({ iSize }) => iSize && iSize + 'px'};
  }
`

export default TaskSlideClientInfo;