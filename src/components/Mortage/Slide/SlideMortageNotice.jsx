import React, { useState } from 'react';
import styled from 'styled-components';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { ButtonLink } from 'ui/ButtonLink';
import SlideMortageNoticeItem from './SlideMortageNoticeItem';
import SlideMortageNoticeRemove from './SlideMortageNoticeRemove';
import DialogWindow from 'components/Main/DialogWindow';
import { AnimatePresence } from 'framer-motion';
import SlideMortageNoticeNew from './SlideMortageNoticeNew';
import { addNotify, deleteNotify } from '../../../api/mortageAPI';

const MortageNotice = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SlideMortageNotice = () => {
  const mortage = useAsyncValue();
  const [targetRemove, setTargetRemove] = useState(null);
  const [isOpenNew, setIsOpenNew] = useState(false);
  const toggleNew = () => {
    setIsOpenNew(!isOpenNew);
  };
  const openRemoveWindow = (target) => {
    setTargetRemove(target);
  };
  const closeRemoveWindow = () => {
    setTargetRemove(null);
  };
  const _add = (newNotify) => {
    addNotify({
      UID: mortage.UID,
      ...newNotify,
    })
      .then((notice) => {
        if (!notice) {
          return;
        }
        mortage.notify = [...mortage.notify, notice];
      })
      .finally(() => {
        toggleNew();
      });
  };
  const _remove = () => {
    deleteNotify(targetRemove.UID);
    mortage.notify = mortage.notify.filter(
      (notice) => notice.UID !== targetRemove.UID
    );
    closeRemoveWindow();
  };
  return (
    <MortageNotice>
      <SliderTitle>
        Напоминания
        <ButtonLink size={12} color='rgb(133, 0, 158)' onClick={toggleNew}>
          Добавить
        </ButtonLink>
      </SliderTitle>
      <AnimatePresence>
        {mortage?.notify?.length > 0 &&
          mortage.notify.map((notice) => (
            <SlideMortageNoticeItem
              notice={notice}
              key={notice.UID}
              handleRemove={openRemoveWindow}
            />
          ))}
      </AnimatePresence>
      <DialogWindow open={Boolean(targetRemove)} onClose={closeRemoveWindow}>
        <SlideMortageNoticeRemove
          onClose={closeRemoveWindow}
          _remove={_remove}
        />
      </DialogWindow>
      <DialogWindow open={isOpenNew} onClose={toggleNew}>
        <SlideMortageNoticeNew onClose={toggleNew} _add={_add} />
      </DialogWindow>
    </MortageNotice>
  );
};

export default SlideMortageNotice;
