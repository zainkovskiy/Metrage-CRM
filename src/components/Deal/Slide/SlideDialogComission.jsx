import React, { useState } from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import { ButtonUI } from 'ui/ButtonUI';
import { device } from 'styles/device';
import { InputUI } from 'ui/InputUI';
import { useForm, Controller } from 'react-hook-form';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';

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
  @media ${device.tablet} {
    width: 80vw;
  }
`;
const SlideDialogComissiontHeader = styled.div`
  padding: 0.5rem 0.5rem 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SlideDialogComissiontFooter = styled.div`
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
`;
const SlideDialogComissiontContent = styled.div`
  padding: 0.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const SlideDialogComission = ({ onClose, comission, side, onChange, type }) => {
  const [currentSide, setCurrentSide] = useState(side || '');
  const [currentComission, setCurrentComission] = useState(comission || '');

  const onSubmit = () => {
    let changeObject = {
      comissionSize: currentComission,
    };
    if (type === 'realtor') {
      changeObject = { ...changeObject, side: currentSide };
    }
    onChange(changeObject);
  };
  return (
    <SlideDialogComissiontStyle onClick={(e) => e.stopPropagation()}>
      <SlideDialogComissiontHeader>
        <TextSpanStyle>
          {type === 'realtor' ? 'Комиссия' : 'Оплата юриста'}
        </TextSpanStyle>
        <CloseButtonStyle src={closeUrl} onClick={onClose} />
      </SlideDialogComissiontHeader>
      <SlideDialogComissiontContent>
        <InputUI
          AutoComplete
          small
          type='number'
          onChange={(e) => setCurrentComission(e.target.value)}
          value={currentComission}
        />
        {type === 'realtor' && (
          <SelectUI
            onChange={(newValue) => setCurrentSide(newValue)}
            select={currentSide}
            label='Сторона сделки'
            small
          >
            <SelectItemUI value='seller'>Продавец</SelectItemUI>
            <SelectItemUI value='buyer'>Покупатель</SelectItemUI>
          </SelectUI>
        )}
      </SlideDialogComissiontContent>
      <SlideDialogComissiontFooter>
        <ButtonUI size='small' onClick={onClose} fullWidth>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' onClick={onSubmit} variant='outline' fullWidth>
          Сохранить
        </ButtonUI>
      </SlideDialogComissiontFooter>
    </SlideDialogComissiontStyle>
  );
};

export default SlideDialogComission;
