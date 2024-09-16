import React, { useState } from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { CheckboxUI } from 'ui/CheckboxUI';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Copy } from 'images/copy.svg';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';
import { setIsDelete } from '../../../api/ddsApi';
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

const SlideDDSMeta = () => {
  const dds = useAsyncValue();
  console.log(dds);

  const [windowFlag, setWindowFlag] = useState(false);
  const copyID = () => {
    navigator.clipboard.writeText(`http://crm.metragegroup.com?dds=${dds.UID}`);
  };
  const _isDelete = (e) => {
    const isDelete = e.target.checked;
    setIsDelete({
      UID: dds.UID,
      position: isDelete,
    });
  };
  const openWindowFLag = () => {
    setWindowFlag(true);
  };
  const closeWindowFLag = () => {
    setWindowFlag(false);
  };
  const regExp = new RegExp('New', 'i');
  return (
    <SliderBlock>
      <Box jc='space-between'>
        <Box>
          <Box gap='0' jc='flex-start'>
            <IconButton onClick={copyID}>
              <Copy />
            </IconButton>
            <TextSpanStyle size={12}>ID: {dds.UID}</TextSpanStyle>
          </Box>
          {!regExp.test(dds.UID) && (
            <IconFlag $flagColour={dds?.flag} onClick={openWindowFLag} />
          )}
          {dds?.isAccepted && (
            <TextSpanStyle color='green' size={12}>
              Подтверждено получателем
            </TextSpanStyle>
          )}
        </Box>
        <CheckboxUI
          label='Удалена'
          id='isDeleted'
          defaultChecked={dds?.isDeleted || false}
          onChange={_isDelete}
          size='small'
          labelSize={12}
        />
      </Box>
      <DialogWindow open={windowFlag} onClose={closeWindowFLag}>
        <DialogSelectFlag onClose={closeWindowFLag} />
      </DialogWindow>
    </SliderBlock>
  );
};

export default SlideDDSMeta;
