import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { CheckboxUI } from 'ui/CheckboxUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import {
  SelectLaag,
  SelectLaagItemUI,
} from '../../../ui/SelectLaag/SelectLaag';
import { InputUI } from 'ui/InputUI';
import { Controller, useFormContext, useFormState } from 'react-hook-form';

const AdPlatform = styled.div`
  padding: 0.5rem 0;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  &:last-child {
    border: none;
  }
`;
const PlatformImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

const SlideDialogAdPlatform = ({ platform, idx }) => {
  const { getValues, watch, control } = useFormContext();
  watch(`platforms[${idx}].isChecked`);
  watch(`platforms[${idx}].promotion.isChecked`);
  return (
    <AdPlatform>
      <Box jc='space-between'>
        <Box ai='flex-start'>
          <PlatformImage src={platform?.picture} />
          <Controller
            name={`platforms[${idx}].isChecked`}
            control={control}
            render={({ field }) => (
              <CheckboxUI
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                size='small'
              />
            )}
          />
        </Box>
        <Box column ai='flex-end' gap='0'>
          <TextSpanStyle>{platform?.title}</TextSpanStyle>
          {platform?.exponationDate && (
            <TextSpanStyle size={12}>
              до {platform.exponationDate}
            </TextSpanStyle>
          )}
        </Box>
      </Box>
      <Controller
        name={`platforms[${idx}].exponation`}
        control={control}
        render={({ field }) => (
          <SelectLaag
            small
            select={field.value}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            disabled={!getValues(`platforms[${idx}].isChecked`)}
          >
            {platform.exponationList.map((item) => (
              <SelectLaagItemUI value={item} key={item}>
                {item}
              </SelectLaagItemUI>
            ))}
          </SelectLaag>
        )}
      />
      {platform?.promotion?.isVisible && (
        <>
          <Box jc='space-between'>
            <TextSpanStyle>Продвижение</TextSpanStyle>
            <Controller
              name={`platforms[${idx}].promotion.isChecked`}
              control={control}
              render={({ field }) => (
                <CheckboxUI
                  checked={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                  size='small'
                  disabled={!platform?.promotion?.isActive}
                />
              )}
            />
          </Box>
          <Controller
            name={`platforms[${idx}].promotion.promoteDate`}
            control={control}
            render={({ field }) => (
              <InputUI
                small
                value={field.value || ''}
                onChange={field.onChange}
                type='date'
                disabled={
                  !(
                    getValues(`platforms[${idx}].promotion.isChecked`) &&
                    platform?.promotion?.isActive
                  )
                }
              />
            )}
          />
        </>
      )}
    </AdPlatform>
  );
};

export default SlideDialogAdPlatform;
