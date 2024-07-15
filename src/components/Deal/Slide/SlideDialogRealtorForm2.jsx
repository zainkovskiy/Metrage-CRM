import React from 'react';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { ButtonUI } from 'ui/ButtonUI';

const SlideDialogRealtorForm2 = ({ getValues, onSubmit, setManualForm }) => {
  return (
    <>
      <TextSpanStyle>
        Мы видим что ранее, для данного Риелтора, уже была создана запись с ДДС,
        о выдаче Заработной платы.
      </TextSpanStyle>
      <Box column gap='0'>
        <Box gap='0.2rem' jc='flex-start' fullWidth>
          <TextSpanStyle size={10}>Специалист</TextSpanStyle>
          <TextSpanStyle size={10} bold>
            {getValues('realtorName')}
          </TextSpanStyle>
        </Box>
        <Box gap='0.2rem' jc='flex-start' fullWidth>
          <TextSpanStyle size={10}>Сумма проведённая по ДДС</TextSpanStyle>
          <TextSpanStyle size={10} bold>
            {getValues('comissionSize')} руб.
          </TextSpanStyle>
        </Box>
      </Box>
      <TextSpanStyle bold>
        Заполнить сделку данным фактом автоматически, или Вы предпочтёте сделать
        всё сами?*
      </TextSpanStyle>
      <Box>
        <ButtonUI
          size='small'
          variant='outline'
          fullWidth
          onClick={setManualForm}
        >
          Вручную
        </ButtonUI>
        <ButtonUI size='small' fullWidth onClick={onSubmit}>
          Автоматически
        </ButtonUI>
      </Box>
      <TextSpanStyle size={10}>
        * в случае “Частичного” расчета - обязательно выбирайте “Ручной” режим
      </TextSpanStyle>
    </>
  );
};

export default SlideDialogRealtorForm2;
