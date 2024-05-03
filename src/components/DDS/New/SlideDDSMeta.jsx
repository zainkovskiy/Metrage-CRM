import React from 'react';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Copy } from 'images/copy.svg';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';

const SlideDDSMeta = () => {
  const dds = useAsyncValue();
  const copyID = () => {
    navigator.clipboard.writeText(`http://crm.metragegroup.com?dds=${dds.UID}`);
  };
  return (
    <SliderBlock>
      <Box gap='0' jc='flex-start'>
        <IconButton onClick={copyID}>
          <Copy />
        </IconButton>
        <TextSpanStyle size={12}>ID: {dds.UID}</TextSpanStyle>
      </Box>
    </SliderBlock>
  );
};

export default SlideDDSMeta;
