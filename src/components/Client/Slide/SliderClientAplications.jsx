import React from 'react';
import styled from 'styled-components';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useAsyncValue } from 'react-router-dom';
import { useDateFormat } from 'hooks/DateFormat';

const ClientApplications = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  max-height: 200px;
`;

const SliderClientAplications = () => {
  const client = useAsyncValue();
  return (
    <SliderBlock>
      <Box fullWidth column>
        <SliderTitle>Заявки</SliderTitle>
        <ClientApplications>
          {client?.demands?.length > 0 &&
            client.demands.map((item) => {
              return (
                <ClientApplicationItem key={item.UID} application={item} />
              );
            })}
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
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;
const ClientApplicationSide = styled.div`
  // flex-grow: 1;
  // width: 100%;
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

const ClientApplicationItem = ({ application }) => {
  return (
    <ClientApplicationItemStyle $color={application?.stageColour || '#ccc'}>
      <ClientApplicationSide>
        <TextSpanStyle>Ответственный:</TextSpanStyle>
        <TextSpanStyle>
          {application?.responsibleFirstName || ''}{' '}
          {application?.responsibleLastName || ''}
        </TextSpanStyle>
      </ClientApplicationSide>
      <ClientApplicationSide>
        <ClientApplicationLine>
          <TextSpanStyle size={12}>Потребность:</TextSpanStyle>
          <TextSpanStyle size={12}>{application?.type || ''}</TextSpanStyle>
        </ClientApplicationLine>
        <ClientApplicationLine>
          <TextSpanStyle size={12}>Статус:</TextSpanStyle>
          <TextSpanStyle size={12}>
            {application?.stageName || ''}
          </TextSpanStyle>
        </ClientApplicationLine>
        <ClientApplicationLine>
          <TextSpanStyle size={12}>Дата создания:</TextSpanStyle>
          <TextSpanStyle size={12}>
            {useDateFormat(application?.created, 'DD.MM.YY')}
          </TextSpanStyle>
        </ClientApplicationLine>
      </ClientApplicationSide>
      <ClientIcon src={application.sourcePicture} />
    </ClientApplicationItemStyle>
  );
};
