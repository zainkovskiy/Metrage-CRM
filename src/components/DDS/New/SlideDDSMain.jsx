import React, { useState, useRef } from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { InputUI } from 'ui/InputUI';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';
import { Controller, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import SliderAvatar from './SliderAvatar';
import { useAsyncValue } from 'react-router-dom';
import { getBankList } from '../../../api/search';
import SlideDDSDeal from './SlideDDSDeal';
import { TextSpanStyle } from 'styles/styles';

const FieldsLine = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
  ${({ $notGapRow }) => $notGapRow && 'row-gap: 0;'};
`;
const SlideDDSMain = () => {
  const dds = useAsyncValue();
  const { control } = useFormContext();
  const [bankList, setBankList] = useState([]);
  const bankRequest = useRef(false);

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
  const regExp = new RegExp('New', 'i');
  return (
    <SliderBlock>
      <SliderTitle>
        Общее
        {regExp.test(dds.UID) && (
          <TextSpanStyle size={12}>
            В кассе: {dds.onCash || 0} руб
          </TextSpanStyle>
        )}
      </SliderTitle>
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
      <SlideDDSDeal />
    </SliderBlock>
  );
};

export default SlideDDSMain;
