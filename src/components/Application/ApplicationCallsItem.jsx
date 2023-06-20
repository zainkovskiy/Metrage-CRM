import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import AudioPlayer from 'components/Main/AudioPlayer';


const ApplicationCallsItemStyle = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 0.5rem;
`
const ApplicationCallsItemFooterStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({$busy}) => $busy ? 'space-between' : 'flex-end'};
`
const BusyText = styled(TextSpanStyle)`
  padding: 0.2rem 0.5rem;
  background-color: #ffb2b2;
  border-radius: 5px;
`

const ApplicationCallsItem = ({ call }) => {
  return (
    <ApplicationCallsItemStyle>
      <TextSpanStyle>Входящий звонок на номер: {call?.phone}</TextSpanStyle>
      <AudioPlayer src='https://crm.metragegroup.com/uploads/audio/Billy_Talent-Red_Flag.mp3'/>
      <ApplicationCallsItemFooterStyle $busy={call?.status === 'busy'}>
        {
          call?.status === 'busy' &&
          <BusyText size={10} color='#fff'>Пропущен</BusyText>
        }
        <TextSpanStyle size={10} color='#aea8a8'>Длительность: {call?.duration} мин.</TextSpanStyle>
      </ApplicationCallsItemFooterStyle>
    </ApplicationCallsItemStyle>
  );
};

export default ApplicationCallsItem;