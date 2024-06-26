import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TextSpanStyle } from 'styles/styles';
import { CheckboxUI } from 'ui/CheckboxUI';
import InputText from '../../../ui/InputText/InputText';
import { LabelStyle } from 'ui/InputUI/InputUIStyled';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { Controller, useFormContext } from 'react-hook-form';
import { ButtonLink } from 'ui/ButtonLink';
import {
  ButtonToggleGroup,
  ButtonToggleItem,
} from 'ui/ButtonToggle/ButtonToggle';
import styled from 'styled-components';
import SlideMortageBid from './SlideMortageBid';
import { useAsyncValue } from 'react-router-dom';
import MortageLoader from './MortageLoader';

const MortageCredit = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const CreditLine = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;
const CreditField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const SlideMortageCredit = ({ openWindowBid }) => {
  const [change, setChange] = useState(false);
  const { mortgageCreate } = useSelector((state) => state.user);
  const mortage = useAsyncValue();
  const { credit } = mortage;
  const { control } = useFormContext();
  const openWindowBidNew = () => {
    openWindowBid('new');
  };
  const addFile = (file) => {
    mortage.credit.documents = [...mortage.credit.documents, ...file];
    setChange(!change);
  };
  const deleteFile = (file) => {
    mortage.credit.documents = mortage.credit.documents.filter(
      (curFile) => curFile.UID !== file.UID
    );
    setChange(!change);
  };
  return (
    <MortageCredit>
      <SliderTitle>Кредит</SliderTitle>
      <div>
        <CreditLine>
          <CreditField>
            <TextSpanStyle size={12} nowrap>
              Стоимость объекта:
            </TextSpanStyle>
            <Controller
              name='credit.objectCost'
              control={control}
              render={({ field }) => {
                return (
                  <InputText
                    size={12}
                    value={field.value || ''}
                    onChange={field.onChange}
                    disabled={!mortgageCreate}
                  />
                );
              }}
            />
          </CreditField>
          <CreditField>
            <TextSpanStyle size={12} nowrap>
              ПВ:
            </TextSpanStyle>
            <Controller
              name='credit.PV'
              control={control}
              render={({ field }) => {
                return (
                  <InputText
                    size={12}
                    value={field.value || ''}
                    onChange={field.onChange}
                    disabled={!mortgageCreate}
                  />
                );
              }}
            />
          </CreditField>
        </CreditLine>
        <CreditLine>
          <CreditField>
            <TextSpanStyle size={12} nowrap>
              Сумма кредита:
            </TextSpanStyle>
            <Controller
              name='credit.creditSumm'
              control={control}
              render={({ field }) => {
                return (
                  <InputText
                    size={12}
                    value={field.value || ''}
                    onChange={field.onChange}
                    disabled={!mortgageCreate}
                  />
                );
              }}
            />
          </CreditField>
          <CreditField>
            <TextSpanStyle size={12} nowrap>
              Срок кредита:
            </TextSpanStyle>
            <Controller
              name='credit.creditTime'
              control={control}
              render={({ field }) => {
                return (
                  <InputText
                    size={12}
                    value={field.value || ''}
                    onChange={field.onChange}
                    disabled={!mortgageCreate}
                  />
                );
              }}
            />
          </CreditField>
        </CreditLine>
        <CreditLine>
          <CreditField>
            <TextSpanStyle size={12} nowrap>
              Тип жилья:
            </TextSpanStyle>
            <Controller
              name='credit.typeRealty'
              control={control}
              render={({ field }) => {
                return (
                  <InputText
                    size={12}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={!mortgageCreate}
                  />
                );
              }}
            />
          </CreditField>
          <CreditField>
            <TextSpanStyle size={12} nowrap>
              Объект:
            </TextSpanStyle>
            <Controller
              name='credit.object.address'
              control={control}
              render={({ field }) => {
                return (
                  <InputText
                    size={12}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={!mortgageCreate}
                  />
                );
              }}
            />
          </CreditField>
        </CreditLine>
        <CreditLine>
          <Controller
            name='credit.isFullDoc'
            control={control}
            render={({ field }) => {
              return (
                <CheckboxUI
                  disabled={!mortgageCreate}
                  size='small'
                  labelSize={12}
                  checked={field.value}
                  onChange={field.onChange}
                  label='Комплект док-ов полный:'
                />
              );
            }}
          />
        </CreditLine>
      </div>
      <LabelStyle labelSize={12}>
        У кого оригиналы док-ов
        <Controller
          control={control}
          name='credit.whoHasOriginal'
          render={({ field }) => (
            <ButtonToggleGroup fullWidth disabled={!mortgageCreate}>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='Агент'
                active={field.value}
              >
                Агент
              </ButtonToggleItem>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='Брокер'
                active={field.value}
              >
                Брокер
              </ButtonToggleItem>
              <ButtonToggleItem
                onClick={(e) => field.onChange(e.target.id)}
                id='Клиент'
                active={field.value}
              >
                Клиент
              </ButtonToggleItem>
            </ButtonToggleGroup>
          )}
        />
      </LabelStyle>
      <MortageLoader
        files={credit?.documents || []}
        raw={{
          entityId: mortage.UID,
          entityType: 'mortgage',
        }}
        deleteFile={deleteFile}
        addFile={addFile}
      />
      <SliderTitle>
        Заявки
        {mortgageCreate && (
          <ButtonLink
            size={12}
            color='rgb(133, 0, 158)'
            onClick={openWindowBidNew}
          >
            Добавить
          </ButtonLink>
        )}
      </SliderTitle>
      {credit?.bids.map((bid) => (
        <SlideMortageBid
          bid={bid}
          key={bid.UID}
          openWindowBid={openWindowBid}
        />
      ))}
    </MortageCredit>
  );
};

export default SlideMortageCredit;
