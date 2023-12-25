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
import { IconButton } from 'ui/IconButton';
import DialogWindow from 'components/Main/DialogWindow';
import ApplicationEditName from '../ApplicationEditName ';
import { SliderTitle } from '../../../styles/slider';
import { Link } from 'react-router-dom';

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
  & > span {
    transition: color 0.3s;
  }
  &:hover > span {
    color: ${({ theme }) => theme.color.primary};
  }
`;
const SlideApplicationClientInfo = ({ client }) => {
  const [isShowPhone, setIsShowPhone] = useState(false);
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
  const toggleEditName = () => {
    setIsShowEditName(!isShowEditName);
  };
  return (
    <>
      <ApplicationBlockStyle $column jc='flex-start'>
        <SliderTitle>Клиент:</SliderTitle>
        <ApplicationSlideSide>
          <Box jc='flex-start'>
            <ClientLinnk to={`/client/${client.UID}`}>
              <TextSpanStyle size={14}>
                {client?.lastName} {client?.firstName}
              </TextSpanStyle>
            </ClientLinnk>
            <IconButton onClick={toggleEditName}>
              <Edit />
            </IconButton>
          </Box>
          {getPhone()}
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
