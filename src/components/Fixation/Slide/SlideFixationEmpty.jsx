import React from 'react';
import { useFormState, Controller } from 'react-hook-form';
import * as S from './slideSlide';
import * as N from '../New/styleNew';
import { Box } from 'ui/Box';
import { TextSpanStyle } from '../../../styles/styles';
import { ButtonLink } from '../../../ui/ButtonLink/ButtonLink';
import { LabelStyle } from '../../../ui/InputUI/InputUIStyled';
import { useAsyncValue } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SlideFixationEmpty = ({
  title,
  label,
  keyName,
  onClick,
  showButton,
  buttonTitle,
}) => {
  const fixation = useAsyncValue();
  const { UID } = useSelector((state) => state.user);
  const isNotAdmin = UID !== fixation?.broker?.UID;
  const { control } = useFormState();
  return (
    <S.SlideFixationDeveloper>
      <Box jc='space-between' fullWidth>
        <TextSpanStyle size={12} color='rgb(133, 0, 158)'>
          {title}
        </TextSpanStyle>
        {showButton && (
          <ButtonLink size={12} color='rgb(133, 0, 158)' onClick={onClick}>
            {buttonTitle || 'Сменить'}
          </ButtonLink>
        )}
      </Box>
      <TextSpanStyle color='red' size='12' align='end'>
        {label}
      </TextSpanStyle>
      <Controller
        control={control}
        name={keyName}
        render={({ field }) => (
          <LabelStyle>
            Информация от риелтора:
            <N.TextAreaStyle
              value={field?.value || ''}
              onChange={field.onChange}
              rows={4}
              disabled={isNotAdmin}
            />
          </LabelStyle>
        )}
      />
    </S.SlideFixationDeveloper>
  );
};

export default SlideFixationEmpty;
