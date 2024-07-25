import React, { useState } from 'react';
import DialogWindow from 'components/Main/DialogWindow';
import { useDispatch, useSelector } from 'react-redux';
import { closeNews } from '../../store/slices/newsSlice';
import * as S from './style';
import { AnimatePresence } from 'framer-motion';
import NewsItem from './NewsItem';

const News = () => {
  const dispatch = useDispatch();
  const { newsList, isShowNews } = useSelector((state) => state.news);
  const [index, setIndex] = useState(0);
  const _close = () => {
    dispatch(closeNews());
  };
  const _next = () => {
    if (index === newsList.length - 1) {
      _close();
      return;
    }
    setIndex((prevState) => prevState + 1);
  };
  return (
    <DialogWindow open={isShowNews} disabledClose>
      <S.News>
        <AnimatePresence mode='wait'>
          <NewsItem news={newsList[index]} key={index} _next={_next} />
        </AnimatePresence>
      </S.News>
    </DialogWindow>
  );
};

export default News;
