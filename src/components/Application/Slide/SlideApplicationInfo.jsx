import React, { useState } from 'react';
import styled from 'styled-components';
import { useAsyncValue } from 'react-router-dom';
import { useDateFormat } from 'hooks/DateFormat';
import {
  ApplicationBlockStyle,
  ApplicationSlideSide,
} from '../applicationStyle';
import { SliderTitle } from '../../../styles/slider';
import { ReactComponent as Celendar } from 'images/calendar2.svg';
import { TextSpanStyle } from 'styles/styles';
import { IconButton } from 'ui/IconButton';
import { Box } from 'ui/Box';
import ApplicationNextContact from '../ApplicationNextContact';
import DialogWindow from 'components/Main/DialogWindow';
import { ButtonLink } from 'ui/ButtonLink';
import SlideApplicationCalls from './SlideApplicationCalls';

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
`;

const SlideApplicationInfo = () => {
  const application = useAsyncValue();
  const [isShowNextContact, setIsShowNextContact] = useState(false);
  const [openCalls, setOenCalls] = useState(false);
  const toggleShowNextContact = () => {
    setIsShowNextContact(!isShowNextContact);
  };
  const toggleShowCalls = () => {
    setOenCalls(!openCalls);
  };
  return (
    <>
      <ApplicationBlockStyle $column jc='flex-start'>
        <SliderTitle>Информация</SliderTitle>
        <Box column gap='0' ai='flex-start' jc='space-between' fullWidth>
          <Box wrap jc='space-between' gap='0' fullWidth>
            <TextSpanStyle size={10} color='#8d8d8d'>
              Создана: {useDateFormat(application?.created, 'DD.MM.YYYY')}
            </TextSpanStyle>
            <TextSpanStyle size={10} color='#8d8d8d'>
              Активность:{' '}
              {useDateFormat(application?.updated, 'DD.MM.YYYY HH:mm')}
            </TextSpanStyle>
          </Box>
          <Box gap='0.3rem'>
            <TextSpanStyle size={12}>
              Всего контактов: {application?.contactCount || 0}
            </TextSpanStyle>
            <ButtonLink size={12} color='#84019e' onClick={toggleShowCalls}>
              Звонки: {application?.callCount || 0}
            </ButtonLink>
          </Box>
          <Box jc='flex-start' wrap gap='0'>
            <TextSpanStyle size={12}>Следующий контакт: &nbsp;</TextSpanStyle>
            <Box>
              <TextSpanStyle size={12}>
                {application?.demand?.nextContact
                  ? useDateFormat(application?.demand?.nextContact)
                  : 'установить'}
              </TextSpanStyle>
              <IconButton onClick={toggleShowNextContact}>
                <Celendar />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Line />
        <Box fullWidth jc='flex-start'>
          <TextSpanStyle bold size={11} fullWidth>
            {application?.demand?.comment}
          </TextSpanStyle>
        </Box>
      </ApplicationBlockStyle>
      <DialogWindow open={isShowNextContact} onClose={toggleShowNextContact}>
        <ApplicationNextContact onClose={toggleShowNextContact} />
      </DialogWindow>
      <DialogWindow open={openCalls} onClose={toggleShowCalls}>
        <SlideApplicationCalls onClose={toggleShowCalls} />
      </DialogWindow>
    </>
  );
};

export default SlideApplicationInfo;
