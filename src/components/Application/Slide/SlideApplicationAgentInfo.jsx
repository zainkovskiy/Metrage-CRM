import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import {
  ApplicationBlockStyle,
  ApplicationSlideSide,
} from '../applicationStyle';
import { SliderTitle } from 'styles/slider';
import { useGetAvatar } from 'hooks/MakeAvatar';
import { Box } from 'ui/Box';
import { ReactComponent as Phone } from 'images/phone2.svg';
import { ReactComponent as WhatsApp } from 'images/whatsapp.svg';
import { ReactComponent as Telegram } from 'images/telegram.svg';

const ApplicationSlideAgentInfoStyle = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
  & > span {
    transition: color 0.3s;
  }
  &:hover > span {
    color: ${({ theme }) => theme.color.primary};
  }
`;
const Avatar = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  object-position: top;
  border-radius: 40px;
`;
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

const SlideApplicationAgentInfo = ({ responsible, recommender, children }) => {
  const phone = responsible?.contactPhone
    ? responsible?.contactPhone.toString()
    : null;
  return (
    <ApplicationBlockStyle $column jc='flex-start'>
      {/* <ApplicationSlideAgentInfoStyle> */}
      <SliderTitle>Агент: {children}</SliderTitle>
      <Box
        column
        ai='flex-start'
        fullWidth
        jc='space-between'
        sp={{ flexGrow: 1 }}
      >
        <Box jc='flex-start'>
          <Avatar src={useGetAvatar(responsible)} />
          <div>
            <LinkStyle to={`/users/${responsible.UID}`}>
              <TextSpanStyle size={14}>{responsible?.title}</TextSpanStyle>
            </LinkStyle>
            <TextSpanStyle size={12} color='#ccc'>
              {responsible?.officeName}
            </TextSpanStyle>
            <TextSpanStyle size={10}>
              Был: {responsible?.strActivity}
            </TextSpanStyle>
          </div>
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
              href={`https://t.me/${'+7'.concat(phone.slice(1, phone.length))}`}
              target='__blank'
              bg='#2bb6f6;'
            >
              <Telegram />
            </LinkButtonStyle>
          </Box>
        )}
      </Box>
      {/* {children} */}
      {/* <ApplicationSlideSide>
          <SliderTitle>Рекомендатель:</SliderTitle>
          <div>
            <TextSpanStyle size={16}>{recommender?.title}</TextSpanStyle>
            <TextSpanStyle size={12} color='#ccc'>
              {recommender?.officeName}
            </TextSpanStyle>
          </div>
        </ApplicationSlideSide> */}
      {/* </ApplicationSlideAgentInfoStyle> */}
    </ApplicationBlockStyle>
  );
};

export default SlideApplicationAgentInfo;
