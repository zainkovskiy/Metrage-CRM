import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ru';
import { getEventList } from '../../api/calendarAPI';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    start: moment().toDate(),
    end: moment().add(1, 'days').toDate(),
    title: 'Some title',
  },
];
const myEvent = [
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },
];
const eventApi = [
  {
    title: 'Позвонить по заявке',
    start: moment('2024-03-02 00:00:00').toDate(),
    end: moment('2024-03-02 00:00:00').toDate(),
    color: 'red',
    isRouting: true,
    type: 'application',
    UID: 9077,
  },
  // {
  //   title: 'Выполнить задачу',
  //   color: 'blue',
  //   start: moment('2024-02-29 00:00:00').toDate(),
  //   end: moment('2024-03-03 00:00:00').toDate(),
  //   isRouting: true,
  //   type: 'task',
  //   UID: 81,
  // },
  // {
  //   title: 'Открыть карточку в календаре',
  //   color: 'blue',
  //   start: moment('2024-02-29 04:00:00').toDate(),
  //   end: moment('2024-02-29 04:30:00').toDate(),
  //   isRouting: false,
  //   type: 'innerItem',
  //   UID: 81,
  // },
];

const CustomEvent = styled.div`
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  box-sizing: border-box;
`;
const MyEvent = (props) => {
  return (
    <CustomEvent
      style={{ backgroundColor: ` ${props?.event?.color || 'green'}` }}
    >
      <TextSpanStyle color='#fff'>{props.event.title}</TextSpanStyle>
    </CustomEvent>
  );
};

const CalendarContent = () => {
  const [events, setEvents] = useState(null);
  useEffect(() => {
    getEvents();
  }, []);
  const getEvents = useCallback(() => {
    getEventList().then((data) => {
      setEvents(data);
    });
  }, []);

  const handleSelectEvent = (e) => {
    console.log(e);
  };
  const handleSelectSlot = (e) => {
    console.log(e);
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <Calendar
        components={{
          eventWrapper: MyEvent,
        }}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView='month'
        // defaultView={events?.mode || 'month'}
        // defaultView={Views.MONTH}
        events={events?.data || []}
        culture='ru'
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        messages={{
          next: 'Вперед',
          previous: 'Назад',
          today: 'Сегодня',
          month: 'Месяц',
          week: 'Неделя',
          day: 'День',
          agenda: 'Список',
        }}
        startAccessor={(event) => {
          return moment(event.start).toDate();
        }}
        endAccessor={(event) => {
          return moment(event.end).toDate();
        }}
        style={{
          height: '100%',
          width: '100%',
          fontFamily: 'CeraCY, sans-serif',
        }}
      />
    </div>
  );
};
export default CalendarContent;
