import React, { useState } from 'react';
import { ButtonLink } from '../../ui/ButtonLink/ButtonLink';
import { TextSpanStyle } from '../../styles/styles';
import styled from 'styled-components';
import moment from 'moment';

const MainInfoCalendarStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;
const CalendarEvents = styled.div`
  display: flex;
  flex-direction: column;
`;
const CalendarEvent = styled.div`
  display: flex;
  &:last-child {
    & > div {
      border: none;
    }
    & > ul {
      border: none;
    }
  }
`;
const CalendarEventDate = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #85009e;
  border-bottom: 1px solid azure;
`;
const CalendarEventList = styled.ul`
  width: 100%;
  padding-left: 20px;
  border-bottom: 1px solid #85009e;
  background-color: azure;
  padding: 0.2rem 0.2rem 0.2rem 1.2rem;
`;
const MainInfoCalendar = ({ events }) => {
  const [duration, setDuration] = useState(0);
  return (
    <MainInfoCalendarStyle>
      <ButtonLink
        size={12}
        color='#727272'
        onClick={() => {
          setDuration(duration - 7);
        }}
      >
        Предыдущая неделя
      </ButtonLink>
      <TextSpanStyle>
        {moment().weekday(1).add(duration, 'days').format('DD.MM.YYYY')} -{' '}
        {moment().weekday(7).add(duration, 'days').format('DD.MM.YYYY')}
      </TextSpanStyle>
      <ButtonLink
        size={12}
        color='#727272'
        onClick={() => {
          setDuration(duration + 7);
        }}
      >
        Слудующая неделя
      </ButtonLink>
      <CalendarEvents>
        {events.map((event, idx) => {
          return (
            <CalendarEvent key={idx}>
              <CalendarEventDate>
                <TextSpanStyle color='#fff' size={10}>
                  {moment(event.date).locale('ru').format('dd')}
                </TextSpanStyle>
                <TextSpanStyle color='#fff'>
                  {moment(event.date).format('D')}
                </TextSpanStyle>
              </CalendarEventDate>
              <CalendarEventList>
                {event.users.map((listItem, idx) => {
                  return (
                    <CalendarEventListItem listItem={listItem} key={idx} />
                  );
                })}
              </CalendarEventList>
            </CalendarEvent>
          );
        })}
      </CalendarEvents>
    </MainInfoCalendarStyle>
  );
};
const CalendarEventListItemStyle = styled.li`
  list-style-type: none;
  position: relative;

  &::before {
    content: '-';
    position: absolute;
    left: -0.8rem;
    top: -0.2rem;
  }
`;
const CalendarEventListItem = ({ listItem }) => {
  return (
    <CalendarEventListItemStyle>
      <TextSpanStyle size={10}>День рождение</TextSpanStyle>
      <TextSpanStyle size={12}>
        {listItem?.name || ''} {listItem?.lastName || ''}
      </TextSpanStyle>
      <TextSpanStyle size={10}>{listItem?.office || ''}</TextSpanStyle>
    </CalendarEventListItemStyle>
  );
};

export default MainInfoCalendar;
