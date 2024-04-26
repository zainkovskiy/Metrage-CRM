import React, { useState } from 'react';
import { ApplicationBlockStyle } from '../applicationStyle';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Copy } from 'images/copy.svg';
import { CheckboxUI } from 'ui/CheckboxUI';
import { checkApplication } from '../../../store/applicationSlice';
import { useDispatch } from 'react-redux';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Flag } from 'images/demands-flag.svg';
import DialogWindow from 'components/Main/DialogWindow';
import DialogSelectFlag from './DialogSelectFlag';

const IconFlag = styled(Flag)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  fill: ${({ $flagColour }) => $flagColour && $flagColour};
  transition: transform 0.3s;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.05);
    }
    &:active {
      transform: scale(0.9);
    }
  }
  @media (hover: none) {
    &:active {
      transform: scale(0.9);
    }
  }
`;

const SlideApplicationMeta = () => {
  const application = useAsyncValue();
  const dispatch = useDispatch();
  const [windowFlag, setWindowFlag] = useState(false);
  const copyID = () => {
    navigator.clipboard.writeText(
      `http://crm.metragegroup.com?application=${application.UID}`
    );
  };
  const isCheckedApplication = (e) => {
    dispatch(
      checkApplication({
        position: e.target.checked,
        UID: application.UID,
      })
    );
  };
  const openWindowFLag = () => {
    setWindowFlag(true);
  };
  const closeWindowFLag = () => {
    setWindowFlag(false);
  };
  return (
    <ApplicationBlockStyle jc='space-between'>
      <Box>
        <Box gap='0'>
          <IconButton onClick={copyID}>
            <Copy />
          </IconButton>
          <TextSpanStyle size={12}>ID: {application.UID}</TextSpanStyle>
        </Box>
        <IconFlag
          $flagColour={application?.demand?.flagColour}
          onClick={openWindowFLag}
        />
      </Box>
      <CheckboxUI
        size='small'
        position='left'
        label='Проверено'
        labelSize={12}
        defaultChecked={application?.demand?.isChecked === '1'}
        onChange={isCheckedApplication}
        disabled={!application?.rightMakeVerified}
      />
      {/* <TextSpanStyle size={12}>
        Дата срыва: {useDateFormat(lostDate, 'DD.MM.YY')}
      </TextSpanStyle>
      <Box>
        <TextSpanStyle size={12}>
          Создано: {useDateFormat(created, 'DD.MM.YY')}
        </TextSpanStyle>
        <TextSpanStyle size={12}>
          Изменено: {useDateFormat(updated, 'DD.MM.YY')}
        </TextSpanStyle>
      </Box> */}
      <DialogWindow open={windowFlag} onClose={closeWindowFLag}>
        <DialogSelectFlag onClose={closeWindowFLag} />
      </DialogWindow>
    </ApplicationBlockStyle>
  );
};

export default SlideApplicationMeta;
