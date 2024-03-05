import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import DialogWindow from 'components/Main/DialogWindow';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Loader from 'components/Main/Loader';
import moment from 'moment';
import 'moment/locale/ru';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import DialogEvent from './DialogEvent';
import { messages } from './core/messages';

const localizer = momentLocalizer(moment);

const CustomEvent = styled.div`
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  box-sizing: border-box;
  cursor: pointer;
`;
const TextEllipsis = styled(TextSpanStyle)`
  overflow: hidden;
  text-overflow: ellipsis;
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
      <TextEllipsis nowrap color='#fff'>
        {props.event.title}
      </TextEllipsis>
    </CustomEvent>
  );
};

const CalendarComponent = () => {
  const [curEvent, setCurEvent] = useState(null);
  const events = useSelector((state) => state.calendar.events);
  const loadingList = useSelector((state) => state.calendar.loadingList);
  if (loadingList) {
    return <Loader />;
  }

  const handleSelectEvent = (event) => {
    setCurEvent(event);
  };
  const handleSelectSlot = (e) => {
    console.log(e);
  };

  const cleareCurEvent = () => {
    setCurEvent(null);
  };

  return (
    <>
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
        popup
        messages={messages}
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
          overflow: 'auto',
          padding: '0.5rem',
          boxSizing: 'border-box',
        }}
      />
      <DialogWindow open={Boolean(curEvent)} onClose={cleareCurEvent}>
        <DialogEvent onClose={cleareCurEvent} event={curEvent} />
      </DialogWindow>
    </>
  );
};

export default CalendarComponent;
