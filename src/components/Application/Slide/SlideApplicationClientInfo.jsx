import React, { useState } from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { ReactComponent as Phone } from 'images/phone2.svg';
import { ReactComponent as WhatsApp } from 'images/whatsapp.svg';
import { ReactComponent as Telegram } from 'images/telegram.svg';
import { ReactComponent as Edit } from 'images/edit.svg';
import {
  ApplicationBlockStyle,
  ApplicationSlideSide,
} from '../applicationStyle';
import { Box } from 'ui/Box';
import { ButtonLink } from 'ui/ButtonLink';
import { IconButton } from 'ui/IconButton';
import DialogWindow from 'components/Main/DialogWindow';
import ApplicationEditName from '../ApplicationEditName ';
import { SliderTitle } from '../../../styles/slider';
import { Link, useAsyncValue } from 'react-router-dom';
import ApplicationConnectObject from './ApplicationConnectObject';
import { setDisConnectObject } from '../../../api/application';

const TextSpanStyleLink = styled(TextSpanStyle)`
  cursor: pointer;
  transition: color 0.3s, text-decoration 0.3s;
  &:hover {
    color: ${({ theme }) => theme.color.primary};
    text-decoration: underline;
  }
`;
const CustomLink = styled(Link)`
  text-decoration: none;
  & > span {
    transition: color 0.3s;
  }
  &:hover > span {
    color: ${({ theme }) => theme.color.primary};
  }
`;
const SlideApplicationClientInfo = ({ globalSlideChange }) => {
  const application = useAsyncValue();
  const client = application?.client;
  const [change, setChange] = useState(false);
  const [isShowPhone, setIsShowPhone] = useState(false);
  const [isShowEditName, setIsShowEditName] = useState(false);
  const [isShowConnect, setIsShowConnect] = useState(false);
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
  const toggleEditName = () => {
    setIsShowEditName(!isShowEditName);
  };
  const toggleConnect = (source) => {
    if (source === 'new') {
      globalSlideChange();
    }
    setIsShowConnect(!isShowConnect);
  };
  const disConnectObject = () => {
    setDisConnectObject(application.UID);
    application.object = null;
    setChange(!change);
  };
  const getPath = () => {
    const obj = application.object;
    if (obj.type === 'jk') {
      return `/residential/${obj.UID}`;
    }
    return `/objects/${obj.type}/${obj.UID}`;
  };
  return (
    <>
      <ApplicationBlockStyle $column jc='flex-start'>
        <SliderTitle>
          Клиент:
          <TextSpanStyle size={12}>
            Источник: {application?.source?.name || ''}
          </TextSpanStyle>
        </SliderTitle>
        <ApplicationSlideSide>
          <Box jc='flex-start'>
            <CustomLink to={`/client/${client.UID}`}>
              <TextSpanStyle size={14}>
                {client?.lastName} {client?.firstName}
              </TextSpanStyle>
            </CustomLink>
            <IconButton onClick={toggleEditName}>
              <Edit />
            </IconButton>
          </Box>
          {getPhone()}
          <Box ai='flex-start' column gap='0'>
            <Box gap='0.2rem'>
              <TextSpanStyle size={12}>По объекту:</TextSpanStyle>
              <ButtonLink color='#84019e' size={12} onClick={toggleConnect}>
                {application?.object ? 'Изменить' : 'Добавить'}
              </ButtonLink>
              {application?.object && (
                <ButtonLink color='red' size={12} onClick={disConnectObject}>
                  Удалить
                </ButtonLink>
              )}
            </Box>
            {application.object && (
              <CustomLink to={getPath()}>
                <TextSpanStyle size={10}>
                  {application.object.addrString}
                </TextSpanStyle>
              </CustomLink>
            )}
          </Box>
          {phone && (
            <Box jc='flex-start'>
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
      </ApplicationBlockStyle>
      <DialogWindow open={isShowEditName} onClose={toggleEditName}>
        <ApplicationEditName onClose={toggleEditName} client={client} />
      </DialogWindow>
      <DialogWindow open={isShowConnect} onClose={toggleConnect}>
        <ApplicationConnectObject onClose={toggleConnect} />
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
