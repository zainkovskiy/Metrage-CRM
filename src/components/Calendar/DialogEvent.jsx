import React from 'react';
import styled from 'styled-components';
import { SliderTitle } from 'styles/slider';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import { ButtonLink } from 'ui/ButtonLink';
import { useDispatch, useSelector } from 'react-redux';
import { removeEvent } from '../../store/slices/calendarSlice';
import { Link } from 'react-router-dom';

const DialogEventStyle = styled.div`
  padding: 0.5rem;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 300px;
  max-width: 300px;
  box-sizing: border-box;
`;
const DialogEventContent = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 60vh;
  overflow: auto;
`;
const DialogEventFooter = styled.div`
  padding-top: 0.5rem;
  border-top: 1px solid #786464;
  box-sizing: border-box;
  display: flex;
  gap: 0.5rem;
`;

const DialogEvent = ({ event, onClose }) => {
  const isAdmin = useSelector((state) => state.user?.isAdmin || '') === '1';
  const dispatch = useDispatch();
  const remove = () => {
    dispatch(removeEvent(event.UID))
      .unwrap()
      .then(() => {
        onClose();
      });
  };
  return (
    <DialogEventStyle onClick={(e) => e.stopPropagation()}>
      <SliderTitle>
        Напоминание{' '}
        <TextSpanStyle size={16} color='#786464'>
          {useDateFormat(event.start, 'DD MMMM YYYY')}
        </TextSpanStyle>
      </SliderTitle>
      <DialogEventContent>
        <TextSpanStyle>{event.title}</TextSpanStyle>
        {event?.type === 'notify' && (
          <>
            {(!event?.toAll || (event?.toAll && isAdmin)) && (
              <ButtonLink size={12} color='red' onClick={remove}>
                Удалить напоминание
              </ButtonLink>
            )}
          </>
        )}
      </DialogEventContent>
      <DialogEventFooter>
        {event?.type === 'notify' && (
          <ButtonUI
            size='small'
            variant='outline'
            onClick={onClose}
            as={Link}
            to={`edit/${event.UID}`}
          >
            Редактировать
          </ButtonUI>
        )}
        {event?.isRouting && (
          <ButtonUI
            size='small'
            variant='outline'
            as={Link}
            to={`/${event.type}/${event.UID}`}
          >
            Перейти к событию
          </ButtonUI>
        )}
        <ButtonUI size='small' onClick={onClose}>
          Закрыть
        </ButtonUI>
      </DialogEventFooter>
    </DialogEventStyle>
  );
};

export default DialogEvent;
