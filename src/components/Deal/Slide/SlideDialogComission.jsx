import React, { useState } from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { device } from 'styles/device';
import { InputUI } from 'ui/InputUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { useAsyncValue } from 'react-router-dom';
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
const SlideDialogComission = ({
  onClose,
  comission,
  agentVal,
  onChange,
  type,
  user,
}) => {
  const deal = useAsyncValue();
  const [currentSide, setCurrentSide] = useState(user?.side || '');
  const [currentComission, setCurrentComission] = useState(comission || '');
  const [newAgentVal, setNewAgentVal] = useState(agentVal || '');
  const onSubmit = () => {
    let changeObject = {
      comissionSize: currentComission,
    };
    if (type === 'realtor') {
      changeObject = {
        ...changeObject,
        side: currentSide,
        agentVal: newAgentVal,
      };
    }
    onChange(changeObject);
  };
  const getHelperText = () => {
    if (!currentComission || currentComission <= 0) {
      return '0% от общ. комиссии';
    }
    if (!deal?.agencyComission || deal?.agencyComission <= 0) {
      return '0% от общ. комиссии';
    }
    const percent = (
      (parseInt(currentComission) * 100) /
      parseInt(deal.agencyComission)
    ).toFixed(2);
    return `${percent}% от общ. комиссии`;
  };
  return (
    <SlideDialogComissiontStyle onClick={(e) => e.stopPropagation()}>
      <Title>Зарплата</Title>
      <Box jc='flex-end' gap='0.3rem'>
        <TextSpanStyle size={12}>Специалист:</TextSpanStyle>
        <TextSpanStyle bold size={12}>
          {user?.lastName || ''} {user?.firstName || ''}
        </TextSpanStyle>
      </Box>
      {type === 'realtor' && (
        <SelectUI
          onChange={(newValue) => setCurrentSide(newValue)}
          select={currentSide}
          label='Сторона сделки'
          small
        >
          <SelectItemUI value='seller'>Продавец</SelectItemUI>
          <SelectItemUI value='buyer'>Покупатель</SelectItemUI>
          <SelectItemUI value='sellerAndBuyer'>
            Продавец и Покупатель
          </SelectItemUI>
        </SelectUI>
      )}
      {type === 'realtor' && (
        <InputUI
          AutoComplete
          small
          type='number'
          onChange={(e) => setNewAgentVal(e.target.value)}
          value={newAgentVal}
          label='Вал агента'
        />
      )}
      <InputUI
        AutoComplete
        small
        type='number'
        onChange={(e) => setCurrentComission(e.target.value)}
        value={currentComission}
        label='Сумма зарплаты'
        helperText={getHelperText()}
      />
      <SlideDialogComissiontFooter>
        <ButtonUI size='small' onClick={onClose} variant='outline' fullWidth>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' onClick={onSubmit} fullWidth>
          Сохранить
        </ButtonUI>
      </SlideDialogComissiontFooter>
    </SlideDialogComissiontStyle>
  );
};

export default SlideDialogComission;
