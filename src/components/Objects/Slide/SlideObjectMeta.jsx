import React from 'react';
import { SlideBlockStyle } from '../ObjectsStyle';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import copyUrl, { ReactComponent as Copy } from 'images/copy.svg';
import { useAsyncValue } from 'react-router-dom';

const SlideObjectMeta = () => {
  const object = useAsyncValue();
  const copyID = () => {
    navigator.clipboard.writeText(`http://crm.metragegroup.com?objects=${object.typeEstate}/${object.UID}`);
  }
  return (
    <SlideBlockStyle
      jc='space-between'
    >
      <Box gap="0">
        <IconButton onClick={copyID}>
          <Copy />
        </IconButton>
        <TextSpanStyle size={12}>ID: {object?.UID}</TextSpanStyle>
      </Box>
      <Box>
        <TextSpanStyle size={12}>Создано: {useDateFormat(object?.created, 'DD.MM.YY')}</TextSpanStyle>
        <TextSpanStyle size={12}>Изменено: {useDateFormat(object?.updated, 'DD.MM.YY')}</TextSpanStyle>
      </Box>
    </SlideBlockStyle>
  );
};

export default SlideObjectMeta;