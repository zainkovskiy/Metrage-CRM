import React from 'react';
import styled from 'styled-components';
import { Controller, useFormContext } from 'react-hook-form';
import InputText from 'ui/InputText/InputText';

const Title = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const SlideDealTitle = () => {
  const { control } = useFormContext();
  return (
    <Controller
      name='dealTitle'
      control={control}
      render={({ field }) => (
        <InputText
          align='start'
          size={18}
          value={field.value}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
        />
      )}
    />
  );
};

export default SlideDealTitle;
