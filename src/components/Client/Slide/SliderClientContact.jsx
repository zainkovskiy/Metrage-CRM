import React from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import InputText from '../../../ui/InputText/InputText';
import { useAsyncValue } from 'react-router-dom';

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
  const client = useAsyncValue();
  return (
    <SliderBlock>
      <Box column>
        <SliderTitle>Контакт</SliderTitle>
        <Box fullWidth gap='2rem' ai='flex-start'>
          <ContactBlock>
            <ContactLine>
              <TextSpanStyle>Фамилия:</TextSpanStyle>
              <InputText value={client?.lastName || ''} onChange={() => {}} />
            </ContactLine>
            <ContactLine>
              <TextSpanStyle>Имя:</TextSpanStyle>
              <InputText value={client?.firstName || ''} onChange={() => {}} />
            </ContactLine>
            <ContactLine>
              <TextSpanStyle>Отчество:</TextSpanStyle>
              <InputText value={client?.secondName || ''} onChange={() => {}} />
            </ContactLine>
          </ContactBlock>
          <ContactBlock>
            <ContactLine>
              <TextSpanStyle>Телефон:</TextSpanStyle>
              <InputText
                value={client?.phone[0]?.value || ''}
                onChange={() => {}}
              />
            </ContactLine>
            <ContactLine>
              <TextSpanStyle></TextSpanStyle>
              <InputText
                value={client?.phone[1]?.value || ''}
                onChange={() => {}}
              />
            </ContactLine>
            <ContactLine>
              <TextSpanStyle>Почта:</TextSpanStyle>
              <InputText
                value={client?.email[0]?.value || ''}
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
