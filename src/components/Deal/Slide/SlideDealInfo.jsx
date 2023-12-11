import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { RealtyTypeTranslate, DealTypeTranslate } from '../keyTranslate';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { Controller, useFormContext } from 'react-hook-form';
import { useNumberTriad } from 'hooks/StringHook';
import { CategoryTranslate } from '../keyTranslate';
import { useDateFormat } from 'hooks/DateFormat';
import { ReactComponent as Done } from 'images/done3.svg';
import { ReactComponent as Circle } from 'images/circle.svg';
import { ButtonLink } from 'ui/ButtonLink';
import DialogWindow from 'components/Main/DialogWindow';
import SlideDialogDDS from './SlideDialogDDS';
import { CheckboxUI } from 'ui/CheckboxUI';

const FeatureTitle = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
`;
const SlideDealInfoContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
`;
const SlideDealInfoSide = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const DoneIcon = styled(Done)`
  width: 15px;
  height: 15px;
  fill: #2ba400;
`;
const CircleIcon = styled(Circle)`
  width: 15px;
  height: 15px;
  fill: #b5b5b5;
`;
const SlideDealInfo = () => {
  const deal = useAsyncValue();
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const openDds = () => {
    setOpen(!open);
  };
  return (
    <SlideBlockStyle $column ai='flex-start'>
      <FeatureTitle>
        Общая информация
        <ButtonLink size={12} color='#85009E' onClick={openDds}>
          ДДС
        </ButtonLink>
      </FeatureTitle>
      <TextSpanStyle bold color='#85009E'>
        {deal?.grossTitle}
      </TextSpanStyle>
      <div style={{ width: '100%' }}>
        <Box wrap jc='space-between'>
          <Box ai='flex-start'>
            <TextSpanStyle size={10} bold>
              Тип сделки:
            </TextSpanStyle>
            <TextSpanStyle size={10}>
              {deal?.dealType ? DealTypeTranslate[deal.dealType] : ''}
            </TextSpanStyle>
          </Box>
          <Box ai='flex-start'>
            <TextSpanStyle size={10} bold>
              Тип недвижимости:
            </TextSpanStyle>
            <TextSpanStyle size={10}>
              {deal?.realtyType ? RealtyTypeTranslate[deal.realtyType] : ''}
            </TextSpanStyle>
          </Box>
          <Box ai='flex-start'>
            <TextSpanStyle size={10} bold>
              Тип объекта:
            </TextSpanStyle>
            <TextSpanStyle size={10}>
              {deal?.objectParams?.Category
                ? CategoryTranslate[deal?.objectParams?.Category]
                : ''}
            </TextSpanStyle>
          </Box>
        </Box>
      </div>
      <SlideDealInfoContent>
        <SlideDealInfoSide>
          <Controller
            name='plannedDate'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Планируемая дата закрытия'
                value={field.value}
                type='date'
                small
                labelSize={12}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <Controller
            name='actualDate'
            control={control}
            render={({ field }) => (
              <InputUI
                fullWidth
                label='Фактическая дата закрытия'
                value={field.value}
                type='date'
                small
                labelSize={12}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
        </SlideDealInfoSide>
        <SlideDealInfoSide>
          <Controller
            name='objectCost'
            control={control}
            render={({ field }) => (
              <InputUI
                small
                label='Стоимость объекта, руб'
                labelSize={12}
                value={field.value ? useNumberTriad(field.value || 0) : ''}
                onChange={(e) =>
                  field.onChange(parseInt(e.target.value.split(' ').join('')))
                }
                fullWidth
              />
            )}
          />
          <Controller
            name='agencyComission'
            control={control}
            render={({ field }) => (
              <InputUI
                small
                label='Комиссия агентства, руб'
                labelSize={12}
                value={field.value ? useNumberTriad(field.value || 0) : ''}
                onChange={(e) =>
                  field.onChange(parseInt(e.target.value.split(' ').join('')))
                }
                fullWidth
              />
            )}
          />
        </SlideDealInfoSide>
        <SlideDealInfoSide>
          <Box jc='flex-start' wrap>
            <Box gap='0.2rem'>
              {deal?.agentsCalculated ? <DoneIcon /> : <CircleIcon />}
              <TextSpanStyle size={12}>
                Агенты рассчитаны полностью
              </TextSpanStyle>
            </Box>
            <TextSpanStyle size={12} nowrap>
              {useDateFormat(deal?.agentsCalculatedDate, 'DD.MM.YYY')}
            </TextSpanStyle>
          </Box>{' '}
          <Controller
            name='alwaysBrand'
            control={control}
            render={({ field }) => (
              <CheckboxUI
                label='Показать Брэнд-менеджеру'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                defaultChecked={field.value || false}
                id='alwaysBrand'
                size='small'
                labelSize={12}
              />
            )}
          />
        </SlideDealInfoSide>
        <SlideDealInfoSide>
          <Box jc='flex-start' wrap>
            <Box gap='0.2rem'>
              {deal?.lawyerCalculated ? <DoneIcon /> : <CircleIcon />}
              <TextSpanStyle size={12}>
                Юристы рассчитаны полностью
              </TextSpanStyle>
            </Box>
            <TextSpanStyle size={12} nowrap>
              {useDateFormat(deal?.lawyerCalculatedDate, 'DD.MM.YYY')}
            </TextSpanStyle>
          </Box>
          <Controller
            name='alwaysBroker'
            control={control}
            render={({ field }) => (
              <CheckboxUI
                label='Показать Ипотечному брокеру'
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                defaultChecked={field.value || false}
                id='alwaysBroker'
                size='small'
                labelSize={12}
              />
            )}
          />
        </SlideDealInfoSide>
      </SlideDealInfoContent>
      <DialogWindow open={open} onClose={openDds}>
        <SlideDialogDDS UID={deal?.UID} onClose={openDds} />
      </DialogWindow>
    </SlideBlockStyle>
  );
};

export default SlideDealInfo;
