import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { device } from 'styles/device';
import { InputUI } from 'ui/InputUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { useAsyncValue } from 'react-router-dom';
import { calculationAgent } from '../../../api/dealAPI';
const Title = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
`;
const CloseButtonStyle = styled.img`
  width: 18px;
  height: 18px;
  opacity: 0.5;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;
const SlideDialogComissiontStyle = styled.div`
  background-color: #fff;
  width: 30vw;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
  @media ${device.tablet} {
    width: 80vw;
  }
`;
const SlideDialogComissiontFooter = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const SlideDialogCalculation = ({ onClose, user, type }) => {
  const deal = useAsyncValue();
  const [summ, setSumm] = useState('');
  const [payType, setPayType] = useState('');
  const onSubmit = () => {
    const raw = {
      UID: deal.UID,
      agent: user,
      agentType: type,
      summ: summ,
      payType: payType,
    };
    calculationAgent(raw).finally(() => {
      onClose();
    });
  };
  return (
    <SlideDialogComissiontStyle onClick={(e) => e.stopPropagation()}>
      <Title>Расчёт</Title>
      <Box column ai='flex-end' gap='0'>
        <Box jc='flex-end' gap='0.3rem'>
          <TextSpanStyle size={12}>Специалист:</TextSpanStyle>
          <TextSpanStyle bold size={12}>
            {user?.lastName || ''} {user?.firstName || ''}
          </TextSpanStyle>
        </Box>
        <TextSpanStyle size={10} color='#ccc'>
          Полная сумма оплаты: {user?.comissionSize} руб.
        </TextSpanStyle>
      </Box>
      <InputUI
        AutoComplete
        small
        type='number'
        onChange={(e) => setSumm(e.target.value)}
        value={summ}
        label='Сумма оплаты'
      />
      <SelectUI
        onChange={(newValue) => setPayType(newValue)}
        select={payType}
        label='Тип оплаты'
        small
      >
        <SelectItemUI value='nal'>Наличные</SelectItemUI>
        <SelectItemUI value='beznal'>Безнал</SelectItemUI>
      </SelectUI>
      <SlideDialogComissiontFooter>
        <ButtonUI size='small' onClick={onClose} fullWidth>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' onClick={onSubmit} variant='outline' fullWidth>
          Расчитать
        </ButtonUI>
      </SlideDialogComissiontFooter>
    </SlideDialogComissiontStyle>
  );
};

export default SlideDialogCalculation;
