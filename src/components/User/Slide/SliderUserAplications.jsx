import React from 'react';
import styled from 'styled-components';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import metrageUrl from 'images/logo_small.svg';

const UserApplications = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  height: 200px;
  overflow: auto;
`;

const SliderUserAplications = () => {
  return (
    <SliderBlock>
      <Box fullWidth column>
        <SliderTitle>Заявки</SliderTitle>
        <UserApplications>
          <UserApplicationItem color='#d9d9d9' />
          <UserApplicationItem color='#98E391' />
          <UserApplicationItem color='#EF9E9E' />
          <UserApplicationItem color='#d9d9d9' />
          <UserApplicationItem color='#98E391' />
          <UserApplicationItem color='#EF9E9E' />
        </UserApplications>
      </Box>
    </SliderBlock>
  );
};

export default SliderUserAplications;

const UserApplicationItemStyle = styled.div`
  display: flex;
  gap: 0.5rem;
  background-color: ${({ $color }) => ($color ? $color : '#d9d9d9')};
  padding: 0.5rem;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;
const UserApplicationSide = styled.div`
  flex-grow: 1;
  width: 100%;
`;
const UserApplicationLine = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const UserIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  align-self: center;
`;

const UserApplicationItem = ({ color }) => {
  return (
    <UserApplicationItemStyle $color={color}>
      <UserApplicationSide>
        <TextSpanStyle>Ответственный:</TextSpanStyle>
        <TextSpanStyle color='#898989'>Ванечкин Василий Петрович</TextSpanStyle>
      </UserApplicationSide>
      <UserApplicationSide>
        <UserApplicationLine>
          <TextSpanStyle size={12}>Потребность:</TextSpanStyle>
          <TextSpanStyle size={12} color='#898989'>
            Купить
          </TextSpanStyle>
        </UserApplicationLine>
        <UserApplicationLine>
          <TextSpanStyle size={12}>Статус:</TextSpanStyle>
          <TextSpanStyle size={12} color='#898989'>
            Заявка создана
          </TextSpanStyle>
        </UserApplicationLine>
        <UserApplicationLine>
          <TextSpanStyle size={12}>Дата создания:</TextSpanStyle>
          <TextSpanStyle size={12} color='#898989'>
            29.08.2023
          </TextSpanStyle>
        </UserApplicationLine>
      </UserApplicationSide>
      <UserIcon src={metrageUrl} />
    </UserApplicationItemStyle>
  );
};
