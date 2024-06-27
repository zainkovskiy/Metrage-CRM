import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';
import { StatusBar, StatusBarItem } from '../../../ui/StatusBar/StatusBar';
import { SliderBlock } from '../../../styles/slider';
import { changeFixationStage } from '../../../store/slices/fixationSlice';
import SlideFixationStatusSend from './SlideFixationStatusSend';

const StatusBarContainer = (props) => {
  return (
    <div style={{ position: 'relative' }}>
      {React.Children.map(props.children, (child) => {
        if (child) {
          return React.cloneElement(child, { ...child.props, ...props });
        }
      })}
    </div>
  );
};

const SlideFixationStatus = () => {
  const dispatch = useDispatch();
  const { UID } = useSelector((state) => state.user);
  const fixation = useAsyncValue();
  const isNotAdmin = UID !== fixation?.broker?.UID;
  const [openSend, setOpenSend] = useState(false);
  const [activeStepper, setActiveStepper] = useState(
    parseInt(fixation?.stageId) || 0
  );
  const changeStepper = (idx) => {
    dispatch(
      changeFixationStage({
        UID: fixation.UID,
        stageId: idx,
      })
    );
    setActiveStepper(idx);
  };
  const setFailure = () => {
    if (activeStepper === 5) {
      changeStepper(0);
      return;
    }
    changeStepper(5);
  };
  const openSendBlock = () => {
    setOpenSend(true);
  };
  const closeSendBlock = () => {
    setOpenSend(false);
  };
  const setSendStatus = (raw) => {
    dispatch(
      changeFixationStage({
        UID: fixation.UID,
        stageId: 1,
        ...raw,
      })
    );
    closeSendBlock();
    setActiveStepper(1);
  };
  return (
    <SliderBlock>
      <Box fullWidth column>
        <StatusBar
          activeStep={activeStepper}
          disabled={isNotAdmin || activeStepper === 5}
          wrap
          fullWidth
        >
          <StatusBarItem title='Новая' onClick={changeStepper} />
          <StatusBarContainer>
            <StatusBarItem title='Отправлена' onClick={openSendBlock} />
            {openSend && (
              <SlideFixationStatusSend
                onClose={closeSendBlock}
                setSendStatus={setSendStatus}
              />
            )}
          </StatusBarContainer>
          <StatusBarItem title='Подтверждена' onClick={changeStepper} />
          <StatusBarItem title='Исполнено' onClick={changeStepper} />
          <StatusBarItem title='Отказано' onClick={changeStepper} />
          <StatusBarItem title='Срыв' onClick={changeStepper} />
        </StatusBar>
        <Box fullWidth jc='flex-end'>
          <ButtonLink onClick={setFailure} size={12}>
            {activeStepper === 5 ? 'Вернуть из срыва' : 'Отправить в Срыв'}
          </ButtonLink>
        </Box>
      </Box>
    </SliderBlock>
  );
};

export default SlideFixationStatus;
