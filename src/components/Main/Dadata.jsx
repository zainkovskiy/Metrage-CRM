import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { InputStyle, LabelStyle } from 'ui/InputUI/InputUIStyled.js';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';

const InputDadata = styled(InputStyle)`
  border: 1px solid;
  border-color: ${({ theme, error }) => error ? 'red' : theme.color.primary} !important;
  box-shadow: none;
`
const Dadata = ({ onChange, value, label, inputRef, error, disabled, defaultQuery }) => {
  return (
    <LabelStyle fullWidth>
      {label}
      <div>
        <AddressSuggestions
          token={process.env.DADATA_TOKEN}
          ref={inputRef}
          onChange={onChange}
          filterFromBound='region'
          filterToBound='house'
          value={value}
          customInput={InputDadata}
          defaultQuery={defaultQuery}
          renderOption={(suggestion) => { return <TextSpanStyle>{suggestion.value}</TextSpanStyle> }}
          inputProps={{
            error: error && 'error',
            disabled: disabled
          }}
        />
        <TextSpanStyle color='red' size={12}>{error?.message && error.message}</TextSpanStyle>
      </div>
    </LabelStyle>
  );
};

export default Dadata;