import React from 'react';
import styled from 'styled-components';
import { useAsyncValue } from 'react-router-dom';
import { ImageGalary } from 'components/Main/ImageGalary';
import { SliderBlock } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { LinkUI } from 'ui/LinkUI';

const SliderBlockCustom = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const InfoButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #787878;
`;
const InfoHeader = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 0.5rem;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;
const InfoAddres = styled(TextSpanStyle)`
  text-align: end;
  @media (max-width: 480px) {
    text-align: start;
  }
`;
const InfoMortage = styled.div`
  border-radius: 5px;
  background-color: #64b27a;
  padding: 0.2rem 0.5rem;
  white-space: nowrap;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
`;
const SlideResidentialInfo = () => {
  const residential = useAsyncValue();
  return (
    <SliderBlockCustom>
      <InfoButtons>
        <Box jc='flex-start' wrap>
          {residential?.hasSubsidy && (
            <InfoMortage>Субсидированная ипотека</InfoMortage>
          )}
          {residential?.hasTransh && (
            <InfoMortage>Траншевая ипотека</InfoMortage>
          )}
        </Box>
        <ButtonLink size={12} color='#787878'>
          Редактировать
        </ButtonLink>
      </InfoButtons>
      <InfoHeader>
        <Box column gap='0' ai='flex-start' jc='flex-start'>
          <TextSpanStyle lHeight={20} nowrap size={20} bold>
            {residential.name}
          </TextSpanStyle>
          <ButtonLink size={12} color='#85009e'>
            показать на карте
          </ButtonLink>
        </Box>
        <InfoAddres>{residential.addrStr}</InfoAddres>
      </InfoHeader>
      <ImageGalary
        images={
          residential?.renderer || [
            {
              URL: '',
            },
          ]
        }
        height={300}
        status
      />
      <Box jc='space-between' ai='flex-start'>
        <Box column gap='0' ai='flex-start'>
          <TextSpanStyle size={12}>
            Застройщик: {residential?.devName || ''}
          </TextSpanStyle>
          <TextSpanStyle size={12}>
            Дата сдачи:{' '}
            {residential?.deadLine &&
              useDateFormat(residential?.deadLine, 'MMMM YYYY')}
          </TextSpanStyle>
        </Box>
        <Box column gap='0' ai='flex-end'>
          <TextSpanStyle size={12}>
            Тип: {residential?.JKType || ''}
          </TextSpanStyle>
          {residential?.site && (
            <LinkUI href={residential?.site} target='_blank'>
              Ссыль на сайт
            </LinkUI>
          )}
        </Box>
      </Box>
    </SliderBlockCustom>
  );
};

export default SlideResidentialInfo;
