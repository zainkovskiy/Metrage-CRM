import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { TextSpanStyle } from 'styles/styles';
import { ButtonLink } from 'ui/ButtonLink';
import { Box } from 'ui/Box';
import styled from 'styled-components';
import { useNumberTriad } from 'hooks/StringHook';
import DialogWindow from 'components/Main/DialogWindow';
import DealFinder from 'components/Main/DealFinder';
import { dealOperational } from '../../../api/ddsApi';

const DDSDeal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.5rem;
`;
const DDSDealWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 5px;
  padding: 0.5rem;
`;

const SlideDDSDeal = () => {
  const { setValue, watch } = useFormContext();
  const dds = useAsyncValue();
  const [open, setOpen] = useState(false);
  const openChangeWindow = () => {
    setOpen(true);
  };
  const closeChangeWindow = () => {
    setOpen(false);
  };
  const changeTargetUser = (deal) => {
    dds.deal = deal;
    setValue('deal', deal, {
      shouldDirty: true,
    });
    closeChangeWindow();
    dealOperational(dds?.deal?.UID).then((operation) => {
      dds.operation = operation;
      setValue('operation', operation);
    });
  };
  watch('deal');
  return (
    <DDSDeal>
      <Box jc='space-between'>
        <TextSpanStyle>Сделка</TextSpanStyle>
        <ButtonLink
          size={12}
          color='rgb(133, 0, 158)'
          onClick={openChangeWindow}
        >
          Изменить
        </ButtonLink>
      </Box>
      <DDSDealWrap>
        {dds?.deal ? (
          <>
            <TextSpanStyle bold>{dds?.deal?.title}</TextSpanStyle>
            <Box jc='space-between'>
              <Box>
                <TextSpanStyle>Тип:</TextSpanStyle>
                <TextSpanStyle bold>{dds?.deal?.dealType}</TextSpanStyle>
              </Box>
              <Box>
                <TextSpanStyle>Номер сделки:</TextSpanStyle>
                <TextSpanStyle bold>{dds?.deal?.UID}</TextSpanStyle>
              </Box>
            </Box>
            <Box jc='flex-start'>
              <TextSpanStyle>Вал по сделке:</TextSpanStyle>
              <TextSpanStyle bold>
                {useNumberTriad(dds?.deal?.agencyComission || 0)} руб.
              </TextSpanStyle>
            </Box>
          </>
        ) : (
          <TextSpanStyle align='center'>Не указана</TextSpanStyle>
        )}
      </DDSDealWrap>
      <DialogWindow open={open} onClose={closeChangeWindow}>
        <div onClick={(e) => e.stopPropagation()}>
          <DealFinder onClose={closeChangeWindow} onChange={changeTargetUser} />
        </div>
      </DialogWindow>
    </DDSDeal>
  );
};

export default SlideDDSDeal;
