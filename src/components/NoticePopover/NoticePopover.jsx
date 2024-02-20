import React from 'react';
import { useSelector } from 'react-redux';
import NoticeItem from './NoticeItem';
import { AnimatePresence } from 'framer-motion';
import * as S from './styled';

const NoticePopover = () => {
  const notices = useSelector((state) => state.notice.notices);
  return (
    <S.NoticePopoverContainer>
      <AnimatePresence>
        {notices.map((notice) => (
          <NoticeItem notice={notice} key={notice.UID} />
        ))}
      </AnimatePresence>
    </S.NoticePopoverContainer>
  );
};

export default NoticePopover;
