import React from 'react';
import { useFormState, Controller } from 'react-hook-form';
import * as S from './slideSlide';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { TextSpanStyle } from '../../../styles/styles';
import { ButtonLink } from '../../../ui/ButtonLink/ButtonLink';
const SlideFixationEmpty = ({ title, label, keyName, onClick, showButton }) => {
  const { control } = useFormState();
  return (
    <S.SlideFixationDeveloper>
      <Box jc='space-between' fullWidth>
        <TextSpanStyle size={12} color='rgb(133, 0, 158)'>
          {title}
        </TextSpanStyle>
        {showButton && (
          <ButtonLink size={12} color='rgb(133, 0, 158)' onClick={onClick}>
            Сменить
          </ButtonLink>
        )}
      </Box>
      <Controller
        control={control}
        name={keyName}
        render={({ field }) => (
          <InputUI
            small
            value={field.value || ''}
            onChange={field.onChange}
            label={label}
          />
        )}
      />
    </S.SlideFixationDeveloper>
  );
};

export default SlideFixationEmpty;
