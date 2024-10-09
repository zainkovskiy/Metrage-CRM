import React from 'react';
import * as S from './style';
import { INote, INoteItem } from '../type';
import { ReactComponent as Bell } from '../../../public/images/dashboard_bell.svg';
import { ReactComponent as Mark } from '../../../public/images/dashboard_mark.svg';
import TextUI from '../../../uiTs/TextUI';
import ButtonLink from '../../../uiTs/ButtonLink';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleShowChat } from '../../../store/chatSlice';
const DashboardNote = (props: INote) => {
  const { title, countItems, items, icon } = props;
  const dispatch = useDispatch();
  const openChat = () => {
    dispatch(toggleShowChat(''));
  };
  const getLinkComponent = (note: INoteItem) => {
    if (note.action === 'href') {
      return (
        <ButtonLink size={12} key={note.UID} href={note.target} target='_blank'>
          <S.DashboardNoteText>{note.title}</S.DashboardNoteText>
        </ButtonLink>
      );
    }
    if (note.action === 'filter') {
      return (
        <ButtonLink
          size={12}
          key={note.UID}
          as={Link}
          to='/objects'
          state={{ ...note.filter }}
        >
          <S.DashboardNoteText>{note.title}</S.DashboardNoteText>
        </ButtonLink>
      );
    }
    if (note.action === 'setReaded') {
      return (
        <ButtonLink size={12} key={note.UID} onClick={openChat}>
          <S.DashboardNoteText>{note.title}</S.DashboardNoteText>
        </ButtonLink>
      );
    }
    return;
  };
  return (
    <S.DashboardNote>
      <TextUI size={12} color='grey'>
        {title} ({countItems || 0}):
      </TextUI>
      <S.DashboardNoteWrap>
        <div>
          {icon === 'bell' && <Bell />}
          {icon === 'mark' && <Mark />}
        </div>
        <S.DashboardNoteList>
          {items?.length > 0 && items.map((notice) => getLinkComponent(notice))}
        </S.DashboardNoteList>
      </S.DashboardNoteWrap>
    </S.DashboardNote>
  );
};

export default DashboardNote;
