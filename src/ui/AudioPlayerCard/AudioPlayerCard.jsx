import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import AudioPlayer from 'components/Main/AudioPlayer';
import { useDateFormat } from 'hooks/DateFormat';
const PlayerStyle = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 0.5rem;
`;
const PlayerFooterStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const getColor = (status) => {
  switch (status) {
    case 'Пропущенный':
      return 'rgb(211 82 45)';
    case 'Вх. отменён':
      return 'rgb(211 82 45)';
    case 'Успешный':
      return 'rgb(93 199 56)';
    default:
      return 'rgb(174, 168, 168)';
  }
};
const BusyText = styled(TextSpanStyle)`
  padding: 0.2rem 0.5rem;
  background-color: ${({ $status }) => getColor($status)};
  border-radius: 5px;
`;

const AudioPlayerCard = ({ call }) => {
  return (
    <PlayerStyle>
      <TextSpanStyle size={10} color='#aea8a8'>
        {useDateFormat(call?.started, 'DD MMMM YYYY HH:MM')}
      </TextSpanStyle>
      <TextSpanStyle>
        {call?.direction} звонок на номер: {call?.userPhone}
      </TextSpanStyle>
      {call?.record ? (
        <AudioPlayer src={call?.record} />
      ) : (
        <TextSpanStyle size={12}>Нет записи</TextSpanStyle>
      )}
      <PlayerFooterStyle>
        <BusyText size={10} color='#fff' $status={call?.status}>
          {call?.status || 'Статус не определен'}
        </BusyText>
        <TextSpanStyle size={10} color='#aea8a8'>
          Длительность: {call?.duration} мин.
        </TextSpanStyle>
      </PlayerFooterStyle>
    </PlayerStyle>
  );
};

export default AudioPlayerCard;
