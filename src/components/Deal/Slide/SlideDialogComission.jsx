import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import { ButtonUI } from 'ui/ButtonUI';
import { device } from 'styles/device';
import { InputUI } from 'ui/InputUI';
import { useForm } from 'react-hook-form';

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
const SlideDialogComissiontStyle = styled.form`
  background-color: #fff;
  width: 30vw;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
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
`;
const SlideDialogComission = ({ onClose, comission, onChange }) => {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    onChange(data);
  };
  return (
    <SlideDialogComissiontStyle
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <SlideDialogComissiontHeader>
        <TextSpanStyle>Комиссия</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} onClick={onClose} />
      </SlideDialogComissiontHeader>
      <SlideDialogComissiontContent>
        <InputUI
          defaultValue={comission}
          AutoComplete
          small
          type='number'
          {...register('comissionSize')}
        />
      </SlideDialogComissiontContent>
      <SlideDialogComissiontFooter>
        <ButtonUI size='small' onClick={onClose} fullWidth>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' variant='outline' type='submit' fullWidth>
          Сохранить
        </ButtonUI>
      </SlideDialogComissiontFooter>
    </SlideDialogComissiontStyle>
  );
};

export default SlideDialogComission;