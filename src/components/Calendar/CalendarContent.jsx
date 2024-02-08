import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ru';

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    start: moment().toDate(),
    end: moment().add(1, 'days').toDate(),
    title: 'Some title',
  },
];

const CalendarContent = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView='month'
        events={myEventsList}
        culture='ru'
        // startAccessor='start'
        // endAccessor='end'
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
};
export default CalendarContent;
