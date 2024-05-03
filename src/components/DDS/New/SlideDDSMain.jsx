import React, { useState, useRef } from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { InputUI } from 'ui/InputUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import SliderAvatar from './SliderAvatar';
import { useAsyncValue } from 'react-router-dom';
import { getBankList, getLegalList } from '../../../api/search';
import DialogWindow from 'components/Main/DialogWindow';
import DealFinder from 'components/Main/DealFinder';

const FieldsLine = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
  ${({ $notGapRow }) => $notGapRow && 'row-gap: 0;'};
`;
const SlideDDSMain = () => {
  const dds = useAsyncValue();
  const { control, setValue } = useFormContext();
  const [legalList, setLegalList] = useState([]);
  const legalRequest = useRef(false);
  const [bankList, setBankList] = useState([]);
  const bankRequest = useRef(false);
  const [open, setOpen] = useState(false);

  const reqLegalList = (value) => {
    if (value.length < 2) {
      setLegalList([]);
      return;
    }
    if (legalRequest.current) {
      return;
    }
    legalRequest.current = true;
    getLegalList(value)
      .then((data) => {
        setLegalList(data);
      })
      .finally(() => {
        legalRequest.current = false;
      });
  };

  const reqBankList = (value) => {
    if (value.length < 2) {
      setBankList([]);
      return;
    }
    if (bankRequest.current) {
      return;
    }
    bankRequest.current = true;
    getBankList(value)
      .then((data) => {
        setBankList(data);
      })
      .finally(() => {
        bankRequest.current = false;
      });
  };
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
  };
  return (
    <SliderBlock>
      <SliderTitle>Общее</SliderTitle>
      <FieldsLine>
        <Controller
          name='reportDate'
          control={control}
          render={({ field }) => (
            <InputUI
              {...field}
              label='Дата записи'
              type='date'
              fullWidth
              small
            />
          )}
        />

        <InputUI
          value={dds.deal.title || ''}
          placeholder='Выбрать'
          label='Сделка'
          fullWidth
          small
          readOnly
          onClick={openChangeWindow}
        />
      </FieldsLine>
      <FieldsLine>
        <Controller
          name='legal'
          control={control}
          render={({ field }) => (
            <SelectAutoсompleteUI
              label='Юр.лицо'
              options={legalList}
              getOptionsLabel={(options) => options.name}
              onChange={(option) => field.onChange(option)}
              value={field.value}
              inputChange={reqLegalList}
              small
            />
          )}
        />
        <Controller
          name='bank'
          control={control}
          render={({ field }) => (
            <SelectAutoсompleteUI
              label='Банк/касса'
              options={bankList}
              getOptionsLabel={(options) => options.name}
              onChange={(option) => field.onChange(option)}
              value={field.value}
              inputChange={reqBankList}
              small
            />
          )}
        />
      </FieldsLine>
      <FieldsLine $notGapRow>
        <SliderAvatar
          role='Автор'
          avatarData={dds.reportingUser}
          keySubtitle='office'
        />
        <div></div>
      </FieldsLine>
      <DialogWindow open={open} onClose={closeChangeWindow}>
        <div onClick={(e) => e.stopPropagation()}>
          <DealFinder onClose={closeChangeWindow} onChange={changeTargetUser} />
        </div>
      </DialogWindow>
    </SliderBlock>
  );
};

export default SlideDDSMain;
