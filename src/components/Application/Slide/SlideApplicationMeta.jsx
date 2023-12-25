import React from 'react';
import { ApplicationBlockStyle } from '../applicationStyle';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
// import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Copy } from 'images/copy.svg';
import { CheckboxUI } from 'ui/CheckboxUI';
import { checkApplication } from '../../../store/applicationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncValue } from 'react-router-dom';
const SlideApplicationMeta = () => {
  const application = useAsyncValue();
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user?.isAdmin || '');
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
  return (
    <ApplicationBlockStyle jc='space-between'>
      <Box gap='0'>
        <IconButton onClick={copyID}>
          <Copy />
        </IconButton>
        <TextSpanStyle size={12}>ID: {application.UID}</TextSpanStyle>
      </Box>
      <CheckboxUI
        size='small'
        position='left'
        label='Проверено'
        labelSize={12}
        defaultChecked={application?.demand?.isChecked === '1'}
        onChange={isCheckedApplication}
        disabled={isAdmin !== '1'}
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
    </ApplicationBlockStyle>
  );
};

export default SlideApplicationMeta;
