import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import DialogWindow from 'components/Main/DialogWindow';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Loader from 'components/Main/Loader';
import moment from 'moment';
import 'moment/locale/ru';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DialogEvent from './DialogEvent';

const CalendarStyle = styled.div`
  flex-grow: 1;
  padding: 0.5rem;
  box-sizing: border-box;
`;

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
  cursor: pointer;
`;
const MyEvent = (props) => {
  const getClick = () => {
    if (props?.onSelect) {
      return props.onSelect(props.event);
    }
    if (props?.onClick) {
      return props.onClick(props.event);
    }
    return;
  };
  return (
    <CustomEvent
      style={{ backgroundColor: ` ${props?.event?.color || 'grey'}` }}
      onClick={getClick}
    >
      <TextSpanStyle color='#fff'>{props.event.title}</TextSpanStyle>
    </CustomEvent>
  );
};

const CalendarComponent = () => {
  const navigate = useNavigate();
  const [curEvent, setCurEvent] = useState(null);
  const events = useSelector((state) => state.calendar.events);
  const loadingList = useSelector((state) => state.calendar.loadingList);
  if (loadingList) {
    return <Loader />;
  }

  const handleSelectEvent = (event) => {
    if (event?.isRouting) {
      navigate(`/${event?.type}/${event?.UID}`);
    }
    if (event?.UID) {
      setCurEvent(event);
    }
  };
  const handleSelectSlot = (e) => {
    console.log(e);
  };

  const cleareCurEvent = () => {
    setCurEvent(null);
  };

  return (
    <CalendarStyle>
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
        // onSelectSlot={handleSelectSlot}
        selectable
        messages={{
          next: 'Вперед',
          previous: 'Назад',
          today: 'Сегодня',
          month: 'Месяц',
          week: 'Неделя',
          day: 'День',
          agenda: 'Список',
          showMore: (total) => `+${total} еще`,
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
      <DialogWindow open={Boolean(curEvent)} onClose={cleareCurEvent}>
        <DialogEvent onClose={cleareCurEvent} event={curEvent} />
      </DialogWindow>
    </CalendarStyle>
  );
};

export default CalendarComponent;
