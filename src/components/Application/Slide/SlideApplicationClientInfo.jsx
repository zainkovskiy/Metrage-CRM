import React, { useState } from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import phoneUrl, { ReactComponent as Phone } from 'images/phone2.svg';
import whatsappUrl, { ReactComponent as WhatsApp } from 'images/whatsapp.svg';
import telegramUrl, { ReactComponent as Telegram } from 'images/telegram.svg';
import celendarUrl, { ReactComponent as Celendar } from 'images/calendar2.svg';
import editUrl, { ReactComponent as Edit } from 'images/edit.svg';
import {
  ApplicationBlockStyle,
  ApplicationSlideSide,
} from '../applicationStyle';
import { Box } from 'ui/Box';
import { IconButton } from 'ui/IconButton';
import DialogWindow from 'components/Main/DialogWindow';
import ApplicationNextContact from '../ApplicationNextContact';
import ApplicationEditName from '../ApplicationEditName ';
import { CheckboxUI } from 'ui/CheckboxUI';
import { useDispatch, useSelector } from 'react-redux';
import { checkApplication } from '../../../store/applicationSlice';
import { SliderTitle } from '../../../styles/slider';
import { Link } from 'react-router-dom';

const ApplicationSlideClientInfoStyle = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
`;
const TextSpanStyleLink = styled(TextSpanStyle)`
  cursor: pointer;
  transition: color 0.3s, text-decoration 0.3s;
  &:hover {
    color: ${({ theme }) => theme.color.primary};
    text-decoration: underline;
  }
`;
const ClientLinnk = styled(Link)`
  text-decoration: none;
`;
const SlideApplicationClientInfo = ({ client, demand, children, UID }) => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user?.isAdmin || '');
  const [isShowPhone, setIsShowPhone] = useState(false);
  const [isShowNextContact, setIsShowNextContact] = useState(false);
  const [isShowEditName, setIsShowEditName] = useState(false);
  const phone = client?.phones[0]?.value
    ? client?.phones[0]?.value.toString()
    : null;
  const getPhone = () => {
    if (phone) {
      if (isShowPhone) {
        return <TextSpanStyle>{phone}</TextSpanStyle>;
      }
      return (
        <TextSpanStyleLink onClick={() => setIsShowPhone(true)}>
          {phone.slice(0, 4).concat('*******')}
        </TextSpanStyleLink>
      );
    }
    return <TextSpanStyle>Нет номера</TextSpanStyle>;
  };
  const toggleShowNextContact = () => {
    setIsShowNextContact(!isShowNextContact);
  };
  const toggleEditName = () => {
    setIsShowEditName(!isShowEditName);
  };
  const isCheckedApplication = (e) => {
    dispatch(
      checkApplication({
        position: e.target.checked,
        UID: UID,
      })
    );
  };
  return (
    <>
      <ApplicationBlockStyle $column>
        <SliderTitle>
          Клиент:
          <CheckboxUI
            size='small'
            position='left'
            label='Проверено'
            defaultChecked={demand?.isChecked === '1'}
            onChange={isCheckedApplication}
            disabled={isAdmin !== '1'}
          />
        </SliderTitle>
        <ApplicationSlideClientInfoStyle>
          <ApplicationSlideSide gap='1rem'>
            <ApplicationSlideSide>
              <Box jc='flex-start'>
                <ClientLinnk to={`/client/${client.UID}`}>
                  <TextSpanStyle size={16}>
                    {client?.lastName} {client?.firstName}
                  </TextSpanStyle>
                </ClientLinnk>
                <IconButton onClick={toggleEditName}>
                  <Edit />
                </IconButton>
              </Box>
              {getPhone()}
              {phone && (
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
                    href={`https://wa.me/${'+7'.concat(
                      phone.slice(1, phone.length)
                    )}`}
                    target='__blank'
                    bg='#25D366'
                    fill='#fff'
                    iSize={20}
                  >
                    <WhatsApp />
                  </LinkButtonStyle>
                  <LinkButtonStyle
                    href={`https://t.me/${'+7'.concat(
                      phone.slice(1, phone.length)
                    )}`}
                    target='__blank'
                    bg='#2bb6f6;'
                  >
                    <Telegram />
                  </LinkButtonStyle>
                </Box>
              )}
            </ApplicationSlideSide>
            {children}
          </ApplicationSlideSide>
          <ApplicationSlideSide>
            <TextSpanStyle nowrap size={12}>
              Дата сделки: {useDateFormat(demand?.winDate)}
            </TextSpanStyle>
            <TextSpanStyle nowrap size={12} color='#ccc'>
              Последний контакт: {useDateFormat(demand?.lastContact)}
            </TextSpanStyle>
            <Box jc='flex-start' wrap gap='0'>
              <TextSpanStyle nowrap size={12}>
                Следующий контакт: &nbsp;
              </TextSpanStyle>
              <Box>
                <TextSpanStyle nowrap size={12}>
                  {useDateFormat(demand?.nextContact)}
                </TextSpanStyle>
                <IconButton onClick={toggleShowNextContact}>
                  <Celendar />
                </IconButton>
              </Box>
            </Box>
            <SliderTitle size={12} color='#ccc'>
              Комментарий:
            </SliderTitle>
            <TextSpanStyle size={11}>{demand?.comment}</TextSpanStyle>
          </ApplicationSlideSide>
        </ApplicationSlideClientInfoStyle>
      </ApplicationBlockStyle>
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
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  & > svg {
    fill: ${({ fill }) => fill && fill};
    width: ${({ iSize }) => iSize && iSize + 'px'};
    height: ${({ iSize }) => iSize && iSize + 'px'};
  }
`;

export default SlideApplicationClientInfo;
