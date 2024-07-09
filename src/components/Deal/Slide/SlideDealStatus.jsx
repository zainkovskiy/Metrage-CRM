import React, { useState } from 'react';
import { SlideBlockStyle } from '../DealStyle';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';
import { StatusBar, StatusBarItem } from '../../../ui/StatusBar/StatusBar';
import { setDealStage } from '../../../api/dealAPI';
import { useAsyncValue } from 'react-router-dom';
import SlideDealStatusSend from './SlideDealStatusSend';

const StatusBarContainer = ({ children }) => {
  return <div style={{ position: 'relative' }}>{children}</div>;
};

const SlideDealStatus = () => {
  const deal = useAsyncValue();
  const [activeStepper, setActiveStepper] = useState(
    deal?.dealStatusId - 1 || 0
  );
  const [openWindowFailure, setOpenWindowFailure] = useState(false);
  const changeStepper = (idx) => {
    setDealStage({
      StageId: idx + 1,
      UID: deal.UID,
    });
    setActiveStepper(idx);
  };
  const openFailureBlock = () => {
    if (activeStepper < 0) {
      changeStepper(0);
      return;
    }
    setOpenWindowFailure(true);
  };
  const closeFailureBlock = () => {
    setOpenWindowFailure(false);
  };
  const setSendStatus = (reason) => {
    setDealStage({
      StageId: 0,
      UID: deal.UID,
      ...reason,
    });
    setActiveStepper(-1);
    closeFailureBlock();
  };
  return (
    <SlideBlockStyle>
      <Box column ai='normal' fullWidth>
        <StatusBar activeStep={activeStepper} disabled={activeStepper < 0} wrap>
          <StatusBarItem title='Закрепление' onClick={changeStepper} />
          <StatusBarItem title='ПДКП (бронь)' onClick={changeStepper} />
          <StatusBarItem title='ДКП' onClick={changeStepper} />
          <StatusBarItem title='Акт подписан' onClick={changeStepper} />
          <StatusBarItem title='Оплачено' onClick={changeStepper} />
        </StatusBar>
        <Box jc='flex-end' fullWidth>
          <StatusBarContainer>
            <ButtonLink onClick={openFailureBlock} size={12}>
              {activeStepper < 0 ? 'Вернуть из срыва' : 'Отправить в Срыв'}
            </ButtonLink>
            {openWindowFailure && (
              <SlideDealStatusSend
                onClose={closeFailureBlock}
                setSendStatus={setSendStatus}
              />
            )}
          </StatusBarContainer>
        </Box>
      </Box>
    </SlideBlockStyle>
  );
};

export default SlideDealStatus;
