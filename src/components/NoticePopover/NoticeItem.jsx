import React, { useEffect, useRef, useState } from 'react';
import * as S from './styled';
import { useDispatch } from 'react-redux';
import { removeNotice } from '../../store/slices/noticeSlice';
import { TextSpanStyle } from 'styles/styles';

const NoticeItem = ({ notice }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    removeSelf();
  }, []);
  const removeSelf = () => {
    setTimeout(() => {
      dispatch(removeNotice(notice.UID));
    }, 2000);
  };
  return (
    <S.NoticeItem
      id='notice'
      $x={top}
      initial={{ scale: 0 }}
      exit={{ scale: 0 }}
      animate={{ scale: 1 }}
      layout
    >
      <TextSpanStyle color='#ccc' size={12}>
        Уведомление
      </TextSpanStyle>
      <S.NoticeText>{notice.message}</S.NoticeText>
    </S.NoticeItem>
  );
};

export default NoticeItem;
