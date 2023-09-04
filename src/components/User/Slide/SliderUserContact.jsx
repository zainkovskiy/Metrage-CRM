import React from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import InputText from '../../../ui/InputText/InputText';

const UserBlock = styled.div`
  flex-grow: 1;
`;
const UserLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const SliderUserContact = () => {
  return (
    <SliderBlock>
      <Box column>
        <SliderTitle>Контакт</SliderTitle>
        <Box fullWidth gap='2rem' ai='flex-start'>
          <UserBlock>
            <UserLine>
              <TextSpanStyle>Фамилия:</TextSpanStyle>
              <InputText value='Василий' onChange={() => {}} />
            </UserLine>
            <UserLine>
              <TextSpanStyle>Имя:</TextSpanStyle>
              <InputText value='Петрович' onChange={() => {}} />
            </UserLine>
            <UserLine>
              <TextSpanStyle>Отчество:</TextSpanStyle>
              <InputText value='Чык-чырыквич' onChange={() => {}} />
            </UserLine>
          </UserBlock>
          <UserBlock>
            <UserLine>
              <TextSpanStyle>Телефон:</TextSpanStyle>
              <InputText value='89999999999' onChange={() => {}} />
            </UserLine>
            <UserLine>
              <TextSpanStyle></TextSpanStyle>
              <InputText value='89999999999' onChange={() => {}} />
            </UserLine>
            <UserLine>
              <TextSpanStyle>Почта:</TextSpanStyle>
              <InputText
                value='chik-cirik.v.p@belarus.by'
                onChange={() => {}}
              />
            </UserLine>
          </UserBlock>
        </Box>
      </Box>
    </SliderBlock>
  );
};

export default SliderUserContact;
