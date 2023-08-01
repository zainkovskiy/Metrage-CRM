import React, { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components';
import VisibilityIcon from 'images/visibility.svg';
import VisibilityOffIcon from 'images/visibility_off.svg';
import { TextSpanStyle } from 'styles/styles';
import { LabelStyle, InputStyle, ContainerIcon, ContainerInput, iconStyle } from './InputUIStyled';
import sendUrl, { ReactComponent as Send } from 'images/send.svg';

const VisibilityIconStyle = styled(VisibilityIcon)`
  ${iconStyle};
`
const VisibilityOffIconStyle = styled(VisibilityOffIcon)`
  ${iconStyle};
`

export const InputUI = forwardRef((props, ref) => {
  const { type, label, id, name, helperText, error, fullWidth, disabled, register, width, icon, value, onChange, onFocus, readOnly, defaultValue, placeholder, small } = props;
  const InputComponent = getInputComponent(type);
  return (
    <LabelStyle fullWidth={fullWidth} width={width}>
      {label}
      <ContainerInput>
        <InputComponent
          ref={ref}
          type={type || 'text'}
          disabled={disabled}
          register={register}
          error={error}
          icon={icon}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          readOnly={readOnly ? true : false}
          defaultValue={defaultValue}
          placeholder={placeholder}
          small={small}
          id={id}
          name={name}
        />
        {
          helperText &&
          <TextSpanStyle color='#7a7a7a' size={12}>{helperText}</TextSpanStyle>
        }
        <TextSpanStyle color='red' size={12}>{error?.message && error.message}</TextSpanStyle>
      </ContainerInput>
    </LabelStyle>
  )
})
const getInputComponent = (type) => {
  switch (type) {
    case 'password':
      return InputPassword;
    default:
      return InputCustom;
  }
}
const InputPassword = forwardRef((props, ref) => {
  const { type, disabled, register, error, value, onChange, small, id, name } = props;
  const [currentType, setCurrentType] = useState(type);
  const showPassword = () => {
    setCurrentType(currentType === 'password' ? 'text' : 'password');
  }
  return (
    <ContainerIcon>
      <InputStyle
        ref={ref}
        type={currentType}
        disabled={disabled}
        {...register} error={error}
        value={value}
        onChange={onChange}
        $small={small}
        id={id}
        name={name}
      />
      {
        currentType === 'password' ? <VisibilityOffIconStyle onClick={showPassword} /> : <VisibilityIconStyle onClick={showPassword} />
      }
    </ContainerIcon>
  )
})

const InputCustom = forwardRef((props, ref) => {
  const { type, id, name, disabled, register, error, icon, value, onChange, onBlur, onFocus, readOnly, defaultValue, placeholder, small } = props;
  return (
    <ContainerIcon error={error}>
      <InputStyle
        error={error}
        ref={ref}
        type={type}
        disabled={disabled}
        {...register}
        icon={Boolean(icon)}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        readOnly={readOnly}
        defaultValue={defaultValue}
        placeholder={placeholder}
        $small={small}
        id={id}
        name={name}
      />
      {icon && iconVariant[icon]}
    </ContainerIcon>
  )
})
const SendStyle = styled(Send)`
  ${iconStyle};
`
const iconVariant = {
  send: <SendStyle />,
}
