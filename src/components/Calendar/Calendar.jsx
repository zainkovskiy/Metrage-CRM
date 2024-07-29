import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import DialogWindow from 'components/Main/DialogWindow';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import Loader from 'components/Main/Loader';
import moment from 'moment';
import 'moment/locale/ru';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import DialogEvent from './DialogEvent';
import { messages } from './core/messages';
import { getEventList, updateEventDND } from '../../store/slices/calendarSlice';

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
      style={{
        backgroundColor: ` ${props?.event?.color || 'grey'}`,
      }}
      onClick={getClick}
    >
      <TextEllipsis nowrap color='#fff'>
        {props.title}
      </TextEllipsis>
    </CustomEvent>
  );
};
const MyEventWrapper = (event) => {
  const newChildren = event.children;
  newChildren.props.children.props.style.backgroundColor =
    newChildren.props.event.color || 'grey';
  newChildren.props.children.props.style.borderColor =
    newChildren.props.event.color || 'grey';
  return newChildren;
};

const CalendarWithDragAndGrops = withDragAndDrop(Calendar);

const CalendarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [curEvent, setCurEvent] = useState(null);
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const firstMountDate = useRef(true);
  const firstMountView = useRef(true);
  const events = useSelector((state) => state.calendar.events);
  const loadingList = useSelector((state) => state.calendar.loadingList);
  useEffect(() => {
    if (firstMountDate.current) {
      firstMountDate.current = false;
      return;
    }
    getEvents();
  }, [date]);
  useEffect(() => {
    if (firstMountView.current) {
      firstMountView.current = false;
      return;
    }
    getEvents();
  }, [view]);
  if (loadingList) {
    return <Loader />;
  }
  const getEvents = () => {
    dispatch(
      getEventList({
        dateFrom: moment(date).format('YYYY-MM-DD'),
        period: view,
      })
    );
  };
  const setNewView = (newView) => {
    setView(newView);
  };
  const setNewDate = (newDate) => {
    setDate(newDate);
  };
  const handleSelectEvent = (event) => {
    setCurEvent(event);
  };
  const handleSelectSlot = (e) => {
    const currentDate = moment(e.start).format('YYYY-MM-DDTHH:mm');
    navigate('new', { state: currentDate });
  };

  const cleareCurEvent = () => {
    setCurEvent(null);
  };
  const moveEvent = (props) => {
    dispatch(
      updateEventDND({
        ...props.event,
        dueDate: moment(props.start).format('YYYY-MM-DDTHH:mm'),
        notify: props.event.title,
        start: moment(props.start).format('YYYY-MM-DD HH:mm'),
        end: moment(props.end).format('YYYY-MM-DD HH:mm'),
      })
    );
  };

  return (
    <>
      <CalendarWithDragAndGrops
        components={{
          event: MyEvent,
          eventWrapper: MyEventWrapper,
        }}
        localizer={localizer}
        date={date}
        view={view}
        events={events?.data || []}
        culture='ru'
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        onEventDrop={moveEvent}
        popup
        messages={messages}
        startAccessor={(event) => {
          return moment(event.start).toDate();
        }}
        endAccessor={(event) => {
          return moment(event.end).toDate();
        }}
        onNavigate={setNewDate}
        onView={setNewView}
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
