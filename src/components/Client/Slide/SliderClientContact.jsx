import React from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import InputText from '../../../ui/InputText/InputText';

const ContactBlock = styled.div`
  flex-grow: 1;
`;
const ContactLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const SliderClientContact = () => {
  return (
    <SliderBlock>
      <Box column>
        <SliderTitle>Контакт</SliderTitle>
        <Box fullWidth gap='2rem' ai='flex-start'>
          <ContactBlock>
            <ContactLine>
              <TextSpanStyle>Фамилия:</TextSpanStyle>
              <InputText value='Василий' onChange={() => {}} />
            </ContactLine>
            <ContactLine>
              <TextSpanStyle>Имя:</TextSpanStyle>
              <InputText value='Петрович' onChange={() => {}} />
            </ContactLine>
            <ContactLine>
              <TextSpanStyle>Отчество:</TextSpanStyle>
              <InputText value='Чык-чырыквич' onChange={() => {}} />
            </ContactLine>
          </ContactBlock>
          <ContactBlock>
            <ContactLine>
              <TextSpanStyle>Телефон:</TextSpanStyle>
              <InputText value='89999999999' onChange={() => {}} />
            </ContactLine>
            <ContactLine>
              <TextSpanStyle></TextSpanStyle>
              <InputText value='89999999999' onChange={() => {}} />
            </ContactLine>
            <ContactLine>
              <TextSpanStyle>Почта:</TextSpanStyle>
              <InputText
                value='chik-cirik.v.p@belarus.by'
                onChange={() => {}}
              />
            </ContactLine>
          </ContactBlock>
        </Box>
      </Box>
    </SliderBlock>
  );
};

export default SliderClientContact;
