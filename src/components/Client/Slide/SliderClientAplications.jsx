import React from 'react';
import styled from 'styled-components';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import metrageUrl from 'images/logo_small.svg';

const ClientApplications = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  height: 200px;
  overflow: auto;
`;

const SliderClientAplications = () => {
  return (
    <SliderBlock>
      <Box fullWidth column>
        <SliderTitle>Заявки</SliderTitle>
        <ClientApplications>
          <ClientApplicationItem color='#d9d9d9' />
          <ClientApplicationItem color='#98E391' />
          <ClientApplicationItem color='#EF9E9E' />
          <ClientApplicationItem color='#d9d9d9' />
          <ClientApplicationItem color='#98E391' />
          <ClientApplicationItem color='#EF9E9E' />
        </ClientApplications>
      </Box>
    </SliderBlock>
  );
};

export default SliderClientAplications;

const ClientApplicationItemStyle = styled.div`
  display: flex;
  gap: 0.5rem;
  background-color: ${({ $color }) => ($color ? $color : '#d9d9d9')};
  padding: 0.5rem;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;
const ClientApplicationSide = styled.div`
  flex-grow: 1;
  width: 100%;
`;
const ClientApplicationLine = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const ClientIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  align-self: center;
`;

const ClientApplicationItem = ({ color }) => {
  return (
    <ClientApplicationItemStyle $color={color}>
      <ClientApplicationSide>
        <TextSpanStyle>Ответственный:</TextSpanStyle>
        <TextSpanStyle color='#898989'>Ванечкин Василий Петрович</TextSpanStyle>
      </ClientApplicationSide>
      <ClientApplicationSide>
        <ClientApplicationLine>
          <TextSpanStyle size={12}>Потребность:</TextSpanStyle>
          <TextSpanStyle size={12} color='#898989'>
            Купить
          </TextSpanStyle>
        </ClientApplicationLine>
        <ClientApplicationLine>
          <TextSpanStyle size={12}>Статус:</TextSpanStyle>
          <TextSpanStyle size={12} color='#898989'>
            Заявка создана
          </TextSpanStyle>
        </ClientApplicationLine>
        <ClientApplicationLine>
          <TextSpanStyle size={12}>Дата создания:</TextSpanStyle>
          <TextSpanStyle size={12} color='#898989'>
            29.08.2023
          </TextSpanStyle>
        </ClientApplicationLine>
      </ClientApplicationSide>
      <ClientIcon src={metrageUrl} />
    </ClientApplicationItemStyle>
  );
};
