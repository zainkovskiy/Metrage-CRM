import React from 'react';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { CheckboxUI } from 'ui/CheckboxUI';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Copy } from 'images/copy.svg';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';
import { setIsDelete } from '../../../api/ddsApi';

const SlideDDSMeta = () => {
  const dds = useAsyncValue();
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
  return (
    <SliderBlock>
      <Box jc='space-between'>
        <Box gap='0' jc='flex-start'>
          <IconButton onClick={copyID}>
            <Copy />
          </IconButton>
          <TextSpanStyle size={12}>ID: {dds.UID}</TextSpanStyle>
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
    </SliderBlock>
  );
};

export default SlideDDSMeta;
